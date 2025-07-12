import { Request, Response } from "express";
import mongoose from "mongoose";
import Account from "../models/account.model";
import Transaction from "../models/transaction.model";

// fetch trabsaction
const getUserTransactionsQuery = async (
  accountId: mongoose.Types.ObjectId,
  options?: { skip?: number; limit?: number }
) => {
  const { skip = 0, limit = 0 } = options || {};

  return Transaction.find({
    $or: [{ from: accountId }, { to: accountId }],
  })
    .populate({
      path: "from",
      populate: {
        path: "userId",
        select: "firstName lastName email mobile",
      },
    })
    .populate({
      path: "to",
      populate: {
        path: "userId",
        select: "firstName lastName email mobile",
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const transferFund = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  let transactionId: mongoose.Types.ObjectId | null = null;

  try {
    const userId = req.user.userId;
    const { amount, to, description } = req.body;

    if (!amount || !to) {
      await session.abortTransaction();
      session.endSession();

      return res
        .status(400)
        .json({ message: "Amount and receiver are required" });
    }

    const fromAccount = await Account.findOne({ userId }).session(session);

    // 🛑 Fix: incorrect logic `!account || !account.balance < amount`
    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ message: "Insufficient balance or sender account not found" });
    }

    const toAccount = await Account.findOne({ userId: to })
      .populate("userId", "firstName lastName")
      .session(session);

    if (!toAccount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Receiver account not found" });
    }
    if (toAccount.userId._id.toString() === userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "You cannot transfer funds to your own account",
      });
    }
    const transaction = await Transaction.create<mongoose.Document>(
      [
        {
          from: fromAccount._id,
          to: toAccount._id,
          amount,
          status: "pending",
          description: description || "",
        },
      ],
      { session }
    );

    transactionId = transaction[0]._id;

    // ✅ Deduct from sender
    await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(
      session
    );

    // ✅ Credit to receiver
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // ✅ Create transaction record
    await Transaction.updateOne(
      { _id: transaction[0]._id },
      { status: "completed" }
    ).session(session);
    // ✅ Commit the transaction

    await session.commitTransaction();
    session.endSession();
    return res
      .status(200)
      .json({ message: "Transfer successful", transaction: transaction[0] });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    let transaction = null; // Declare here

    if (transactionId) {
      transaction = await Transaction.findOneAndUpdate(
        { _id: transactionId },
        { status: "failed" },
        { new: true }
      );
    }

    return res.status(500).json({
      transaction, // Use here safely
      message: "Transfer failed",
      error: error.message,
    });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const userId = req.user.userId;

  try {
    const account = await Account.findOne({ userId: req.user.userId }).select(
      "_id"
    );
    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found for user",
      });
    }

    const accountId = account._id.toString(); // Convert to string for consistency

    const transactions = await getUserTransactionsQuery(accountId);

    return res.status(200).json({
      success: true,
      transactions,
    });
  } catch (error: any) {
    console.error("Error fetching transaction history:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch transaction history",
      error: error.message,
    });
  }
};
export const fetchTxn = async (req, res) => {
  const txnId = req.query.txnId;
  try {
    if (!txnId) {
      return res.status(400).json({ message: "Transaction not found" });
    }
    const txn = await Transaction.findById(txnId)
      .populate({
        path: "from",
        populate: {
          path: "userId",
        },
      })
      .populate({
        path: "to",
        populate: {
          path: "userId",
        },
      });
    if (!txn) {
      return res.status(404).json({
        message: "Transaction not found invalid txn",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Transaction Fetched",
      success: true,
      txn,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

//paginated transaccion
export const paginatedTransaction = async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const account = await Account.findOne({ userId: req.user.userId }).select(
      "_id"
    );
    if (!account)
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    const total = await Transaction.countDocuments({
      $or: [{ from: account._id }, { to: account._id }],
    });

    const transactions = await getUserTransactionsQuery(account._id, {
      skip,
      limit,
    });

    return res.status(200).json({
      success: true,
      transactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalTransactions: total,
    });
  } catch (error) {

     return res.status(500).json({
      success: false,
      message: "Pagination failed",
      error: error.message,
    });
  }
};
