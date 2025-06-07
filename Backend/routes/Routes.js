const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { signUp , login } = require("../controllers/userAuth");
const { limiter } = require("../controllers/userAuth");
const { sendOTP } = require("../controllers/userAuth");
// const categoryRoutes = require("./category");
const  categoryController = require('../controllers/categoryController');
const { updateUserInterests } = require('../controllers/categoryController')


router.post("/signUp" ,limiter,signUp);
router.post("/otp" ,limiter, sendOTP);
router.post("/login" , login);
router.get('/get-categories', categoryController.getAllCategories);
router.post('/create-categories', categoryController.createCategory);
router.put("/user/interests", updateUserInterests);



module.exports = router
