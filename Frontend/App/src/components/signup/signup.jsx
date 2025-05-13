import React, { useState } from 'react'
import axios from 'axios';
import bcrypt from 'bcryptjs';



export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function signup(e) {
        e.preventDefault();
        setLoading(true);
        console.log(name, email, password);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log(hashedPassword);
        return axios.post('http://localhost:3000/api/auth/signup', {
            name,
            email, 
            hashedPassword
        });
    }

  return (
    <form className="max-w-md mx-auto mt-10">
        <div className="relative z-0 w-full mb-5 group">
            <input value={name} onChange={e=>setName(e.target.value)} type="text" name="floating_name" id="floating_name" className=" input_field peer" placeholder=" " required />
            <label htmlFor="floating_name" className=" label">Name</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" name="floating_email" id="floating_email" className=" input_field peer" placeholder=" " required />
            <label htmlFor="floating_email" className=" label">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" name="floating_password" id="floating_password" className="input_field peer" placeholder=" " required />
            <label htmlFor="floating_password" className="label">Password</label>
        </div>
        <button onClick={signup} type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

    </form>
  )
}
