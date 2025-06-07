
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const sendEmail = require("../Tools/sendEmail"); 

const otpSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, 
  },
});


otpSchema.pre("save", async function (next) {
  try {
    const templatePath = path.join(__dirname, "../Templates/OTP.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

  
    htmlTemplate = htmlTemplate
      .replace("{{otp}}", this.otp);

    await sendEmail(
      this.Email,
      "Verify your email - ECOMMERCE",
      null, 
      htmlTemplate 
    );
    next();
  } catch (error) {
    console.error("Error sending OTP email:", error.message);
    next(error);
  }
});

module.exports = mongoose.model("OTP", otpSchema);
