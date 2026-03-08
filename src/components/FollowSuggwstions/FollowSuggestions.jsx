import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { CgUserAdd } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function FollowSuggestions({suggestionFollower,sugKey}) {

    // console.log('following',suggestionFollower)
    const {username,photo,name,mutualFollowersCount,followersCount,_id}=suggestionFollower


      function handleFollow(){

   


    return axios.put(`https://route-posts.routemisr.com/users/${_id}/follow`,{},{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})
  }

  const queryClient=useQueryClient()

  const {mutate,isPending,data}=useMutation({
    mutationFn:handleFollow,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:sugKey})
    

    }
  })


 


   console.log('followData',data)

  return (
    <>
    <div className='w-full mt-2.5 p-2.5  border border-taupe-300 rounded-2xl '>
        <div className='flex justify-between '>
            <Link to={`/usrprofile/${_id}`} className='flex gap-2'>
                <div className='w-10 h-10  rounded-full '>
                    <img src={photo} className='w-full rounded-full' alt="" />
                   
                </div>
                 <div>
                        <p className='text-[14px] font-bold'>{name}</p>
                        <p className='text-[12px] font-normal text-[#62748e]'>{username}</p>
                 </div>
            </Link>

            <div onClick={mutate}  className='cursor-pointer flex gap-2 bg-[#EDF4FF] w-fit justify-center items-center h-fit px-2 py-1 rounded-xl'>
               <CgUserAdd color='#1877f2'/>
                <p className='text-[12px] font-bold text-[#1877f2]'>Follow</p>
            </div>
        </div>
        <div className='flex gap-2 mt-2'>
            <p className='bg-[#F1F5F9] text-[11px] font-semibold text-[#62748e] w-fit py-1=0.5 rounded-2xl px-2'>{followersCount} followers</p>
            <p className='bg-[#EDF4FF] text-[11px] font-semibold text-[#1877f2] w-fit py-1=0.5 rounded-2xl px-2'>{mutualFollowersCount} mutual</p>
        </div>
    </div>
    
    </>
  )
}
