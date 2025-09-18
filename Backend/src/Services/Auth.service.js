import User from "../Models/User.model.js";
import { AppError } from '../Utils/AppError.js';
import bcrypt  from 'bcrypt';
import { errorResponse } from "../Utils/resposne.js";

export async function findUserByCredentials(email, password) {
    const user=await User.findOne({ where: { email }, attributes:['id', 'name', 'email', 'password', 'isActive','role', 'createdAt', 'updatedAt'] });
    if(!user) return null;
        
    const isMatch= await bcrypt.compare(password, user.password)
    if(!isMatch) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
}

export async function createUser(name, email, password, rePassword, role, isActive) {
    if(password!== rePassword){
        console.log(password, rePassword);
        throw new AppError('Passwords do not match', 400, 'Bad Request');
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new AppError('Email already exists', 409, 'Conflict');
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({ name, email, password:hashedPassword, role, isActive});
    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isActive: newUser.isActive,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt
    };
}


// export function resetPassword(oldPassword, newPassword, rePassword){
    
// }
