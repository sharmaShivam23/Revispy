import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart } from "react-icons/bs";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import { setLogout } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { DeleteAccount } from "../../Services/apis";
import { apiConnect } from "../../Services/apiConnect";

const Navbar = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleClick() {
    dispatch(setLogout());
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/login");
  }

  async function handleDeleteAccount(){
    const toastId = toast.loading("Deleting Account...");
    try{
   const response = await apiConnect("DELETE" , DeleteAccount.DELETE_API, {
    userId : user.id
   })
   if(response?.data?.success == true){
   toast.success("Account Deleted Successfully" , {id : toastId})
    dispatch(setLogout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
   }
   
  } catch(error){
     toast.error(error?.response?.data?.message || "Error while deleting account", { id: toastId });
  }
     
  }
  return (
    <nav className="flex flex-col">
      <div className="top font-semibold text-xs  sm:text-lg max-w-[94vw] mt-2  m-auto h-[36px] flex justify-center sm:justify-end w-full gap-4 items-center">
        {user ? <p>Hi , {user?.Name || "John"}</p> : <p>Orders & Returns</p>}

        {localStorage.getItem("token") ? (
          //  <p onClick={handleClick} className='text-xl cursor-pointer font-bold'>Logout</p>
          <select
            onChange={(e) => {
              const value = e.target.value;
              
              if (value === "logout") {
                handleClick(); 
              } else if (value === "delete") {
                handleDeleteAccount(); 
              }
            }}
            name="opt"
            id="op"
          >
             <option className="font-bold italic" value="">Select an option</option>
            <option className="font-bold" onClick={handleClick} value="logout">
              Logout
            </option>
            <option className="text-red-500 font-bold" value="delete">
              Delete Account
            </option>
          </select>
        ) : (
          <div className="p flex gap-4">
            <p>Hi , {user?.Name || "John"}</p>
            <p>Help</p>
          </div>
        )}
        
      </div>

      <div className="bottom max-w-[94vw]  w-full m-auto h-[64px] flex justify-between items-center">
        <div className="WebsiteName flex text-[25px] sm:text-[32px] font-bold">

          ECOMMERCE
        </div>

        <div className="menu flex sm:hidden text-3xl">
          <MdOutlineMenu />
        </div>

        <div className="options sm:flex hidden">
          <ul className="flex justify-center font-[450] items-baseline-last gap-4">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New stock</li>
            <li>Trending</li>
            {/* <Link to="/">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/otp">otp</Link> */}
          </ul>
        </div>

        <div className="icons sm:flex hidden justify-center items-center gap-7 font-bold">
          <div className="search">
            <IoSearchOutline className="text-2xl" />
          </div>
          <div className="cart">
            <BsCart className="text-2xl" />
          </div>
        </div>
      </div>

      <div className="off  w-full gap-4 h-[36px] flex justify-center items-center text-center bg-[#F4F4F4]">
        <div className="ic">
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div className="ic">Get 10% off on business sign up</div>
        <div className="ic">
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
