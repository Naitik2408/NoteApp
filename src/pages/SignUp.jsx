import React, { useState } from 'react'
import img1 from "../assets/studio_pc_2328_37 [Converted]-01.png"
import { Link, useNavigate } from "react-router-dom"
import authService from '../appwrite/auth';
import Loder from '../component/Loder';
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [loder, setLoder] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const uData = { email, name, password }

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoder(true);
    
    try {
      await authService.createAccount(uData);
      await authService.verifyUser();
      // if(res){
      //   console.log(res)
      //   alert("An email has been sent to your inbox. Please verify your account to proceed.")
      // }else{
      //   console.log('issue with verification')
      // }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoder(false);
    }
  }

  const displayPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  return (
    <div className='md:p-5 p-10 w-screen h-screen flex justify-center items-center bg-gray-100'>
      <div className='flex justify-between w-full h-full'>
        <div className='md:w-[50%] w-full h-full flex justify-center items-center flex-col'>
          <form action="" onSubmit={signupHandler} className='w-72'>
            <h1 className='text-4xl font-bold text-black mb-8'>Sign Up</h1>
            <label htmlFor='name' className='mb-4 block text-sm font-medium text-gray-900'>User Name</label>
            <input type='text' placeholder='User Name' className='w-full border rounded py-2 px-4 mb-4' required value={name} onChange={e => { setName(e.target.value) }} />
            <label htmlFor='email' className='mb-4 block text-sm font-medium text-gray-900'>Email Address</label>
            <input type='email' placeholder='Email Address' className='w-full border rounded py-2 px-4 mb-4' required value={email} onChange={e => { setEmail(e.target.value) }} />
            <label htmlFor='email' className='mb-4 block text-sm font-medium text-gray-900'>Password</label>
            <div className='relative'>
              <input type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full border rounded py-2 px-4 mb-4' required value={password} onChange={e => { setPassword(e.target.value) }} />
              <div className='absolute right-2 top-3 cursor-pointer text-gray-700 bg-white px-2 py-1' onClick={displayPassword}>{!showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}</div>
            </div>

            <button className='w-20 h-10 bg-blue-400 px-3 py-2 rounded-md text-white hover:bg-blue-300 flex justify-center items-center'>{loder ? <Loder /> : "Sign Up"}</button>
          </form>
          <div className='mt-5'>Already have account ? <Link to={"/login"} className='text-blue-400 underline'> Login to Account</Link></div>
        </div>
        <div className='w-[50%] h-full p-16 hidden md:flex justify-center items-center'>
          <img src={img1} alt="" className='w-full' />
        </div>
      </div>
    </div>
  )
}

export default SignUp
