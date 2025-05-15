import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../../context/token';
import MagicalComponent from '../MagicalComponent/magicalComponent';
import Table from '../Table/table';
import List from '../List/list';
export default function Dashboard() {

    function calculateStatistics(data) {
        const sum = data.reduce((acc, curr) => acc + +curr.amount, 0);
        const avg = sum / data.length;
        const max = Math.max(...data.map(item => +item.amount));
        const min = Math.min(...data.map(item => +item.amount));
        return { sum, avg, max, min };
    }
    const [ApiResponse, setApiResponse]= useState([]);
    const [filteredData, setFilteredData]= useState([]);
    const [category, setCategory]= useState('');
    const {token}= useContext(tokenContext);
    const [statistics, setStatistics]= useState({
        sum: 0,
        avg: 0,
        max: 0,
        min: 0
    });
    useEffect(() => {
        axios.get('http://localhost:3000/api/expens', {
            headers: {
                token
            }
        }).then(response => {
            console.log(response.data.data);
            const new_data = response.data.data;
            setApiResponse(new_data);
            const fun_return=calculateStatistics(new_data)
            setStatistics(fun_return);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    , []);

    function getcategorizedData() {
        const filteredData = ApiResponse.filter(item => item.category === category);
        console.log(filteredData);
        setFilteredData(filteredData);
        const fun_response=calculateStatistics(filteredData);
        
        setStatistics(fun_response);
    }
  return (
    <>
        <List category={category} setCategory={setCategory}/>
        <button onClick={getcategorizedData} className='mt-3 ml-3'>get</button>
    
        <div className='flex justify-center items-center flex-wrap'>
            <MagicalComponent value={statistics.sum}>Sum</MagicalComponent>
            <MagicalComponent value={statistics.avg || 0}>Avg</MagicalComponent>
            <MagicalComponent value={statistics.max<0 ? 0 : statistics.max}>Max</MagicalComponent>
            <MagicalComponent value={statistics.min=== Infinity ? 0 : statistics.min}>Min</MagicalComponent>
        </div>
        <Table data={filteredData } />
    </>
    
  )
}
