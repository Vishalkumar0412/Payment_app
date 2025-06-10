import React from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserCard from "@/components/UserCard";

const Users = () => {
  const users = [
    {
      _id: "6846c781330972436c98735f",
      username: "vishal@gmail.com",
      email: "vishal@gmail.com",
      firstName: "vishal",
      lastName: "kumar",
      mobile: "7906338791",
      createdAt: "2025-06-09T11:37:37.473Z",
      updatedAt: "2025-06-09T11:37:37.511Z",

      account: "6846c781330972436c987361",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
    {
      _id: "6847a441075708b357a685fa",
      username: "visha",
      email: "vishal@gmail11.com",
      firstName: "vishal",
      lastName: "nigam",
      mobile: "7906338491",
      createdAt: "2025-06-10T03:19:29.153Z",
      updatedAt: "2025-06-10T03:19:29.243Z",
      account: "6847a441075708b357a685fc",
    },
  ];

  const account = {
    id: "6847a441075708b357a685fc",
    userId: "6847a441075708b357a685fa",
    balance: 1000.056,
    accountType: "savings",
    createdAt: "2025-06-10T03:19:29.207Z",
    updatedAt: "2025-06-10T03:19:29.207Z",
  };

  return (
    <div className="md:min-h-[90vh] mid-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[80vh] w-full p-8"
      >
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          ZapPay Account
        </motion.h1>
        <div className="mb-6">
          <div className="text-gray-500 text-sm">Current Balance</div>
          <div className="text-4xl font-bold bg-gradient-to-br to-blue-900 from-blue-600 bg-clip-text text-transparent">
            {currency.format(account.balance)}
          </div>
        </div>
        <hr className="md:my-8 my-4" />

        {/* seach and user  */}

       <div className="flex flex-col md:gap-2 ">
               <div className="flex flex-col gap-2">
                 <Label htmlFor="user-search" className="text-md font-semibold text-blue-700 ">Search users</Label>
                <div>
                    <Input id="user-search"  type="text" placeholder="Search name, email, or mobile number" />
                </div>
            </div>
               <div className="flex flex-col gap-1  h-[40vh] overflow-scroll">
                          {
                            users.map(user=>(
                                <UserCard user={user}/>
                            ))
                          }
               </div>
       </div>
      </motion.div>
    </div>
  );
};

export default Users;
