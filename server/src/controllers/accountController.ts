import express from 'express'
import Account from '../models/account.model';

// Extend Express Request interface to include 'user'


export const checkBalance=async(req:express.Request,res:express.Response)=>{
    try {
        const userId = req.user.userId; // Assuming user is set by authMiddleware
        const account = await Account.findOne({ userId })
        if (!account || !userId) {
        return res.status(404).json({
            success: false,
            message: "User or account not found",
        });
        }
        
        const balance = account.balance;
        
        return res.status(200).json({
        success: true,
        balance: balance,
        });
    } catch (error) {
        console.error("Error checking balance:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const getAccountDetails = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.user.userId; 
          const account = await Account.findOne({ userId:req.user.userId }).select("-transactions -__v")
        

        
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found",
            });
        }
        
        return res.status(200).json({
            success: true,
            account,
        });
    } catch (error) {
        console.error("Error fetching account details:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

