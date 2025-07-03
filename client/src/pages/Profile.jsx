import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";

import { useLoadUserQuery } from "@/services/api/authApi";
import Loading from "@/components/Loading";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [editable, setEditable] = useState(false);

  const {
    data: userData,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    error: userError,
  } = useLoadUserQuery();

  useEffect(() => {
    if (userIsSuccess) {
      setAccount(userData.user.account);
      setUser(userData.user);
    }

    if (userError) {
      console.error("Failed to load account or user data");
    }
  }, [userIsSuccess, userError, userData]);

  if (userIsLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[80vh] w-full p-8"
      >
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          ZapPay Account
        </motion.h1>

        <div className="mb-6">
          <div className="text-gray-500 text-sm">Current Balance</div>
          <div className="text-4xl font-bold bg-gradient-to-br to-blue-900 from-blue-600 bg-clip-text text-transparent">
            {currency.format(account?.balance || 0)}
          </div>
        </div>

        <hr className="my-8" />

        <div className="md:text-lg text-sm gap-3 flex flex-col">
          <div className="font-bold flex gap-2 justify-between">
            <div className="flex flex-col flex-1/2 gap-2">
              <Label>Username</Label>
              <Input
                defaultValue={user.username}
                disabled
                placeholder="Username"
              />
            </div>
            <div className="flex flex-col flex-1/2 gap-2">
              <Label>Email</Label>
              <Input defaultValue={user.email} disabled placeholder="Email" />
            </div>
          </div>
          <div className="font-bold flex gap-2 justify-between">
            <div className="flex flex-col flex-1/2 gap-2">
              <Label>First Name</Label>
              <Input
                defaultValue={user.firstName}
                disabled={!editable}
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col flex-1/2 gap-2">
              <Label>Last Name</Label>
              <Input
                defaultValue={user.lastName}
                disabled={!editable}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="font-bold flex gap-2 justify-between">
            <div className="flex flex-col flex-1/2 gap-2">
              <Label>Mobile</Label>
              <Input defaultValue={user.mobile} disabled placeholder="Mobile" />
            </div>
            {editable && (
              <div className="flex flex-col flex-1/2 gap-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current Password" />
              </div>
            )}
          </div>
          {!editable ? (<div>
            <Button type=""  className=" bg-gray-700 py-6 flex gap-2 "  onClick={()=>setEditable(!editable)}><Edit2/> Edit</Button>
          </div> ):(
            <div>
            <Button type="submit">Update</Button>
          </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
