// import User from "../Models/User.model.js";
import * as userService from "./User.service.js";
import { AppError } from '../Utils/AppError.js';
import bcrypt  from 'bcrypt';
import { generateToken, verifyToken} from "../Utils/JWT.util.js";
import dotenv from 'dotenv';
dotenv.config();
export async function login(email, password) {
    const user= await userService.getUserByEmail(email);
    if(!user) throw new AppError("Invalid email or password", 401, "can not find the user with the given credentials");
        
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch) throw new AppError("Invalid email or password", 401, "can not find the user with the given credentials");

    let accessToken=generateToken(process.env.ACCESS_TOKEN_SECRET, user.id, user.role, email, '1h');
    let refreshToken=generateToken(process.env.REFRESH_TOKEN_SECRET, user.id, user.role, email, '7d');

    return {
        user,
        accessToken,
        refreshToken
    };
}

export async function signup(body) {
    return await userService.createUser(body);
}

export async function refreshToken(refreshToken){
    const {id, role, email, expiresIn}= verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user= userService.getUserById(id);
    if(!user) throw new AppError("User not found", 404, "No user found with the given ID");
    // generate new RefreshToken and new accessToken and invalidate the old ones
    const newRefreshToken= generateToken(REFRESH_TOKEN_SECRET, id, role, email, process.env.REFRESH_TOKEN_LIFE_LIMIT );
    const newِAccessToken= generateToken(ACCESS_TOKEN_SECRET, id, role, email, process.env.ACCESS_TOKEN_LIFE_LIMIT );
}

export async function forgetPassword(email){

}

export async function resetPassword(newPassword, rePassword){

}


