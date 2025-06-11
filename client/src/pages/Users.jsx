import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserCard from "@/components/UserCard";
import {
  useGetFilteredUsersQuery,
  useLoadUserQuery,
} from "@/services/api/authApi";
import { ScrollArea } from "@/components/ui/scroll-area";

const Users = () => {
  const [filter, setFilter] = useState("");
  const  {data, isLoading,error,isSuccess}  = useGetFilteredUsersQuery(filter);
  const { data: userData } = useLoadUserQuery();

 

  const [account, setAccount] = useState({});

  console.log(data);
  

  useEffect(() => {
     if (userData?.user?.account) {
      setAccount(userData.user.account);
    }
  }, [userData]);

  
  return (
    <div className="md:min-h-[90vh] mid-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 min-h-[80vh] w-full p-8"
      >
        <div className="flex justify-between">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl hidden md:block font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2"
        >
          ZapPay Account
        </motion.h1>
        <div className="mb-6">
          <div className="text-gray-500 text-sm">Current Balance</div>
          <div className="text-2xl font-bold bg-gradient-to-br to-blue-900 from-blue-600 bg-clip-text text-transparent">
            {currency.format(account?.balance ||0)}
          </div>
        </div>
        </div>
        <hr className="md:my-2 my-2" />

        {/* seach and user  */}

        <div className="flex flex-col md:gap-2 ">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="user-search"
              className="text-md font-semibold text-blue-700 "
            >
              Search users
            </Label>
            <div>
              <Input
                id="user-search"
                type="text"
                placeholder="Search name, email, or mobile number"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex flex-col gap-1  h-[60vh] overflow-scroll">
        
            {data?.users?.length > 0 ? (
              data.users.map((user) => (
                <UserCard key={user._id} user={user} />
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">
                {isLoading
                  ? "Loading users..."
                  : error
                  ? "Failed to load users."
                  : "No users found."}
              </p>
            )}
          </ScrollArea>
        </div>
      </motion.div>
    </div>
  );
};

export default Users;
