import express from 'express';        
import * as UserValidator from "../Middlewares/Validators/UserValidator.js";
// import * as UserController from "../Controllers/index.js";
import * as UserController from "../Controllers/User.controller.js";
import {authMiddleware} from '../Middlewares/auth.middleware.js';
import { requireAdminRole } from '../Middlewares/adminCheck.middleware.js';
// import {upload } from '../Middlewares/multer.middleware.js';

const router = express.Router();

router.route('/')
.get(authMiddleware, requireAdminRole, UserController.getUsers)

router.route('/:id')
.get(authMiddleware, UserController.getUserById)
.put(UserValidator.validateModification, authMiddleware, UserController.updateUser)
.delete(authMiddleware, UserController.deleteUserById)

router.patch('/:id/deactivate', authMiddleware, UserController.deactivateUser)
    // .patch('/activate', authMiddleware, requireAdminRole, UserController.deactivateUser);
    // router.post('/uploads', upload.single('image') ,UserController.updateProfilePicture);

export default router;
