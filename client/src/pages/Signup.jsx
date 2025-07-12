import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { signupSchema } from "@/zod/userZod";
import { useSignupUserMutation } from "@/services/api/authApi";
import { toast } from "sonner";

const Signup = () => {
  const navigate=useNavigate()
  const [errors, setErrors] = useState();
  const [signupUser, { data, isLoading, isSuccess, error }] =
    useSignupUserMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    mobile: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = signupSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
    } else {
      setErrors(null);
      signupUser(parsed.data);
    }
  };


 
  useEffect(() => {
    if (data && isSuccess) {
      toast.success(data.message || "Signup Successful.")
    navigate('/account')
    }
    if(error){
      toast.error(data.data.message ||"Signup Failed")
    }




  }, [isLoading, error, data]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-white to-zinc-200">
      <motion.div className="bg-white px-5 py-5 flex flex-col  shadow-2xl border border-gray-300 gap-4">
        <div className="flex justify-center items-center">
          <h2 className="text-center text-3xl font-bold">
            Create your account{" "}
          </h2>
        </div>
        <div className="flex flex-col px-10 py-5 border border-gray-200 gap-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  placeholder="Mobile Number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className=" flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                />
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
              <Button type="submit" className="flex-1 cursor-pointer">
                Sign Up
              </Button>
            </div>
          </form>
          <p className="text-center text-blue-800">
            Already have an account ?{" "}
            <Link className="font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
