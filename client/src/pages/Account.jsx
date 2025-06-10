import React from "react";
import { motion } from "framer-motion";
import { currency } from "@/utills/constaints";

const Account = () => {
    
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
                    ZapPay Account
                </motion.h1>
                <div className="mb-6">
                    <div className="text-gray-500 text-sm">Current Balance</div>
                    <div className="text-4xl font-bold bg-gradient-to-br to-blue-900 from-blue-600 bg-clip-text text-transparent">
                        {currency.format(account.balance)}
                    </div>
                </div>
                <hr className="my-8" />
                <div className="md:mx-10 grid grid-cols-2 gap-x-4 gap-y-3 md:text-lg text-sm">
                    <div className="text-gray-500">Account Type</div>
                    <div className="font-medium capitalize">{account.accountType}</div>
                    <div className="text-gray-500">Account ID</div>
                    <div className="font-mono text-xs break-all">{account.id}</div>
                    <div className="text-gray-500">User</div>
                    <div className="font-medium">
                        {user.firstName} {user.lastName} <span className="text-gray-400">({user.username})</span>
                    </div>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium break-all">{user.email}</div>
                    <div className="text-gray-500">Mobile</div>
                    <div className="font-medium">{user.mobile}</div>
                    <div className="text-gray-500">Created At</div>
                    <div className="font-medium">{new Date(account.createdAt).toLocaleString()}</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Account;
