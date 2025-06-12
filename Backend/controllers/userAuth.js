const User = require('../model/userSchema');
const sendEmail = require('../Tools/sendEmail');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const OTP = require('../model/OTPSchema');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again after an hour."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
exports.limiter = limiter;




exports.sendOTP = async(req,res) => {
  try{
  const {Email} = req.body

  if(!Email){
    return res.status(400).json({
      success : false,
      message : "email is required"
    })
  }

  const existUser= await User.findOne({Email})
  if(existUser){
   return res.status(401).json({
      success : false,
      message : "user already exits"
    })
  }

  let otp = otpGenerator.generate(5 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })


 let result = await OTP.findOne({otp : otp})
 while(result){
  otp = otpGenerator.generate(5 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })
  result = await OTP.findOne({otp : otp})
 }
 
 const otpPayload = {Email,otp}
 const otpresult = await OTP.create(otpPayload)
 

 res.status(200).json({
  success : true,
  message : "otp send successfully",
 })
  }catch(err){
   console.log(err);
   res.status(500).json({
    success : true,
    message : err.message
   })
   
  }
}



exports.signUp = async (req, res) => {
  try {
   
  
    const { Name, Email , Password  ,otp } = req.body;
    // const { Name, Email , Password ,   recaptchaValue ,otp } = req.body;
    

  
   if(!Name || !Email || !Password ) {
      return res.status(400).send({ success: false, message: "All details are required" });
    }

    
    
    if (Name.length < 3) {
      return res.status(400).send({ success: false, message: "Name must be at least 3 characters long" });
    }

    if(!otp){
      return res.status(403).json({
         success : false,
         message : "OTP verification failed!"
       })
     }

     let hashPassword;
    try {
      hashPassword = await bcrypt.hash(Password, 10);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error in hashing password"
      });
    }
   

    //find recent used otp
    const recentOTP = await OTP.findOne({ Email }).sort({ createdAt: -1 }); // get latest OTP

   
    if(!recentOTP ){
      return res.status(403).json({
        success: false,
        message: "OTP is required!",
      });
    }

    if (String(recentOTP.otp).trim() !== String(otp).trim())       {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    
    
    
      
    // if (!recaptchaValue) {
    //   return res.status(400).send({ success: false, message: "reCAPTCHA verification failed" });
    // }

    // const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    // const secretKey = process.env.SECRET_KEY;
    // const recaptchaResponse = await axios.post(verifyUrl, null, {
    //   params: {
    //     secret: secretKey,
    //     response: recaptchaValue,
    //   },
    // });

    // if (!recaptchaResponse.data.success) {
    //   return res.status(400).send({ success: false, message: "reCAPTCHA verification failed" });
    // }

    const existEmail = await User.findOne({ Email });
    if (existEmail) {
      return res.status(400).send({ success: false, message: "Email already exists" });
    }

   

   
    const userCreate = await User.create({
      Name, 
      Email,
      Password: hashPassword,
    });

  
    const templatePath = path.join(__dirname, '../Templates/signup.html');
    if (!fs.existsSync(templatePath)) {
      return res.status(500).send({
        success: false,
        message: "Signup template not found.",
      });
    }

    const signupTemplate = fs.readFileSync(templatePath, 'utf8');
    const subject = "Welcome to ECOMMERCE!";
    const text = `Hi ${Name}, Congratulations! Signup successful.`;
    const html  = signupTemplate.replace(/{{\s*Name\s*}}/g, Name)


    const isEmailSent = await sendEmail(Email, subject, text, html);
    await OTP.deleteMany({ Email }); // Clean all OTPs for that email

    res.status(201).send({
      success: true,
      data: userCreate,
      message: "SignUp successful",
    });

  } catch (error) {
    console.error("Error during signUp:", error.message);
    return res.status(500).send({
      success: false,
      message: "Error during signup! Try again",
      error: error.message,
    });
  }
};






exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

  
    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: !Email ? "Please provide email" : "Please provide password",
      });
    }


    
    let user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

  
    const payload = {
      id: user._id,
      Email: user.Email,
      Name: user.Name,
    };

    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    user = user.toObject()
    user.token = user
    user.Password = undefined;

    
    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 
      httpOnly: true,
    };

    
    return res.cookie('token', token, cookieOptions).status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        Email: user.Email,
        Name: user.Name,
      },
      token,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred. Please try again",
      error: err.message,
    });
  }
};



exports.deleteAccount = async(req,res) => {
  try {
    const {userId} = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await OTP.deleteMany({ Email: user.Email }); 

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("Error during account deletion:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error deleting account. Please try again",
      error: error.message,
    });
  }
}
