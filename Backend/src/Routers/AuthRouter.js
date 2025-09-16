import * as UserValidator from '../Middlewares/Validators/AuthValidator.js';
import * as UserController from '../Controllers/User.controller.js';
import authMiddleware  from '../Middlewares/auth.js';
import express from 'express';

const router= express.Router();

router.post('/login', UserValidator.validateLogin, UserController.login);
router.post('/signup', UserValidator.validateSignup, UserController.signup);
router.post('/resetpassword', authMiddleware, UserController.resetPassword);


export default router;


