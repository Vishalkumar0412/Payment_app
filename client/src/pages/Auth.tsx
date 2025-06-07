import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signinSchema, signupSchema } from "@/zod/authSchema";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router";

const Auth = () => {
  const [tab, setTab] = useState("signup");
  const navigate=useNavigate();


  const [signupData, setSignupData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [signinData, setSigninData] = useState({
    method: "username",
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleSignup = async () => {
    const result = signupSchema.safeParse(signupData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Error: check errors below");
    } else {
      setErrors({});
      try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/users/signup",
        signupData,
        {
          withCredentials: true,
        }
      );

      if (!res.data.success) {
      
        toast.error(res.data.message || "Signup failed");
      } else {
        
        toast.success(res.data.message || "Signup successful");
       
        setSignupData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          mobile: "",
        });
      }
      navigate('/')
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong during signup"
      );
    }
  };
  }
//signin module 


  const handleSignin=async ()=>{
    const result=signinSchema.safeParse(signinData);
    if(!result.success){
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast.error("Error: check errors below");
    } 
    else{
      setErrors({});
      try {
        const payload={
          [signinData.method]:signinData.identifier,
          password:signinData.password
        }
        const res=await axios.post('')
      } catch (error) {
        
      }
    }
  }
  return (
    <div className="h-screen flex items-center justify-center px-2">
      <div className="w-full max-w-md ">
        <Tabs defaultValue={tab} value={tab} onValueChange={setTab}>
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="signin">Signin</TabsTrigger>
          </TabsList>

          {/* SIGNUP */}
          <TabsContent value="signup">
            <Card className="max-h-[85vh] overflow-auto">
              <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Power your payments. Join now</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="@vishalnigam"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    id="fname"
                    placeholder="First"
                    value={signupData.firstName}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    id="lname"
                    placeholder="Last"
                    value={signupData.lastName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mobile">Mobile</Label>
                  <Input
                    id="mobile"
                    placeholder="7990065465"
                    value={signupData.mobile}
                    onChange={(e) =>
                      setSignupData({ ...signupData, mobile: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSignup}>Sign Up</Button>
              </CardFooter>
              {Object.keys(errors).length > 0 && (
                <Alert
                  variant="destructive"
                  className="w-full flex gap-3 items-start p-4 border border-red-500 bg-red-50 rounded-md shadow-sm"
                >
                  <AlertCircleIcon className="text-red-500 mt-1 w-5 h-5" />
                  <div>
                    <AlertTitle className="text-red-600 font-semibold mb-1">
                      Unable to signup
                    </AlertTitle>
                    <AlertDescription>
                      <p className="text-sm mb-2">
                        Please verify your information and try again:
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 text-red-700">
                        {Object.values(errors).map((error, idx) => (
                          <li key={idx}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </Card>
          </TabsContent>

          {/* SIGNIN */}
          <TabsContent value="signin">
            <Card className="max-h-[85vh] overflow-auto">
              <CardHeader>
                <CardTitle>Signin</CardTitle>
                <CardDescription>Access your account securely</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="method">Login With</Label>
                  <select
                    id="method"
                    className="border rounded px-3 py-2"
                    value={signinData.method}
                    onChange={(e) =>
                      setSigninData({
                        ...signinData,
                        method: e.target.value,
                        identifier: "",
                      })
                    }
                  >
                    <option value="username">Username</option>
                    <option value="email">Email</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="identifier">
                    {signinData.method.charAt(0).toUpperCase() +
                      signinData.method.slice(1)}
                  </Label>
                  <Input
                    id="identifier"
                    placeholder={`Enter your ${signinData.method}`}
                    value={signinData.identifier}
                    onChange={(e) =>
                      setSigninData({
                        ...signinData,
                        identifier: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••"
                    value={signinData.password}
                    onChange={(e) =>
                      setSigninData({ ...signinData, password: e.target.value })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={handleSignin}>Signin</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
