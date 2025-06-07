

const Category = require('../model/categoryModel');
const User = require("../model/userSchema");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createCategory = async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateUserInterests = async (req, res) => {
  const { userId, interests } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { interests }, 
      { new: true }
    ).populate("interests"); 

  

    res.status(200).json({
      success: true,
      message: "Interests updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


