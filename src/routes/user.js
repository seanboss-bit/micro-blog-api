// Route
const express = require("express");
const authGuard = require("../middleware/authGuard");
const User = require("../model/User");

const router = new express.Router();

// Register User
router.post("/user/register", async (req, res) => {
  try {
    //   Validate User
    const ValidateUser = await User.findOne({ email: req.body.email });
    if (ValidateUser)
      return res.status(404).json({ error: "User already exist" });

    const userObject = req.body;
    userObject.dateReg = new Date();
    const newUser = new User(userObject);
    await newUser.save();

    res.status(201).json({
      message: "User Registered",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// login User
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.comparePassword(email, password, res);

    const token = await user.generateAuthToken();

    res.status(200).json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/user/profile", authGuard, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LogOut
router.patch("/user/logout", authGuard, async (req, res) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
