import React, { useEffect, useState } from 'react'
import appwriteDatabaseService from '../appwrite/database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import MobileNav from './MobileNav';

function AddNote() {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
  }, []);
  const currentUserId = useSelector(state => state.authData.userData.$id)
  // console.log("this is current user id", currentUserId)




  function handleSubmit(e) {
    e.preventDefault()
    appwriteDatabaseService.createPost({ NoteTitle: title, Note: content, userId: currentUserId }).then(res => {
      console.log("created a post: ", res)
      navigate("/profile/")
    }).catch((err) => { console.error("Error creating the note: ", err) })
  }

  const handleMobileNav = () => {
    if (mobileNav) {
      setMobileNav(false)
    } else {
      setMobileNav(true)
    }
  }
  return (
    <div className='w-full h-full'>
      <div className='flex justify-between relative md:hidden font-semibold text-gray-500 text-xl items-center h-[10%]'>
        <div>Write Note...</div>
        <div className='md:hidden' onClick={handleMobileNav}>
          <FaBars />
        </div>
        {
          mobileNav ? <div className='absolute top-10 bg-white w-full py-8'>
            <MobileNav />
          </div> : null
        }
      </div>
      <div className='h-[15%]'>
        <input type="text" placeholder='Title' className='bg-transparent text-3xl text-gray-900 outline-none w-full h-full py-4 font-semibold' value={title} onChange={(e) => { setTitle(e.target.value) }} />
      </div>
      <div className='md:h-[75%] h-[65%]'>
        <textarea name="note" id="note" cols="30" rows="10" placeholder='Take a note...' className='text-xl outline-none w-full h-full max-h-full text-400' value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>
      </div>
      <div className='h-[10%] w-full flex items-center'>
        <div className='bg-purple-500 h-full px-5 flex justify-center items-center rounded-md text-white hover:bg-purple-400 cursor-pointer' onClick={handleSubmit}>Add Note</div>
      </div>
    </div>
  )
}

export default AddNote
