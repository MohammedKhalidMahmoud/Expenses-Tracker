
import { generateToken } from '../Utils/JWT.js';
import * as userService from "../Services/User.service.js";

export async function login(req, res){
    const { email,  password } = req.body;
    const user = await userService.login(email,password);
    // console.log(user);
    if(!user){
        return res.status(401).json({ 
            error: 'Invalid credentials',
            message: 'Please check your email and password'
        });
    }    
    let token=generateToken(email, user.id);
    console.log("token: ",token);
    res.status(200).json({ message:"logged in successfully", token});
}

export async function signup(req, res){
    const { name, email, password } = req.body;
    // console.log(name, email, password);
    try{
        const new_user=await userService.signup(name, email, password);
        return res.status(201).json({ message:"signed up successfully", new_user});
    }
    catch(error){
        return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Error creating user'
        });
    }
}

export function resetPassword(req, res){
    userService.resetPassword();
    res.status(200).json({ message:"reset password successfully"});
}

