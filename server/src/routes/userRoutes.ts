import express from 'express';
import { getProfile, signin, signout, signup } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';



const router = express.Router();



router.post('/signup', signup);
router.post('/signin',signin)
router.get('/',authMiddleware,getProfile)
router.post('/signout', signout);

export default router;