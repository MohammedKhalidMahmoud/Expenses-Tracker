import * as UserValidator from '../Middlewares/UserValidator.js';
import * as UserController from '../Controllers/User.controller.js';
import express from 'express';

const router= express.Router();

router.post('/login', UserValidator.validateLogin, UserController.login);
router.post('/signup', UserValidator.validateSignup, UserController.signup);
router.post('/resetpassword', UserController.resetPassword);


export default router;


