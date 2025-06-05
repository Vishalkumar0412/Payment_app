import express from 'express';
import { signupSchema } from '../validator/userValidators';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const signup = async (req: express.Request, res: express.Response) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);

    if (!parsedData.success) {
      const errors = parsedData.error.errors.map((error) => ({
        message: error.message
      }));

      return res.status(400).json({
        success: false,
        errors
      });

    }
    const { username, email, password, firstname, lastname, mobile } = parsedData.data;
    const user=await User.findOne({ username, email , mobile });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this username, email or mobile already exists"
      });
    }
    const passwordHash= await bcrypt.hash(password, 10);
    const newUser= await User.create({
        username,
        email,
        firstname,
        lastname,
        mobile,
        password:passwordHash

    })
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to signup"
      });
    }

   
    return res.status(200).json({
      success: true,
      message:"Signup successfully",
      user: newUser
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export { signup };
