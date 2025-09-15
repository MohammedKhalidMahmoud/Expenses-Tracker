import express from 'express';        
import * as UserValidator from "../Middlewares/UserValidator.js";
import * as UserController from "../controllers/User.controller.js";

const router= express.Router();

router.route('/users')
    .get(UserController.getUsers)
    .post(UserValidator.validateUser, UserController.createUser);

router.route('/users/:id')
    .get(UserController.getUserById)
    .put(UserValidator.validateUser, UserController.updateUser)
    .delete(UserController.deleteUserById);

export default router;
