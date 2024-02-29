import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'
import { IoCheckmarkDoneCircle } from "react-icons/io5";


function Verify() {
  useEffect(()=>{
    authService.urlSearch();
  },[])
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
      <div className='flex flex-col items-center justify-center'>
        <div className='text-9xl text-green-500 animate-pulse'><IoCheckmarkDoneCircle/></div>
        <div className='text-xl my-5'>Congratulations! you have successfully verified your account.</div>
        <Link to={"/login"}><div className='loginBtn w-fit py-2 px-4 rounded-md cursor-pointer' >Login</div></Link>
      </div>
    </div>
  )
}

export default Verify
