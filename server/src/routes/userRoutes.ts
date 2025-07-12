import express from 'express';
import { filterUser, getProfile, getUserByAccount, signin, signout, signup } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';



const router = express.Router();



router.post('/signup', signup);
router.post('/signin',signin)
router.get('/',authMiddleware,getProfile)
router.post('/signout', signout);
router.get('/bulk',authMiddleware,filterUser)
router.get('/get-user',authMiddleware,getUserByAccount)

export default router;