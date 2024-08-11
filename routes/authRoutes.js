// authRoutes.js
import express from 'express';
import { signUp, signIn , forgotPassword, resetPassword, getUsers} from '../controllers/authUser.js'

const router = express.Router();

router.get('/' ,  getUsers);

// Sign-up route
router.post('/signup', signUp);

// Sign-in route
router.post('/signin', signIn);

// forgot password route
router.post('/forgot-password', forgotPassword)

//Reset password route
router.post('/reset-password/:token', resetPassword);



export default router;
