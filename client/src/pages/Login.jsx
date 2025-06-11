import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";

import { motion } from "motion/react";

import { toast } from "sonner";
import Loading from "@/components/Loading";
import { signinSchema } from "@/zod/userZod";
import { useLoginUserMutation } from "@/services/api/authApi";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [errors,setErrors] = useState(null);
  const [loginUser, { data, isSuccess, error, isLoading }] =
    useLoginUserMutation();
    
const navigate=useNavigate()
  const [formData, setFormData] = useState({
    method: "",
    identifier: "",
    password: "",
  });
 
  

  const handleMethodChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      method: value,
      identifier: "",
    }));
  };

  const handleIdentifierChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      identifier: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      password: e.target.value,
    }));
  };

  const getIdentifierLabel = () => {
    switch (formData.method) {
      case "email":
        return "Email Address";
      case "username":
        return "Username";
      case "mobile":
        return "Mobile Number";
      default:
        return "Identifier";
    }
  };

  const getIdentifierPlaceholder = () => {
    switch (formData.method) {
      case "email":
        return "Enter your email address";
      case "username":
        return "Enter your username";
      case "mobile":
        return "Enter your mobile number";
      default:
        return "Enter your login identifier"; // Default placeholder
    }
  };
  // form submition

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = signinSchema.safeParse(formData);
    if(!result.success){
          setErrors(result.error.flatten().fieldErrors)
    }
    else{
        loginUser(result.data)
    }

  };

  //use effecs


  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Login successful !");
      setTimeout(() => navigate("/account"), 500); 
    }
    if (error) {
      toast.error(error.data.message || "Login Failed");
    }
  }, [isSuccess, isLoading, error]);




  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-full flex justify-center  items-center bg-gradient-to-br from-white to-zinc-200">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          staggerChildren: 0.4,
        }}
        className="bg-white px-5 py-5 flex flex-col rounded-lg min-w-1/3  shadow-2xl border border-gray-300 gap-4"
      >
        <div className="flex justify-center items-center">
          <h2 className="text-center text-3xl font-bold">
            Login to your account
          </h2>
        </div>
        <div className="flex flex-col px-10 py-5 border border-gray-200 gap-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-2 flex-col">
              <Label htmlFor="method">Login by</Label>
              <Select
                onValueChange={handleMethodChange}
                value={formData.method}
              >
                <SelectTrigger id="method" className="w-full">
                  <SelectValue placeholder="Select a login method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Method</SelectLabel>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="username">Username</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Conditionally render the identifier input based on method selection */}
            {formData.method && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="identifier">{getIdentifierLabel()}</Label>
                <Input
                  id="identifier"
                  placeholder={getIdentifierPlaceholder()}
                  value={formData.identifier}
                  onChange={handleIdentifierChange}
                />
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password" // Always use type="password" for password fields
                  placeholder="Password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            {errors && (
              <p className="flex justify-center border border-red-500 bg-red-50 py-2">
                <ul className="flex flex-col text-bold text-sm text-red-500 text-center">
                  {Object.values(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                  ))}
                </ul>
              </p>
            )}
            <div className="flex justify-center items-center">
              <Button type="submit" className="flex-1 cursor-pointer">
                Login
              </Button>
            </div>
          </form>
          <p className="text-center text-blue-800">
            Don't have an account ?{" "}
            <Link className="font-bold" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
