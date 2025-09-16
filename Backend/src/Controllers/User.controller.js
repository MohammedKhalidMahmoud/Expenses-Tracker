import * as UserService from "../Services/index.js";
import { AppError } from "../Utils/AppError.js";

export async function getUsers(req, res){
    try{
        const users = await UserService.getUsers();
        res.status(200).json({ 
            success: true,
            message: "Users retrieved successfully", 
            data: users 
        });
    } catch (error) {
        const err= new AppError(error.message || 'Error retrieving users', error.statusCode, error.status);
        throw err;
    }
}

export async function getUserById(req, res){
    const userId = req.params.id;
    try{
        const user = await UserService.getUserById(userId);
        if(!user){
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "User retrieved successfully", 
            data: user 
        });
    } catch (error) {
        const err= new AppError(error.message || 'Error retrieving user', error.statusCode, error.status);
        throw err;
    }
}

export async function deleteUserById(req, res){
    const userId = req.params.id;
    try{
        const deleted = await UserService.deleteUserById(userId);
        if(!deleted){
            return res.status(404).json({ 
                success: false,
                message: "User not found or already deleted" 
            });
        }
        res.status(200).json({ 
            success: true,
            message: "User deleted successfully" 
        });
    } catch (error) {
        const err= new AppError(error.message || 'Error deleting user', error.statusCode, error.status);
        throw err;
}
}

export async function createUser(req, res){
    const userData = req.body;
    try{
        const newUser = await UserService.createUser(userData);
        res.status(201).json({ 
            success: true,
            message: "User created successfully", 
            data: newUser 
        });
    } catch (error) {
        const err= new AppError(error.message || 'Error creating user', error.statusCode, error.status);
        throw err;
    }
}

export async function updateUser(req, res){
    const userId = req.params.id;
    const updateData = req.body;
    try{
        const [updated] = await UserService.modifyUser(userId, updateData);
        if(!updated){
            return res.status(404).json({
                success: false,
                message: "User not found or not updated"
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });
    } catch (error) {
       const err= new AppError(error.message || 'Error updating user', error.statusCode, error.status);
       throw err;
    }
}

export async function deactivateUser(req, res){
    const userId = req.params.id;
    try{
        const updated = await UserService.deactivateUser(userId);
        if(!updated){
            return res.status(404).json({
                success: false,
                message: "User not found or not deactivated"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deactivated successfully"
        });
    } catch (error) {
        const err= new AppError(error.message || 'Error deactivating user', error.statusCode, error.status);
       throw err;
    }
}