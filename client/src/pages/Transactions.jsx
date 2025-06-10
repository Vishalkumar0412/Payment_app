import React from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";
import TransactionTable from "@/components/TransactionTable";

const Transactions = () => {
    
    const user = {
        username: "vishal11",
        email: "vishal@gmail1111.com",
        firstName: "vishal",
        lastName: "nigam",
        password: "7906adasfa",
        mobile: "7906338791",
    };
    const account = {
        id: "6847a441075708b357a685fc",
        userId: "6847a441075708b357a685fa",
        balance: 1000.056,
        accountType: "savings",
        createdAt: "2025-06-10T03:19:29.207Z",
        updatedAt: "2025-06-10T03:19:29.207Z",
    };

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
                    className="text-2xl font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2"
                >
                   Transactions History
                </motion.h1>
               
                <hr className="my-8" />
                <TransactionTable/>
            </motion.div>
        </div>
    );
};

export default Transactions;
