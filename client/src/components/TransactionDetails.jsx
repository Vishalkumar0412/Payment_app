import React from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";
import { Link, useParams } from "react-router";
import { ArrowLeft, MoveLeft } from "lucide-react";

const TransactionDetails = () => {
      const { id } = useParams()

  const txn = transactions.find((t) => t._id === id)
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center py-20 px-4">
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
                    className="text-2xl font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent md:mb-2"
                >
                    ZapPay
                </motion.h1>
                <div className="mb-6">
            
                    <h1 className="md:text-4xl text-2xl font-bold bg-gradient-to-br to-blue-900 from-blue-600 bg-clip-text text-transparent">
                     Transaction Details 
                    </h1>
                </div>
                <hr className="my-5" />
                <Link to='/transactions' className="flex text-blue-700 items-center gap-1 px-2 py-1"><ArrowLeft className="text-blue-800 ml-5" /> Back</Link>
                <div className="my-2 md:mx-10 grid grid-cols-2 gap-x-4 gap-y-3 md:text-lg text-sm border border-gray-600 px-5 py-5 border-dashed">
                    <div className="text-gray-500">Type:</div>
                    <div className="font-medium capitalize">{txn.from.userId._id === "68481e7d075708b357a68607" ? "debit" : "credit"}</div>
                    <div className="text-gray-500">Transaction Id: </div>
                    <div className="font-mono text-xs break-all">{txn._id}</div>
                    <div className="text-gray-500">Amount:</div>
                    <div className="font-medium">
                        {currency.format(txn.amount)} 
                    </div>
                    <div className="text-gray-500">Status:</div>
                    <div className="font-medium break-all">{txn.status}</div>
                    <div className="text-gray-500">Date:</div>
                    <div className="font-medium">{new Date(txn.createdAt).toLocaleString()}</div>
                    <div className="text-gray-500">From:</div>
                    <div className="font-medium">{txn.from.userId.firstName} {txn.from.userId.lastName}</div>
                    <div className="text-gray-500">To:</div>
                    <div className="font-medium">{txn.to.userId.firstName} {txn.to.userId.lastName}</div>
                </div>
            </motion.div>
        </div>
    );
};

export default TransactionDetails;

