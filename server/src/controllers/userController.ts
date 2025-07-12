import express from "express";
import { signinSchema, signupSchema } from "../validator/userValidators";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/genrateToken";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";
import mongoose from "mongoose";
import { log } from "node:console";
import { loadavg } from "node:os";
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
      $or: [{ username }, { email : email.toLowerCase() }, { mobile }],
    });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User with this username, email or mobile already exists",
      });
    }
    const passwordHash = await bcrypt.hash(password.trim(), 10);

    const newUser = await User.create({
      username:username.toLowerCase().trim(),
      email:email.toLowerCase(),
      firstName,
      lastName,
      mobile:mobile.trim(),
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
    newUser.account = newAccount._id as typeof newUser.account;
    await newUser.save();

    generateToken(res, newUser, "Signup successful");
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};





export const signin = async (req: Request, res: Response) => {
  try {
    // Validate using Zod
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errors = parsedData.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Destructure and trim data
    const { method, identifier, password } = parsedData.data;
    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    let query: Record<string, string> = {};
    if (method === "username") query.username = cleanIdentifier.toLowerCase();
    else if (method === "email") query.email = cleanIdentifier.toLowerCase();
    else if (method === "mobile") query.mobile = cleanIdentifier;

    // Find user
    const user = await User.findOne(query).populate("account");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(cleanPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password, email ,username ,or mobile",
      });
    }

    // Send token + success
    generateToken(res, user, "Signin successful");
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const signout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = (req as any).user.userId; // Extract userId from the request object
    const user = await User.findOne({ _id: userId })
      .select("-password")
      .populate({
        path: "account",
        populate: {
          path: "transactions",
          model: "Transaction",
        },
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
    console.log("Registered models:", mongoose.modelNames());
  } catch (error) {
    console.error("Get profile error:", error);
    console.log("Registered models:", mongoose.modelNames());

    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const filterUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const filter = req.query.filter as string|| "";
    console.log(filter);
    
     const filteredUsers = await User.find({
      _id: { $ne: req.user.userId },
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
        { mobile: { $regex: filter, $options: "i" } },
      ],
    }).select('-password -role -transactions');

    
    return res.status(200).json(
      {
        users: filteredUsers.map((user)=>(user)),
        success:true
      }
    )
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"something went wrong"
    })
  }
};

export const getUserByAccount=async(req,res)=>{

  const accountId=req.query.accountId;
  if(!accountId){
    return res.status(400).json({
      success:false,
      message:"Account is not found"
    })

  }
  const userId=await Account.findOne({_id:accountId}).populate('userId','-password').select('userId')
  if(!userId){
    return res.status(400).json({
      success:false,
      message:'User not found'
    })
  }
  console.log(userId);
  
  const user=userId?.userId;


  return res.status(200).json({user});

}

//update profile
export const updateProfile =async(req,res)=>{

}