import React from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../loader/Loader";
import Profile from './../Profile/Profile';
import PostCard from "../PostCard/PostCard";

export default function ProfileCard({user}) {
  



 
  const{photo,name,followersCount,followingCount,email,bookmarksCount,_id}=user


  
function getAllPosts(){
  return   axios.get(`https://route-posts.routemisr.com/users/${_id}/posts`,{
    headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }
  })
}

const {data,isError,error,isLoading}=useQuery({
queryKey:['getposts'],
queryFn:getAllPosts
})


if(isLoading){
  return <Loader/>
}


if(isError){
  return <div className='flex justify-center items-center'>
    <h1>{error}</h1>
  </div>
}


// console.log('profileData',data.data.data.posts)

const profilePosts=data.data.data.posts

  return (
    <div className="bg-[#f8f9fb] min-h-screen font-sans">
      {/* القسم العلوي: الخلفية الزرقاء */}
      <div className="h-[300px] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#7fa1c3] relative w-[85%] mx-auto">
        <button className="absolute right-10 top-8 bg-[#00000050] hover:bg-[#00000080] text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold backdrop-blur-sm transition-all">
          <FaCamera className="text-sm" />
          Add cover
        </button>
      </div>

      {/* الحاوية الرئيسية للكارت */}
      <div className="w-[83%] mx-auto px-6">
        
        {/* كارت البروفايل الأبيض */}
        <div className="bg-white rounded-[40px] shadow-sm -mt-32 relative z-10 p-10">
          
          {/* الجزء العلوي: الصورة والبيانات والإحصائيات */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* اليسار: الصورة والاسم */}
            <div className="flex gap-6 items-center">
              <div className="relative">
                <img
                  src={photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-[6px] border-white shadow-sm object-cover"
                />
              </div>
              <div>
                <h1 className="text-[32px] font-extrabold text-[#1a202c] leading-tight">
                  {name}
                </h1>
                <p></p>
                <p className="text-gray-400 text-xl mt-1">{user.username}</p>
                <div className="flex items-center gap-2 bg-[#eef2ff] text-[#4f46e5] text-[13px] font-medium px-4 py-1.5 rounded-full mt-3 w-fit border border-[#e0e7ff]">
                   <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-pulse"></span>
                   Route Posts member
                </div>
              </div>
            </div>

            {/* اليمين: المربعات الثلاثة (Followers, etc) */}
           
           <div className="flex gap-4 w-full lg:w-auto">
  {[
    { label: "FOLLOWERS", value: followersCount },
    { label: "FOLLOWING", value: followingCount },
    { label: "BOOKMARKS", value: bookmarksCount },
  ].map((item) => (
    <div
      key={item.label}
      className="flex-1 lg:w-35 bg-white border border-gray-100 rounded-[24px] p-5 text-center shadow-sm"
    >
      <p className="text-[#94a3b8] text-[11px] font-bold tracking-wider mb-1">
        {item.label}
      </p>

      <p className="text-3xl font-black text-[#1e293b]">
        {item.value ?? 0}
      </p>
    </div>
  ))}
</div>
          </div>

          {/* القسم السفلي: About والمربعات الزرقاء */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
            
            {/* صندوق About */}
            <div className="lg:col-span-2 border border-gray-100 rounded-[32px] p-8 bg-[#fcfdfe]">
              <h3 className="font-bold text-[#334155] text-lg mb-6">About</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#64748b]">
                  <HiOutlineMail className="text-xl" />
                  <span className="text-[15px]">{email}</span>
                </div>
                <div className="flex items-center gap-3 text-[#64748b]">
                  <FiUser className="text-xl" />
                  <span className="text-[15px]">Active on Route Posts</span>
                </div>
              </div>
            </div>

            {/* صناديق My Posts & Saved */}
            <div className="flex flex-col gap-6">
              <div className="border border-gray-100 rounded-[28px] p-7 bg-[#fcfdfe] relative overflow-hidden group">
                <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">MY POSTS</p>
                <p className="text-4xl font-black text-[#1e293b]">{profilePosts.length}</p>
              </div>

              <div className="border border-gray-100 rounded-[28px] p-7 bg-[#fcfdfe]">
                <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">SAVED POSTS</p>
                <p className="text-4xl font-black text-[#1e293b]">{bookmarksCount}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="w-[83%] mx-auto px-6 flex flex-col gap-5 mt-16">
        {profilePosts?.map((post)=>{return <PostCard key={post.id} postInfo={post} queryKey={['getposts']}/>})}
        

      </div>
    </div>
  );
}