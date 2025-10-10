import * as AuthValidator from '../Middlewares/Validators/AuthValidator.js';
import * as AuthController from '../Controllers/Auth.controller.js';
import {authMiddleware} from '../Middlewares/auth.middleware.js';
import express from 'express';

const router = express.Router();

router.post('/login', AuthValidator.validateLogin, AuthController.login);


router.post('/signup', AuthValidator.validateSignup, AuthController.signup );


router.post(
  '/resetpassword',
  authMiddleware,
  AuthValidator.validateResetPassword,
  AuthController.resetPassword
);


router.post('/refresh-token', authMiddleware, AuthController.refreshToken);

router.post('/forgot-password', AuthController.forgotPassword);
// router.post('/logout', authMiddleware, AuthController.logout);



export default router;
