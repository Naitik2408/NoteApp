import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../css/home.css"
import img1 from "/logo.png"

function Home() {
  const nevigate = useNavigate();
  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'));
      if(userData && userData.emailVerification){
        nevigate("/profile")
      }
  },[])
  return (
    <div className='w-screen h-screen bg-gray-50 p-9'>
      <div className='w-full h-[20%] flex justify-between'>
        <div className='flex justify-center items-start gap-3 text-2xl font-semibold text-gray-700'>
          <img src={img1} alt="" className='w-12' />
          Note App
        </div>
        <Link to={"/signUp"}>
          <div className='loginBtn w-fit py-2 px-4 rounded-md cursor-pointer hover:bg-purple-600'>Sign Up</div>
        </Link>
      </div>
      <div className='w-full h-[80%] flex flex-col justify-center items-center gap-y-4 text-center'>
        <h1 className='text-4xl mb-2'>Welcome to the Note App Tracker!</h1>
        <p className="text-center text-xl mb-4 w-92 w-[70%]">Track your favorite cryptocurrencies in real time. Get updates on market trends and prices.</p>
        <Link to={"/login"}>
          <div className='loginBtn w-fit py-2 px-4 rounded-md cursor-pointer hover:bg-purple-600'>Login</div>
        </Link>
      </div>
    </div>
  )
}

export default Home
