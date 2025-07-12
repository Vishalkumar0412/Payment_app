import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currency } from "@/utills/constaints";
import { useGetTransactionByIdQuery } from "@/services/api/transactionApi"; // adjust as needed
import dayjs from "dayjs";

const TransactionSuccess = () => {
  const { txid } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetTransactionByIdQuery(txid);
  const [copied, setCopied] = useState(false);

  const transaction = data?.transaction;

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 2000);
    }
  }, [copied]);

  const handleCopy = () => {
    const text = `
Transaction Receipt
--------------------
Transaction ID: ${transaction?._id}
Amount: ${currency.format(transaction?.amount || 0)}
Status: ${transaction?.status}
From: ${transaction?.from?.}
To: ${transaction?.to}
Date: ${dayjs(transaction?.createdAt).format("DD MMM YYYY, hh:mm A")}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  if (isLoading)
    return <div className="h-screen flex justify-center items-center text-blue-700">Loading...</div>;

  if (error || !transaction)
    return <div className="h-screen flex justify-center items-center text-red-500">Transaction not found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </motion.div>

        <h1 className="text-xl font-bold text-center text-green-600 mb-4">
          Transaction Successful
        </h1>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Transaction ID:</span>
            <span className="font-mono">{transaction._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Amount:</span>
            <span>{currency.format(transaction.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className={`font-semibold ${transaction.status === "pending" ? "text-yellow-500" : "text-green-600"}`}>
              {transaction.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">From:</span>
            <span className="text-xs">{transaction.from}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">To:</span>
            <span className="text-xs">{transaction.to}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span>{dayjs(transaction.createdAt).format("DD MMM YYYY, hh:mm A")}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button onClick={handleCopy} className="w-full flex gap-2 items-center">
            <Copy size={18} />
            {copied ? "Copied!" : "Copy Receipt"}
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionSuccess;
