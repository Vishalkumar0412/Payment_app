import React from "react";
import { motion } from "framer-motion";

import TransactionTable from "@/components/TransactionTable";

const Transactions = () => {

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
                    className="text-2xl  font-extrabold bg-gradient-to-br from-blue-900 to-blue-600 bg-clip-text text-transparent mb-2"
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
