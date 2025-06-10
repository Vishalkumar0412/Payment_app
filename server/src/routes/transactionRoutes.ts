import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { fetchTxn, getHistory,    transferFund } from '../controllers/transactionController';
import { transactionMiddleware } from '../middleware/transactionMiddleware';

const router=express.Router();


router.post('/transfer',authMiddleware,transactionMiddleware,transferFund)
router.get('/history',authMiddleware,getHistory); 
router.get('/',authMiddleware,fetchTxn); 

export default router;