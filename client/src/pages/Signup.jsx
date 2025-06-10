import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Link } from "react-router";
import {motion} from 'motion/react'

const Signup = () => {
  const errors =null
  //  {
  //   username: "Enter correct Username",
  //   password: "Enter password min 6 digit",
  //   mobile: "mobile number must be 10 digit",
  // };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
  });

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-white to-zinc-200">
      <motion.div
      initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            staggerChildren: 0.4,
          }}
      className="bg-white px-5 py-5 flex flex-col  shadow-2xl border border-gray-300 gap-4">
        <div className="flex justify-center items-center">
          <h2 className="text-center text-3xl font-bold">
            Create your account{" "}
          </h2>
        </div>
        <div className="flex flex-col px-10 py-5 border border-gray-200 gap-5">
          <form action="" className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input id="fname" placeholder="First Name"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input id="lname" placeholder="Last Name"/>
              </div>
            </div>
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Username"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" placeholder="Mobile Number"/>
              </div>
            </div>
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type='email' placeholder="Email"/>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type='password' placeholder="Password"/>
              </div>
            </div>
            {errors && (
              <p className="flex justify-center border border-red-500 bg-red-50 py-2">
                <ul className="flex flex-col text-bold text-sm text-red-500 text-center">
                  {Object.values(errors).map((err) => (
                    <li>{err}</li>
                  ))}
                </ul>
              </p>
            )}
            <div className="flex justify-center items-center">
              <Button type="submit" className="flex-1 cursor-pointer">Sign Up</Button>
            </div>
          </form>
              <p className="text-center text-blue-800">Already have an account ? <Link className="font-bold" to="/login">Login</Link></p>
        </div>
        
       
      </motion.div>
    </div>
  );
};

export default Signup;
