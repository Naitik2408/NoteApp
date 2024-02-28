import React, {useState} from 'react'
import img1 from '../assets/9805251_Mesa de trabajo 1.png'
import { useSelector } from 'react-redux'
import { FaBars } from "react-icons/fa6";
import MobileNav from './MobileNav';

function ProfileInProfile() {
  const userData = useSelector(state => state.authData.userData);
  const [mobileNav, setMobileNav] = useState(false)

  const dateString = userData.$createdAt;

const date = new Date(dateString);

const format = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "Asia/Kolkata",
  hour12: true 
}

const createdAt = date.toLocaleString("en-IN", format);
const updatedAt = date.toLocaleString("en-IN", format);

  const handleMobileNav = () => {
    if (mobileNav) {
      setMobileNav(false)
    } else {
      setMobileNav(true)
    }
  }
  return (
    <div className='w-full min-h-full border-2 rounded-md p-4 md:flex '>
      <div className='flex justify-between relative md:hidden font-semibold text-gray-500 text-xl items-center h-[10%] border-b-gray-200 border-b-2 mb-5'>
        <div>Profile...</div>
        <div className='md:hidden' onClick={handleMobileNav}>
          <FaBars />
        </div>
        {
          mobileNav ? <div className='absolute top-10 bg-white w-full py-8'>
            <MobileNav />
          </div> : null
        }
      </div>
      <div className='md:w-[40%] w-full md:h-full'>
        <div className='h-[70%] flex justify-center w-full'><img src={img1} alt="" className='md:h-full w-80' /></div>
        <div className='h-[30%] flex justify-center pt-4'>
          <div className='flex flex-col items-center mb-7'>
            <div className='text-3xl font-semibold'>{userData.name}</div>
            <div className='text-xl'>{userData.email}</div>
          </div>
        </div>
      </div>
      <div className='md:w-[60%] w-full md:h-full px-3 grid grid-cols-2 gap-4 justify-start  '>
        <div className='border-[1px] border-gray-500 w-full h-full py-2 px-5 rounded-md bg-purple-100'>
          <div className='font-semibold text-gray-900'>Account Created on</div>
          <div className='text-gray-700 mt-3'>{createdAt}</div>
        </div>
        <div className='border-[1px] border-gray-500 w-full h-full py-2 px-5 rounded-md bg-purple-100'>
          <div className='font-semibold text-gray-900'>Account Updated on</div>
          <div className='text-gray-700 mt-3'>{updatedAt}</div>
        </div>
        <div className='border-[1px] border-gray-500 w-full h-full py-2 px-5 rounded-md bg-purple-100'>
          <div className='font-semibold text-gray-900'>Phone Number</div>
          <div className='text-gray-700 mt-3'>{userData.phone? userData.phone : "Not Provided"}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInProfile
