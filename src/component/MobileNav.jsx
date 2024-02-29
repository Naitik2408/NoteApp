import React, {useState} from 'react'
import img2 from "../assets/9805251_Mesa de trabajo 1.png";
import { CiGrid41 } from "react-icons/ci";
import { HiMiniChevronRight } from "react-icons/hi2";
import { CiStickyNote } from "react-icons/ci";
import { PiCommandThin } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { Link,useNavigate } from 'react-router-dom';
import { logout as authLogout } from "../app/authSlice"
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import Loder from './Loder';

function MobileNav() {
    const [mobileNav, setMobileNav] = useState(false)
    const [loder, setLoder] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleMobileNav = ()=>{
        if(mobileNav){
            setMobileNav(false)
        }else{
            setMobileNav(true)
        }
    }

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
        <div className='w-full h-full flex flex-col gap-2'>
            <Link to={"/profile/"}>
                <div className='border-b-2 py-4 flex items-center gap-3' onClick={handleMobileNav}><CiGrid41 /> Dashboard</div>
            </Link>
            <Link to={"/profile/addNote"}>
                <div className='border-b-2 py-4 flex items-center gap-3' onClick={handleMobileNav}><CiStickyNote /> Add Note</div>
            </Link>
            <Link to={"/profile/myProfile"}>
                <div className='border-b-2 py-4 flex items-center gap-3' onClick={handleMobileNav}><PiCommandThin /> Profile</div>
            </Link>
            <div className='flex gap-x-4 items-center border-b-4 py-4'>
                <div><img src={img2} alt="" className='w-12' /></div>
                <div>
                    <div>Naitik kumar</div>
                    <div className='text-[12px]'>naitikkumar2408@gmail.com</div>
                </div>
            </div>
            {/* <div className='border-b-2 py-4 flex items-center gap-3' onClick={logoutHandler}><CiSettings />Logout</div> */}
            <div className='border-b-2 py-4 flex items-center gap-3' onClick={logoutHandler}>
              <div className='flex gap-4 items-center'><CiSettings />Logout</div>
              {loder? <Loder/>: null}
            </div>


        </div>
    )
}
export default MobileNav
