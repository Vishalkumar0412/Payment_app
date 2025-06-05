import express from "express";
import { signinSchema, signupSchema } from "../validator/userValidators";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/genrateToken";
import Account from "../models/account.model";

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      const errors = parsedData.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const { username, email, password, firstName, lastName, mobile } =
      parsedData.data;
    const existUser = await User.findOne({
      $or: [{ username }, { email }, { mobile }],
    });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User with this username, email or mobile already exists",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      firstName,
      lastName,
      mobile,
      password: passwordHash,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to signup",
      });
    }

    const newAccount = await Account.create({
      userId: newUser._id,
    });

    generateToken(res, newUser, "Signup successful");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req: express.Request, res: express.Response) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errors = parsedData.error.errors.map((error) => ({
        path: error.path.join("."),
        message: error.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }
    const { email, password } = parsedData.data;
    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).populate("account");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    generateToken(res, user, "Signin successful");
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
