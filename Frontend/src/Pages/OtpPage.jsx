import { useState } from "react";
import { apiConnect } from "../Services/apiConnect";
import { signUp } from "../Services/apis";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OTPpage = () => {

  const [otp , setOtp] = useState('')
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("signupData"));
  const handleSubmit = async (e) => {
   e.preventDefault()
   const toastId = toast.loading("Verifying OTP...");
   try{

    const response = await  apiConnect("POST" , signUp.SIGNUP_API , {...data , otp : otp})
    if(response?.data?.success == true){
    toast.success("Signup Successfull" , {id : toastId})
    navigate("/login")
    }
   }catch(error){
   const errorMsg = error?.response?.data?.message || "Error while verifying OTP";
    toast.error(errorMsg, { id: toastId });
     
   }
  }

  return (
    <div className="mt-12 flex items-center  justify-center px-4">
      <div className="bg-white rounded-[32px] w-[576px] sm:h-[453px] h-[390px]  border-[#C1C1C1] border-[1px] p-6 sm:p-10 shadow-md">
        <h2 className="sm:text-[32px] text-[25px] font-bold text-center mb-5">Verify your email</h2>
        <p className="sm:text-[16px] text-xs font-[400]  text-center mb-4">Enter the 5 digit code you have received on <br/>
dev***@revispy.com</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
  
            <div className="p text-[16px] font-bold">Code</div>
           <div className="otp flex  justify-center items-center gap-2 mt-3">
                         <OtpInput
                           name = "otp"
                            value={otp}
                            onChange={setOtp}
                           numInputs={5}
                           renderInput={(props) => (
                             <input
                               {...props}
                               placeholder="-"
                               className="border-[1px] border-[#C1C1C1] h-[80px] bg-white text-black font-bold rounded-lg m-2"
                             />
                           )}
                           className="w-56 sm:w-96 bg-white m-4"
                           inputStyle={{
                             width: 'clamp(2.4rem, 10vw, 3.2rem)',
                             height: 'clamp(2.8rem, 12vw, 3.2rem)',
                             fontSize: '1.25rem',
                           }}
                           shouldAutoFocus
                         />
                       </div>
        



          {/* Create Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-black cursor-pointer text-white font-medium py-3 rounded-md hover:bg-gray-800 transition duration-300"
          >
            VERIFY
          </button>
        </form>


  
      </div>
    </div>
  );
};

export default OTPpage;

