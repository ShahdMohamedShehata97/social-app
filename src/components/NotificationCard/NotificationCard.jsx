import React from 'react'
import { GoCheck } from "react-icons/go";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { BiRepost } from "react-icons/bi";
export default function NotificationCard({notification}) {
    const {isRead,actor,_id,type}=notification
    const {name,photo}=actor
  return (
    <div> <div className=" p-3 mt-3 rounded-xl bg-blue-50">
          <div className="flex items-center gap-3">
            <img src={photo} alt="Dai Morse" className="w-10 h-10 rounded-full" />
           <div className='flex gap-2 items-center'>
            <p className='text-[16px] font-normal'>{name}</p>
            <p className='text-[14px] font-normal'>{type}</p>
           </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <div>
                {type ==="comment_post" && <div className='w-8 h-8 bg-white flex justify-center items-center rounded-full'>
                    <FaRegComment size={15} color='#1877f2' /></div>}
                {type ==="like_post" && <div className='w-8 h-8 bg-white flex justify-center items-center rounded-full'>
                    <CiHeart size={18} color='#FF2056'/></div>}
                {type ==="share_post" && <div className='w-8 h-8 bg-white flex justify-center items-center rounded-full'>
                    <BiRepost size={18} color='green'/></div>}
            </div>
            <button className="px-2 py-1 text-[12px] font-bold text-[#1877f2] bg-white rounded hover:bg-[#E7F3FF] flex items-center gap-1">
              <GoCheck /> Mark as read
            </button>
            {/* <span className="text-xs text-gray-500">29m</span> */}
          </div>
        </div>
        </div>
  )
}
