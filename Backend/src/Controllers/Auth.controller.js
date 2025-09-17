
import { generateToken } from '../Utils/JWT.js';
import * as AuthService from "../Services/Auth.service.js";
import { AppError } from '../Utils/AppError.js';

export async function login(req, res){
    const { email,  password } = req.body;
    const user = await AuthService.findUserByCredentials(email,password);
    // console.log(user);
    if(!user){
        const err= new AppError('Please check your email and password', 401, 'Invalid credentials');
        throw err;
    }    
    let token=generateToken(user.id, email);
    // console.log("token: ",token);
    res.status(200).json({ message:"logged in successfully", data:{ token, user } });
}

export async function signup(req, res){
    const { name, email, password, role } = req.body;
    // console.log(name, email, password);
    try{
        const new_user=await AuthService.createUser(name, email, password, role);
        return res.status(201).json({ message:"User careted successfully", data: new_user});
    }
    catch(error){
        const err= new AppError('Email already exists', 409, 'Conflict');
        throw err;
        }
    }


export function resetPassword(req, res){
    const [oldPassword, newPassword, rePassword]=req.body;
    AuthService.resetPassword();
    res.status(200).json({ message:"reset password successfully"});
}

