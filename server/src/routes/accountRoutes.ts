import express from 'express';
import { checkBalance, getAccountDetails } from '../controllers/accountController';
import { authMiddleware } from '../middleware/authMiddleware';
const router = express.Router();


router.get('/balance',authMiddleware,checkBalance)
router.get('',authMiddleware,getAccountDetails) // This route seems redundant, consider removing it or changing its purpose
export default router;