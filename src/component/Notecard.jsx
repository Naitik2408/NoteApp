import React from 'react'
import img2 from "../assets/9805251_Mesa de trabajo 1.png";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

function Notecard({ title = "Title1", note = "hey everyone i am naitik." }) {
    return (
        <div className='w-64 group justify-between h-fit min-h-40 bg-gray-200 p-3 flex flex-col rounded-md cursor-pointer hover:bg-gray-300'>
            <div>
                <div className='flex justify-between items-center'>
                    <div className='font-medium'>{title}</div>
                    <div><img src={img2} alt="" className='w-9' /></div>
                </div>
                <div>{note}</div>
            </div>
            <div className='hidden justify-end gap-4 group-hover:flex'>
                <div className='bg-gray-50 rounded-md p-2 hover:bg-white'><FaRegEdit/></div>
                <div className='bg-red-400 rounded-md p-2 hover:bg-red-500'><RiDeleteBin5Line/></div>
            </div>

        </div>
    )
}

export default Notecard
