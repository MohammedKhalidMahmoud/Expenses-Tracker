import * as UserValidator from '../Middlewares/UserValidator.js';
import * as UserController from '../Controllers/User.controller.js';
import express from 'express';

const router= express.Router();

router.post('/api/auth/login', UserValidator.validateLogin, UserController.login);
router.post('/api/auth/signup', UserValidator.validateSignup, UserController.signup);


export default router;


