
import { generateToken } from '../Utils/JWT.util.js';
import * as AuthService from "../Services/Auth.service.js";
import { successResponse, errorResponse } from './../Utils/resposne.js';

export async function login(req, res){
    const { email,  password } = req.body;
    const data = await AuthService.login(email,password);
    
    const {user, accessToken, refreshToken} = data;

    return successResponse(res, "logged in successfully", { accessToken, refreshToken, user }, 200);
}

export async function signup(req, res){
    const newUser= await AuthService.signup(req.body);
    return successResponse(res, "User created successfully",  newUser, 200);
}


export function resetPassword(req, res){
    const [oldPassword, newPassword, rePassword]=req.body;
    AuthService.resetPassword();
    res.status(200).json({ message:"reset password successfully"});
}

export async function logout(req,res){

}

export async function refreshToken(req, res){
    const {refreshToken} = req.body;
    AuthService.refreshToken(refreshToken);
}

export async function forgotPassword(req, res){
}