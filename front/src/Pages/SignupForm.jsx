import React, { useState } from "react";
import { apiConnect } from "../Services/apiConnect";
import { signUp, sendOTP } from "../Services/apis";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    otp: "",
    Password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await apiConnect("POST", sendOTP.OTP_API, {
        Email: formData.Email,
      });
      if(response?.data?.success == true){
      localStorage.setItem("signupData", JSON.stringify(formData));
      toast.success("otp send successfully", { id: toastId });
      navigate("/otp");
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Error while sending OTP";
    toast.error(errorMsg, { id: toastId });
    }
  };

  const validateForm = () => {
    if (
      !formData.Name ||
      !formData.Email ||
      !formData.Password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return false;
    }

    if (formData.Name.length < 3) {
      toast.error("Name is too short!");
      return false;
    }

    if(!formData.Email.includes('@')){
      toast.error("Please enter a valid email")
      return false
    }
    

    const minLength = formData.Password.length >= 5;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.Password);
    const hasNumber = /[0-9]/.test(formData.Password);

    if (!minLength || !hasSpecialChar || !hasNumber) {
      toast.error(
        "Password must be at least 5 characters, include 1 special character and 1 number."
      );
      return false;
    }

    if (formData.Password != formData.confirmPassword) {
      toast.error("Password not match");
      return false;
    }

    return true;
  };

  return (
    <div className="mt-12 flex items-center justify-center px-4">
      <div className="bg-white rounded-[32px] w-[576px] h-[691px]  border-[#C1C1C1] border-[1px] p-6 sm:p-10 shadow-md">
        <h2 className="sm:text-[32px] text-[25px] font-bold text-center mb-6">
          Create your account
        </h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-[16px] font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label className="block  text-[16px] font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="Email"
              required
              value={formData.Email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3  focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="block text-[16px] font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label className="block text-[16px] font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* show password */}
          <div className="mt-4 text-[16px]  flex">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mr-2 leading-tight"
            />
            <label className="block text-[16px] font-medium text-gray-700">
              Show Password
            </label>
          </div>

          {/* Create Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full cursor-pointer mt-2 bg-black text-white font-medium py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            CREATE ACCOUNT
          </button>
        </form>

        {/* Login redirect */}

        <p className="text-[16px] flex justify-center items-center gap-1 text-[#333333] mt-6">
          Have an Account?{" "}
          <Link
            to="/login"
            className="font-semibold cursor-pointer text-black hover:underline"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
