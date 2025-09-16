import express from 'express';        
import * as UserValidator from "../Middlewares/Validators/UserValidator.js";
// import * as UserController from "../Controllers/index.js";
import * as UserController from "../Controllers/User.controller.js";
import  authMiddleware  from '../Middlewares/auth.js';

const router= express.Router();

router.route('/users')
    .get(authMiddleware, UserController.getUsers)
    .post(UserValidator.validateCreation, authMiddleware, UserController.createUser);

router.route('/users/:id')
    .get(authMiddleware, UserController.getUserById)
    .put(UserValidator.validateModification, authMiddleware, UserController.updateUser)
    .delete(authMiddleware, UserController.deleteUserById);

export default router;
