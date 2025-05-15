import React, { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
export default function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function login(e) {
        e.preventDefault();
        setLoading(true);
        console.log(userData.email, userData.password);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        console.log(hashedPassword);
        axios.post('http://localhost:3000/api/auth/login', {
            email: userData.email,
            password: hashedPassword
        }).then(response => {
            console.log(response);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log("Token saved to local storage");
            }
        }).catch(error => {
            console.error('Error:', error);
            setError("Error logging in");
        });
        setLoading(false);
        // console.log(token)
    }

  return (
    <form className="max-w-md mx-auto mt-10">
        <h2 className="text-4xl text-blue-600 font-bold  mb-10">Login</h2>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.email} onChange={e=>{setUserData({...userData, email:e.target.value})}} type="email" name="floating_email" id="floating_email" className=" input_field peer" placeholder=" " required />
            <label htmlFor="floating_email" className=" label">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.password} onChange={e=>{setUserData({...userData, password:e.target.value})}} type="password" name="floating_password" id="floating_password" className="input_field peer" placeholder=" " required />
            <label htmlFor="floating_password" className="label">Password</label>
        </div>
        <button onClick={login} type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        <Link to={"/signup"}>
            <h3 className='mt-5 text-sm font-semibold text-blue-600'>don't have an account ?</h3>
        </Link>
        
        
    </form>
  )
}
