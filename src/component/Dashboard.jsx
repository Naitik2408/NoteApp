import React, { useEffect, useState } from 'react'
import appwriteDatabaseService from '../appwrite/database'
import img2 from "../assets/9805251_Mesa de trabajo 1.png"
import Notecard from './Notecard';
import { useSelector } from 'react-redux';
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa6";
import MobileNav from './MobileNav';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [userData, setUserData] = useState([]);
    const [mobileNav, setMobileNav] = useState(false)
    const navigate = useNavigate();
    const currentUserDetails = useSelector(state => state.authData)
    useEffect(() => {
        if (!currentUserDetails.status || !currentUserDetails.userData) {
          navigate('/login');
        }
      }, [currentUserDetails, navigate]);
    appwriteDatabaseService.allPosts([]).then((res) => {
        if (res) {
            const currentUserData = res.documents.filter(item => item.userId === currentUserDetails.userData.$id);
            setUserData(currentUserData)
        } else {
            console.log("data not recived");
        }
    })

    const handleMobileNav = ()=>{
        if(mobileNav){
            setMobileNav(false)
        }else{
            setMobileNav(true)
        }
    }
    return (
        <div className='h-full'>
            <div className='md:text-3xl font-semibold text-gray-700 flex justify-between h-[10%] items-center md:h-[15%] md:items-start text-xl relative'>
                <div className='flex gap-8 items-center'>
                    <div>Your Notes..</div>
                </div>
                <div className='hidden md:flex text-sm items-center gap-2'>
                    <div className='flex flex-col gap-0 justify-center'>
                        <div>{currentUserDetails.userData.name}</div>
                        <div className='text-gray-500 text-[10px]'>{currentUserDetails.userData.email}</div>
                    </div>
                    <img src={img2} alt="" className='w-12' />
                </div>
                <div className='md:hidden' onClick={handleMobileNav}>
                    <FaBars/>
                </div>
                
                {
                    mobileNav ? <div className='absolute top-10 bg-white w-full py-8'>
                    <MobileNav/>
                </div> : null
                }
            </div>
            {!userData || userData.length == 0 ?
                <div className='flex justify-center py-8 md:h-[85%] h-[90%] border-2 rounded-md items-center'>
                    <Link to={"/profile/addNote"}>
                        <div className='p-5 flex flex-col justify-center items-center gap-3 rounded-lg bg-purple-300 text-xl cursor-pointer hover:bg-purple-400'>
                            <CiSquarePlus className='text-3xl' />
                            Add Note
                        </div>
                    </Link>

                </div> :
                <div className='dashboardScroller flex md:justify-between justify-center items-center md:py-8 md:h-[85%] h-[90%] overflow-auto'>
                    <div className='h-full flex flex-wrap md:justify-between justify-center gap-4 md:px-3'>
                        {userData.map(item => {
                            return <Notecard key={item.$id} title={item.NoteTitle} note={item.Note} />
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Dashboard
