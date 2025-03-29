import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, phoneNumber, password, confirmPassword, pincode } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ phoneNumber });

    if (user) {
      return res.status(400).json({ error: "User with this phone number already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      phoneNumber,
      password: hashedPassword,
      pincode,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        phoneNumber: newUser.phoneNumber,
        pincode: newUser.pincode,
      });
    } else {
      res.status(400).json({ error: "Invalid user data " });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const user = await User.findOne({ phoneNumber });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      pincode: user.pincode,
    });
  } catch (error) {
    console.log("Error in login controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try{

    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message : "Logged out successfully"})

  } catch (error) {
    console.log("Error in logout controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
