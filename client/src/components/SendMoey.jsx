import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { currency } from "@/utills/constaints";
import UserCard from "@/components/UserCard";
import { useGetFilteredUsersQuery } from "@/services/api/authApi";
import { useSendMoneyMutation } from "@/services/api/txnApi";
import Loading from "./Loading";

const SendMoney = () => {
  const { id } = useParams(); // user ID from route
  const [amount, setAmount] = useState("");
  const [sendMoney, {data:tnxData, isLoading, isError, isSuccess, error }] = useSendMoneyMutation();
  const { data, isFetching } = useGetFilteredUsersQuery(""); // load all to get specific user
  const user = data?.users?.find((u) => u._id === id);
  const navigate=useNavigate()

  const handleSend = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    await sendMoney({ to: id, amount: Number(amount) });
 
    
  };
  useEffect(()=>{

    if(isSuccess &&tnxData){
        navigate(`/transaction/${tnxData.transaction._id}`)
    }

  },[isSuccess,error,isLoading])
  if(isLoading) return <Loading/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Send Money
        </h1>

        {user ? (
          <>
            <UserCard user={user} />

            <div className="mt-6 flex flex-col gap-3">
              <Label htmlFor="amount" className="text-md font-semibold text-blue-700">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                min="1"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button
                onClick={handleSend}
                disabled={isLoading}
                className="mt-4 bg-blue-700 hover:bg-blue-800 text-white"
              >
                {isLoading ? "Sending..." : "Send Money"}
              </Button>

              {isError && <p className="text-red-500 text-sm">Transaction failed.</p>}
              {isSuccess && <p className="text-green-600 text-sm">Transfer successful!</p>}
            </div>
          </>
        ) : isFetching ? (
          <p className="text-center text-gray-500">Loading user...</p>
        ) : (
          <p className="text-center text-red-500">User not found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default SendMoney;
