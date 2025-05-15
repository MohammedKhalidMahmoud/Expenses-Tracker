import React, { useState, useContext } from 'react'
import axios from 'axios';
import { tokenContext } from '../../context/token';
export default function Expenses_form() {
    const {token}= useContext(tokenContext);
    const [formData, setFormData]=useState({
        amount: '',
        category: '',
        date: '',
        description: ''
    });
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
function add_expense(e) {
    e.preventDefault();
    setLoading(true);
    // setError(null);
    // setSuccess(null);
    const data = {
        amount: formData.amount,
        category: formData.category,
        date: formData.date,
        description: formData.description
    }
    console.log(data);
    axios.post('http://localhost:3000/api/expens',
         data,{
        headers: {
            token
         }
})
    .then(data => {
        console.log(data);
        setSuccess("Expense added successfully");
        setLoading(false);
    })
    .catch(error => {
        console.error('Error:', error);
        setError("Error adding expense");
        setLoading(false);
    });
}
  return (
    <>
        

    <form className="max-w-md mx-auto mt-10">
        <h2 className="text-center text-4xl font-bold mt-4 mb-4 text-blue-500">Add Expense Details</h2>
        <div className="relative z-0 w-full mb-5 mt-10 group">
            <input value={formData.amount} onChange={(e)=>{setFormData({...formData, amount:e.target.value})}} type="number" name="floating_amount" id="floating_amount" className="input_field peer" placeholder=" " required />
            <label htmlFor="floating_amount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Amount</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={formData.category} onChange={(e)=>{setFormData({...formData, category:e.target.value})}} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input value={formData.date} onChange={(e)=>{setFormData({...formData, date:e.target.value})}} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>
        
        <div className="relative z-0 w-full mb-5 group">
            <input value={formData.description} onChange={(e)=>{setFormData({...formData, description:e.target.value})}} type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
        </div>
        
        <button onClick={add_expense} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

    </>
  )
}


// Fields: amount, category, date, description)