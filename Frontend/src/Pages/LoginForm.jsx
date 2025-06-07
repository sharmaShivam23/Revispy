import React from "react";
import { useState } from "react";
import { apiConnect } from "../Services/apiConnect";
import { login } from "../Services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken } from "../Slices/authSlice";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate()
   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    Email : '',
    Password : ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
     const toastId = toast.loading("Logging in...");
    try{
    const response = await apiConnect("POST" , login.LOGIN_API , formData)
    console.log(response);
    if (response?.data?.success == true) {
      const token = response.data.token;
      console.log(token);
      
      dispatch(setToken(token));
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    toast.success("Login Successful" , {id : toastId})
    navigate("/category")
    }
    catch(error){
      const errorMsg = error?.response?.data?.message || "Error while logging in";
    toast.error(errorMsg, { id: toastId });
    }
    
  }

  return (
    <div className="mt-12 flex items-center justify-center px-4">
      <div className="bg-white rounded-[32px] w-[576px] h-[600px]  border-[#C1C1C1] border-[1px] p-6 sm:p-10 shadow-md">
        <h2 className="text-[32px] font-[600] text-center mb-5">Login</h2>
        <p className="text-[24px] font-[500] text-center mb-2">Welcome back to ECOMMERCE</p>
        <p className="text-[16px] font-[400]  text-center mb-4">The next gen business marketplace</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          

          {/* Email */}
          <div className="mt-6">
            <label className="block  text-[16px] font-medium text-gray-700">Email</label>
            <input
              type="email"
              name = "Email"
              value={formData.Email}
              onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
              placeholder="Enter Email"
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3  focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label className="block text-[16px] font-medium text-gray-700">Password</label>
            <input
              type="password"
               name = "Password"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
              placeholder="Enter Password"
              className="mt-1 w-full border-[1px] border-[#C1C1C1] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>



          {/* Create Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-black text-white font-medium py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            LOGIN
          </button>
        </form>

      

        <hr className="mt-8 text-[#C1C1C1]" />

        {/* Login redirect */}
        <p className="text-[16px] text-center text-[#333333] mt-6">
         Don't Have an Account?{" "}
          <Link to="/"  className="font-semibold text-black hover:underline">
            SIGNUP
          </Link>
        </p>

  
      </div>
    </div>
  );
};

export default LoginForm;
