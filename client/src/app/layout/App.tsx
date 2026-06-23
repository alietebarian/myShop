import React from 'react'

export default function App() { 
  console.log(localStorage.getItem("accessToken"));
  
  return (
    <div className='bg-red-500'>App</div>
  )
}
