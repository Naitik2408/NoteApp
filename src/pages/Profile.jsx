import React, { useEffect, useState } from 'react'
import appwriteDatabaseService from '../appwrite/database'
import img1 from "/logo.png"
import { CiGrid41 } from "react-icons/ci";
import { HiMiniChevronRight } from "react-icons/hi2";
import { CiStickyNote } from "react-icons/ci";
import { PiCommandThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaFaceSadTear } from "react-icons/fa6";
import { logout as authLogout, loadUserData } from "../app/authSlice"
import authService from '../appwrite/auth';
import { useLocation } from 'react-router-dom';
import Loder from '../component/Loder';


function Profile() {
  const [loder, setLoder] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();

  const currentUserDetails = useSelector(state => state.authData)
  useEffect(() => {
  }, []);

  const logoutHandler = () => {
    setLoder(true)
    authService.logout().then(() => {
      dispatch(authLogout())
      setLoder(false)
      localStorage.removeItem('userData');
      navigate("/login")
    })
  }
  return (
    <div className='w-screen h-screen flex justify-between'>
      {(currentUserDetails.status && currentUserDetails.userData.emailVerification) ?
        <div className='w-full h-full flex'>
          <div className='w-[25%] h-full p-5 md:flex flex-col justify-between shadow-md shadow-gray-400 hidden'>
            <div>
              <div className='flex items-center gap-x-3 text-2xl flex-wrap'>
                <img src={img1} alt="" className='w-12' />
                Welcome,<span className='text-purple-600 font-bold'>{currentUserDetails.userData.name}</span>
              </div>
              <div className='mt-8 flex flex-col gap-2'>
                <Link to={"/profile/"}>
                  <div className={`bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-purple-400 flex justify-between items-center ${(location.pathname === "/profile/" || location.pathname === "/profile") ? 'bg-purple-400' : ''}`}>
                    <div className='flex justify-center items-center gap-4'><CiGrid41 />Dashboard</div>
                    <HiMiniChevronRight />
                  </div>
                </Link>
                <Link to={"/profile/addNote"}>
                  <div className={`bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-purple-400 flex justify-between items-center ${location.pathname === "/profile/addNote" ? 'bg-purple-400' : ''}`}>
                    <div className='flex justify-center items-center gap-4'><CiStickyNote />Add Note</div>
                    <HiMiniChevronRight />
                  </div>
                </Link>
                <Link to={"/profile/myProfile"}>
                  <div className={`bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-purple-400 flex justify-between items-center ${location.pathname === "/profile/myProfile" ? 'bg-purple-400' : ''}`}>
                    <div className='flex justify-center items-center gap-4'><PiCommandThin />Profile</div>
                    <HiMiniChevronRight />
                  </div>
                </Link>


              </div>
            </div>
            <div className='bg-gray-200 p-3 rounded-md cursor-pointer hover:bg-purple-400 flex justify-between gap-4 items-center' onClick={logoutHandler}>
              <div className='flex gap-4 items-center'><CiSettings />Logout</div>
              {loder? <Loder/>: null}
            </div>
          </div>
          <div className='md:w-[75%] w-full h-full overflow-y-scroll p-3 md:p-12'>
            <Outlet />
          </div>
        </div> :
        <div className='h-screen w-screen bg-white flex flex-col gap-4 justify-center items-center'>
          <div className='flex flex-col gap-4 justify-center items-center' >
            <FaFaceSadTear className='text-9xl animate-bounce' />
            <div className='text-xl px-9 text-center'>You are not logged in or not verified your account. Please login or verify to access the features of this app.</div>
          </div>
          <Link to={"/login"}><div className='loginBtn w-fit py-2 px-4 rounded-md cursor-pointer' >Login</div></Link>
        </div>
      }
    </div>
  )
}

export default Profile
