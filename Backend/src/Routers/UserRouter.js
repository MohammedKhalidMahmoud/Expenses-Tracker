import express from 'express';        
import * as UserValidator from "../Middlewares/Validators/AuthValidator.js";
// import * as UserController from "../Controllers/index.js";
import * as UserController from "../Controllers/User.controller.js";
import  authMiddleware  from '../Middlewares/auth.js';

const router= express.Router();

router.route('/users')
    .get(authMiddleware, UserController.getUsers)
    .post(UserValidator.validateUser, authMiddleware, UserController.createUser);

router.route('/users/:id')
    .get(authMiddleware, UserController.getUserById)
    .put(UserValidator.validateUser, authMiddleware, UserController.updateUser)
    .delete(authMiddleware, UserController.deleteUserById);

export default router;
