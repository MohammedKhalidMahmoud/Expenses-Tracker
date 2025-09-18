
import { generateToken } from '../Utils/JWT.js';
import * as AuthService from "../Services/Auth.service.js";
import { AppError } from '../Utils/AppError.js';
import {successResponse, errorResponse} from './../Utils/resposne.js';

export async function login(req, res){
    const { email,  password } = req.body;
    const user = await AuthService.findUserByCredentials(email,password);
    // console.log(user);
    if(!user){
        errorResponse(res, "Invalid email or password", 401, "can not find the user with given credentials");
    }    
    let token=generateToken(user.id, user.role, email);
    return successResponse(res, "logged in successfully", { token, user }, 200);
}

export async function signup(req, res){
    const { name, email, password, rePassword, role, isActive } = req.body;
    try{
        const new_user=await AuthService.createUser(name, email, password, rePassword, role, isActive);
        return successResponse(res, "User created successfully",  new_user, 200);
    }
    catch(error){
            return errorResponse(res, error.message, error.statusCode, error.status);
        }
    }


export function resetPassword(req, res){
    const [oldPassword, newPassword, rePassword]=req.body;
    AuthService.resetPassword();
    res.status(200).json({ message:"reset password successfully"});
}

