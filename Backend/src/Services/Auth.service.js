import User from "../Models/User.model.js";

export function login(email, password) {
    return User.findOne({ where: { email, password } });
}

export function signup(name, email, password) {
    const user = User.findOne({ where: { email } });
    if (user) {
        const error = new Error('Email already exists');
        error.status = 409; // Conflict
        throw error;
    }
    const newUser = User.create({ name, email, password });
    return newUser;
}


export function resetPassword(){
    
}
