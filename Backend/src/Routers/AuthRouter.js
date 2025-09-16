import * as AuthValidator from '../Middlewares/Validators/AuthValidator.js';
import * as AuthController from '../Controllers/Auth.controller.js';
import authMiddleware  from '../Middlewares/auth.js';
import express from 'express';

const router= express.Router();

router.post('/login', AuthValidator.validateLogin, AuthController.login);
router.post('/signup', AuthValidator.validateSignup, AuthController.signup);
router.post('/resetpassword', authMiddleware, AuthValidator.validateResetPassword, AuthController.resetPassword);


export default router;


