import React from 'react'

export default function Table({data}) {
    console.log(data);
  return (
    <>
        

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 text-center">
                    Category
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Date
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Description
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {data.map(item=>{
                return(
                    <tr>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.category}
                    </td>
                    <td className="px-6 py-4">
                        {item.date}
                    </td>
                    <td className="px-6 py-4">
                        {item.description}
                    </td>
                    <td className="px-6 py-4">
                        {item.amount}
                    </td>
                    
                </tr>
                ) 
            })}
            
           
        </tbody>
    </table>
</div>

    </>
    
  )
}
