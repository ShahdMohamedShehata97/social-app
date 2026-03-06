import React, { useRef } from 'react'
// import { FaGlobeAmericas, FaRegImage, FaRegSmile } from "react-icons/fa";
// import { IoMdSend, IoIosArrowDown } from "react-icons/io";
import { FaGlobeAmericas, FaRegImage, FaRegSmile } from "react-icons/fa";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function PostCreation({queryKey}) {
  const userInfo = JSON.parse(localStorage.getItem('user'))

  const [imagePreview, setimagePreview] = useState(null)
  
  const captionInput=useRef()
  const imageInput=useRef()

  function handleChangeImage(e){

    console.log('e',e.target.files[0])
    setimagePreview(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
     

  }

  function handleClearImage(){
    setimagePreview(null)
    imageInput.current.value=''
  }


  function handleCreatePOst(){

    const postObj=new FormData();

    if(captionInput.current.value)
    {
      postObj.append('body',captionInput.current.value)
    }
    if(imageInput.current.value)
    {
      postObj.append('image',imageInput.current.files[0])
    }


    return axios.post(`https://route-posts.routemisr.com/posts`,postObj,{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})
  }

  const queryClient=useQueryClient()

  const {mutate,isPending}=useMutation({
    mutationFn:handleCreatePOst,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:queryKey})
      handleClearImage()
      captionInput.current.value=''

    }
  })

  console.log(userInfo)
  return (
  //  <>
  //  {/* <div className="max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden font-sans p-5">
      

  //     <div className="flex items-start gap-4 mb-4">
  //       <img
  //         src={userInfo.photo} 
  //         alt="User avatar"
  //         className="w-14 h-14 rounded-full border border-gray-100 object-cover"
  //       />
  //       <div className="flex flex-col gap-1.5">
  //         <span className="font-bold text-gray-900 text-lg leading-tight">{userInfo.name}</span>
  //         <button className="flex items-center gap-2 bg-[#f0f2f5] hover:bg-gray-200 px-3 py-1 rounded-lg text-gray-700 text-sm font-semibold w-fit transition">
  //           <FaGlobeAmericas size={14} className="text-gray-600" />
  //           Public
  //           <IoIosArrowDown size={14} />
  //         </button>
  //       </div>
  //     </div>

   
  //     <div className="relative">
  //       <textarea
  //         placeholder={`What's on your mind, ${userInfo.name}?`}
  //         className="w-full min-h-[160px] resize-none border border-gray-100 rounded-2xl p-5 text-xl text-gray-700 placeholder-gray-400 outline-none focus:ring-0 bg-transparent shadow-sm"
  //       />
       
  //       <div className="absolute bottom-3 right-3 text-gray-300 pointer-events-none">
  //          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M11 11L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  //       </div>
  //     </div>

     
  //     <hr className="my-4 border-gray-200" />

  //     <div className="flex items-center justify-between">
  //       <div className="flex items-center gap-2 md:gap-6">
        
  //         <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-xl transition">
  //           <FaRegImage className="text-[#45bd62]" size={24} />
  //           <span className="font-semibold text-gray-600 text-[15px]">Photo/video</span>
  //         </button>
          
  //         <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-xl transition">
  //           <FaRegSmile className="text-[#f7b928]" size={24} />
  //           <span className="font-semibold text-gray-600 text-[15px]">Feeling/activity</span>
  //         </button>
  //       </div>

        
  //       <button className="bg-[#7fb5ff] hover:bg-[#6fa5f0] text-white px-10 py-2.5 rounded-xl font-bold flex items-center gap-3 transition shadow-sm">
  //         <span className="text-lg">Post</span>
  //         <IoMdSend size={22} className="-rotate-12" />
  //       </button>
  //     </div>
  //   </div> */}
  //  </>


  <>
    <div className="w-full bg-white rounded-xl border border-gray-300 shadow-sm font-sans p-4">
      
      {/* 1. الرأس: الصورة والاسم والخصوصية */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={userInfo.photo} 
          alt="User avatar"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-bold text-[#050505] text-[17px] leading-tight mb-0.5">
            {userInfo.name}
          </span>
          <button className="flex items-center gap-1 bg-[#e4e6eb] hover:bg-gray-300 px-2 py-0.5 rounded-md text-[#65676b] text-[13px] font-semibold w-fit transition">
            <FaGlobeAmericas size={12} />
            <span className="ml-1">Public</span>
            <IoIosArrowDown size={14} />
          </button>
        </div>
      </div>

      {/* 2. منطقة النص */}
      <div className="mb-3 bg-[#F8FAFC] p-2.5 rounded-2xl border border-[#e4e5e6]">
        <textarea ref={captionInput}
          placeholder={`What's on your mind, ${userInfo.name.split(' ')[0]}?`}
          className="w-full min-h-25 resize-none border-none text-[20px] text-[#050505] placeholder-[#65676b] outline-none bg-transparent"
        />
      </div>

      {/* 3. حاوية الصورة المرفقة */}
     

     {imagePreview &&  <div className="relative mb-4 group">
        {/* زر الإغلاق X */}
        <div className="absolute top-2 right-2 z-10">
            <button onClick={handleClearImage} className="bg-white/80 hover:bg-white text-gray-800 p-1 rounded-full transition shadow-sm border border-gray-200">
                <IoMdClose size={20} />
            </button>
        </div>
        <div className="rounded-lg border border-gray-200 overflow-hidden">
             <img 
                src={imagePreview} 
                alt="Post content" 
                className="w-full object-cover h-65"
             />
        </div>
      </div>}

      {/* 4. الخط الفاصل */}
      <hr className="mb-3 border-gray-200" />

      {/* 5. التذييل: الأزرار وزر النشر */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Photo/video */}
          <label htmlFor='photo' className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
            <FaRegImage className="text-[#45bd62]" size={20} />
            <span className="font-semibold text-[#65676b] text-[15px]">Photo/video</span>
          </label>
          <input type="file" id='photo' ref={imageInput}  hidden onChange={handleChangeImage}/>
          
          {/* Feeling/activity */}
          <button className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition">
            <FaRegSmile className="text-[#f7b928]" size={20} />
            <span className="font-semibold text-[#65676b] text-[15px]">Feeling/activity</span>
          </button>
        </div>

        {/* زر النشر الأزرق */}
        <button onClick={mutate} disabled={isPending} className="bg-[#1b74e4] hover:bg-[#1565c0] text-white px-8 py-2 rounded-lg font-bold flex items-center gap-2 transition">
          <span className="text-[16px]">Post</span>
          <IoSend size={16} className="-rotate-12" />
        </button>
      </div>
    </div>
  
  </>
  
  )
}
