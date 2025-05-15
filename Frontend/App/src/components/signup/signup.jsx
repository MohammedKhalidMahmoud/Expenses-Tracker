import React, { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Link, Navigate } from 'react-router-dom';


export default function Signup() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: ''
        
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function signup(e) {
        e.preventDefault();
        setLoading(true);
        console.log(userData.name, userData.email, userData.password);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userData.password, salt);
        console.log(hashedPassword);
        axios.post('http://localhost:3000/api/auth/signup', {
            name: userData.name,
            email: userData.email,
            hashedPassword
        }).then(response => {
            console.log(response);
            if (response.status === 200) {
                // localStorage.setItem('token', response.data.token);
                // console.log("Token saved to local storage");
                Navigate('/login');
            }
        }).catch(error => { 
            console.error('Error:', error);
            setError("Error signing up");
        });
    }

  return (
    <form className="max-w-md mx-auto mt-10">
        <h2 className="text-4xl text-blue-600 font-bold mb-5">Signup</h2>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.name} onChange={e=>setUserData({...userData, name:e.target.value})} type="text" name="floating_name" id="floating_name" className=" input_field peer" placeholder=" " required />
            <label htmlFor="floating_name" className=" label">Name</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.email} onChange={e=>setUserData({...userData, email:e.target.value})} type="email" name="floating_email" id="floating_email" className=" input_field peer" placeholder=" " required />
            <label htmlFor="floating_email" className=" label">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.password} onChange={e=>setUserData({...userData, password:e.target.value})} type="password" name="floating_password" id="floating_password" className="input_field peer" placeholder=" " required />
            <label htmlFor="floating_password" className="label">Password</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={userData.rePassword} onChange={e=>setUserData({...userData, rePassword:e.target.value})} type="password" name="floating_rePassword" id="floating_rePassword" className="input_field peer" placeholder=" " required />
            <label htmlFor="floating_rePassword" className="label">rePassword</label>
        </div>

        <div className="flex justify-between">
            <button onClick={signup} type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <Link to={"/login"}>
            <h3 className='mt-5 text-sm font-semibold text-blue-600 inline-block'>already have an account ?</h3>

            </Link>

        </div>
    </form>
  )
}
