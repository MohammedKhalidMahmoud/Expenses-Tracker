import React from 'react'

export default function MagicalComponent(props) {
  return (
    <>
        <div className='shadow-lg bg-white rounded-lg p-4 m-4 flex flex-col items-center justify-center'> 
            <h2 className='text-4xl text-blue-500 font-bold'>{props.children}</h2> 
            <p className='text-lg font-semibold mt-3'>{props.value}</p> 
        </div>
    </>
  )
}
