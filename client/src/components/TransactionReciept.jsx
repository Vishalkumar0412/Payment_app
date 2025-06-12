import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, CircleX, CircleXIcon, Copy, Timer, TimerIcon } from "lucide-react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { currency } from "@/utills/constaints";

import { useFetchTxnQuery } from "@/services/api/txnApi";
import Loading from "./Loading";

const TransactionReceipt = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchTxnQuery(id);
  const [copied, setCopied] = useState(false);

  const txn = data?.txn;

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    const receipt = `
🧾 ZapPay Transaction Receipt
-----------------------------------------
Transaction ID: ${txn._id}
Amount: ${currency.format(txn.amount)}
Status: ${txn.status}
Date: ${dayjs(txn.createdAt).format("DD MMM YYYY, hh:mm A")}

From:
  Name: ${txn.from.userId.firstName} ${txn.from.userId.lastName}
  Username: ${txn.from.userId.username}
  Email: ${txn.from.userId.email}
  Mobile: ${txn.from.userId.mobile}

To:
  Name: ${txn.to.userId.firstName} ${txn.to.userId.lastName}
  Username: ${txn.to.userId.username}
  Email: ${txn.to.userId.email}
  Mobile: ${txn.to.userId.mobile}
    `;
    navigator.clipboard.writeText(receipt);
    setCopied(true);
  };

  if (isLoading)
    return (
      <Loading/>
    );

  if (error || !txn)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        Transaction not found.
      </div>
    );

    const txnColor= (status )=>{
        if(status==="completed") return 'green-500'
        if(status==="pending") return 'yellow-500'
        if(status==="failed") return 'red-600'
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <div className=" mb-4">
          {txn.status === "completed" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </motion.div>
              <h1 className="text-xl font-bold text-center text-green-600 mb-6">
                Transaction {txn.status}
              </h1>
            </>
          )}

          {txn.status === "pending" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                 <TimerIcon className="w-16 h-16 text-yellow-500" />
            
              </motion.div>
              <h1 className="text-xl font-bold text-center text-yellow-500 mb-6">
                Transaction Pending
              </h1>
            </>
          )}

          {txn.status === "failed" && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                 <CircleXIcon className="w-16 h-16 text-red-500"/>
               
              </motion.div>
              <h1 className="text-xl font-bold text-center text-red-600 mb-6">
                Transaction Failed
              </h1>
            </>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Txn ID:</span>
            <span className="font-mono">{txn._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount:</span>
            <span>{currency.format(txn.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span className={`capitalize text-${txnColor(txn.status)} font-semibold `}>
              {txn.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date:</span>
            <span>{dayjs(txn.createdAt).format("DD MMM YYYY, hh:mm A")}</span>
          </div>

          <hr className="my-3" />
          <h3 className="font-bold text-blue-600">Sender Info</h3>
          <p>
            <strong>Name:</strong> {txn.from.userId.firstName}{" "}
            {txn.from.userId.lastName}
          </p>
          <p>
            <strong>Username:</strong> {txn.from.userId.username}
          </p>
          <p>
            <strong>Email:</strong> {txn.from.userId.email}
          </p>
          <p>
            <strong>Mobile:</strong> {txn.from.userId.mobile}
          </p>

          <hr className="my-3" />
          <h3 className="font-bold text-blue-600">Receiver Info</h3>
          <p>
            <strong>Name:</strong> {txn.to.userId.firstName}{" "}
            {txn.to.userId.lastName}
          </p>
          <p>
            <strong>Username:</strong> {txn.to.userId.username}
          </p>
          <p>
            <strong>Email:</strong> {txn.to.userId.email}
          </p>
          <p>
            <strong>Mobile:</strong> {txn.to.userId.mobile}
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleCopy}
            className="w-full flex items-center gap-2"
          >
            <Copy size={18} />
            {copied ? "Copied!" : "Copy Receipt"}
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/transfer")}
        >
          Back
        </Button>
      </motion.div>
    </div>
  );
};

export default TransactionReceipt;
