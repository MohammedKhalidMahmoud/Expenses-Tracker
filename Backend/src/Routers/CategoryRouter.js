import express from "express";
import * as CategoryController from "../Controllers/Category.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import { requireAdminRole } from "../Middlewares/adminCheck.middleware.js";

const router = express.Router();

router.get("/all", authMiddleware, requireAdminRole, CategoryController.getAllCategories);


router
  .route("/")
  .get(authMiddleware, CategoryController.getCategories)
  .post(authMiddleware, CategoryController.createCategory);


router
  .route("/:id")
  .get(authMiddleware, CategoryController.getCategoryById)
  .put(authMiddleware, CategoryController.updateCategory)
  .delete(authMiddleware, CategoryController.deleteCategory);

export default router;
