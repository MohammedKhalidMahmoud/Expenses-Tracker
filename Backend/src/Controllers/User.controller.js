import * as UserService from "../Services/User.service.js";
import { AppError } from "../Utils/AppError.js";
import { errorResponse, successResponse } from "../Utils/resposne.js";

export async function getUsers(req, res){
    try{
        const users = await UserService.getUsers();
        return successResponse(res, "Users retrieved successfully", users, 200);
    } catch (error) {
        console.log(error);
        return errorResponse(res, error.message || 'Error retrieving users', error.statusCode, error.status);
    }
}

export async function getUserById(req, res){
    const userId = req.params.id;
    try{
        const user = await UserService.getUserById(userId);
        if(!user){
            return errorResponse(res, "User not found", 404, "No user with the given ID");
        }
        return successResponse(res, "User retrieved successfully", user, 200)
    } catch (error) {
        return errorResponse(res, error.message || 'Error retrieving user', error.statusCode, error.status);
    }
}

export async function deleteUserById(req, res){
    const userId = req.params.id;
    try{
        const deleted = await UserService.deleteUserById(userId);
        if(!deleted){
            return errorResponse(res, "User not found", 404, "No user with the given ID");
        }
        return successResponse(res, "User deleted successfully", deleted, 200)
    } catch (error) {
        // console.error(error);
        return errorResponse(res, error.message || 'Error deleting user', error.statusCode, error.status);
    }
}



export async function updateUser(req, res){
    const userId = req.params.id;
    const updateData = req.body;
    try{
        const user = await UserService.getUserById(userId);
        if(!user){
            return errorResponse(res, "User not found", 404, "No user with the given ID");
        }
        await UserService.modifyUser(userId, updateData);
        return successResponse(res, "User updated successfully", user, 200)
    } catch (error) {
       return errorResponse(res, error.message || 'Error updating user', error.statusCode, error.status);
    }
}



export async function deactivateUser(req, res){
    const userId = req.params.id;
    try{
        const updated = await UserService.deactivateUser(userId);
        if(!updated){
            return errorResponse(res, "User not found", 404, "No user with the given ID");
        }
        return successResponse(res, "User deactivated successfully", updated, 200);
    } catch (error) {
        throw new AppError(error.message || 'Error deactivating user', error.statusCode, error.status);
    }
}

export async function updateProfilePicture(req, res){
    return successResponse(res, "Profile picture updated successfully", req.file, 200);
}