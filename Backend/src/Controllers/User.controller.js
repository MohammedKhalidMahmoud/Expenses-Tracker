import User from '../Models/User.model.js';
import { generateToken } from '../Utils/JWT.js';


export async function login(req, res){
    const { email,  password } = req.body;
    const user= await User.findOne({ where: { email, password } });
    console.log(user);
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
    console.log(name, email, password);
    if(await User.findOne({ where: { email } })){
        return res.status(409).json({ 
            error: 'Email already exists',
            message: 'Please use a different email address'
        });
    }
    const new_user = {
        name,
        email,
        password,
    }
    User.create(new_user)
        .then(user => {
            console.log("User created successfully:", user);
            return res.status(200).json({ message:"signed up successfully"});
        }).catch(error => {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: "Error creating user" });
        });
}