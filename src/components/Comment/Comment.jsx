import React from 'react'
import { useEffect,useState } from 'react'
import axios, { all } from 'axios'
import { FaRegComment } from "react-icons/fa";
import { length } from './../../../node_modules/stylis/src/Tokenizer';
import CommentCard from '../CommentCard/CommentCard';
import { useQuery } from '@tanstack/react-query';

import CommentCreation from '../CommentCreation/CommentCreation';

export default function Comment({id}) {
  


//     function getAllComments(){

//   setisLoading(true)


//   axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,{
//     headers:{
//       "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
//     }
//   })
//   .then(function(resp){
//     // console.log('resp',resp)
//     console.log('comment',resp.data.data.comments)
//     setallComments(resp.data.data.comments)

   
//   })
//   .catch(function(error){
//     console.log('error',error)
//   })
//   .finally(()=>{
//     // setisLoading(false)
//   })
// }




// useEffect(function(){
//   getAllComments()
// },[])


// //   if(allComments?.length===0){
// //     return <div className='bg-gray-100 w-full p-2'>
// //       <div className=" bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center w-full mx-auto">
  
// //   {/* Icon Circle */}
// //    <div className='w-12.5 h-12.5 bg-[#E7F3FF] flex justify-center items-center rounded-lg'>
// //     <FaRegComment size={20} color='#1877f2'/>
// //    </div>

// //   {/* Title */}
// //   <h3 className="mt-4 text-lg font-semibold text-gray-800">
// //     No comments yet
// //   </h3>

// //   {/* Subtitle */}
// //   <p className="mt-1 text-gray-500 text-sm">
// //     Be the first to comment.
// //   </p>

// // </div>
// //     </div>
// //   }



  function getComment() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tkn')}`,
      }
    })

  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['comment', id],
    queryFn: getComment
  })

  if (isLoading) {
    return <div className='flex justify-center items-center bg-[#F7F8FA] w-full py-2 rounded-sm '>
      <p className='text-[14px] font-extrabold text-center'>Loading Comments</p>
    </div>
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center'>
        <h1>{error?.message}</h1>
      </div>
    )
  }


const allComments=data.data.data.comments

  return (
    <>
     
   {/* <div className='w-full  bg-[#E7F3FF]'>
    <div className='flex gap-2 items-center  bg-white  mb-3.5 py-4 mt-3.5'>
        <p className='text-[14] font-extrabold'>comments</p>
        <div className='w-5 h-5 rounded-full bg-white flex justify-center items-center text-[11px] font-bold text-[#1877f2]'>{allComments?.length}</div>
      </div>


  <div>


        {allComments?.length === 0 ? (
  <div className='bg-gray-100 w-full p-2'>
    <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center w-full mx-auto">
      
      <div className='w-12.5 h-12.5 bg-[#E7F3FF] flex justify-center items-center rounded-lg'>
        <FaRegComment size={20} color='#1877f2'/>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        No comments yet
      </h3>

      <p className="mt-1 text-gray-500 text-sm">
        Be the first to comment.
      </p>

    </div>
  </div>
) : (
  <div className='w-full'>
    <div className='flex justify-between w-full bg-gray-400 p-2 rounded-[10px]'>

      <div className='flex gap-2 items-center'>
        <p className='text-[14px] font-extrabold'>comments</p>
        <div className='w-5 h-5 rounded-full bg-[#E7F3FF] flex justify-center items-center text-[11px] font-bold text-[#1877f2]'>
          {allComments?.length}
        </div>
      </div>

      <select className='bg-[#F8FAFC] py-1 px-2 rounded-lg border border-[#e0e1e1]'>
        <option value="mostRelevant">Most relevant</option>
        <option value="newest">Newest</option>
      </select>

    </div>

    <div>
      {allComments?.map((comment)=>(
        <CommentCard key={comment._id} comment={comment}/>
      ))}
    </div>

  </div>
)}
      </div>
   </div> */}

<div className="w-full bg-[#F7F8FA] p-3 rounded-xl">

  {/* Header */}
  <div className="flex justify-between items-center bg-white mb-3 py-3 px-4 rounded-xl ">

    <div className="flex gap-2 items-center">
      <p className="text-[14px] font-bold text-gray-700">Comments</p>

      <div className="w-5 h-5 rounded-full bg-[#E7F3FF] flex justify-center items-center text-[11px] font-bold text-[#1877f2]">
        {allComments?.length}
      </div>
    </div>

    {allComments?.length > 0 && (
      <select className="bg-[#F8FAFC] py-1 px-2 rounded-lg border border-gray-200 text-sm">
        <option value="mostRelevant">Most relevant</option>
        <option value="newest">Newest</option>
      </select>
    )}

  </div>


  {/* No comments */}
  {allComments?.length === 0 ? (

    <div className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center">

      <div className="w-12 h-12 bg-[#E7F3FF] flex justify-center items-center rounded-lg">
        <FaRegComment size={20} color="#1877f2" />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        No comments yet
      </h3>

      <p className="mt-1 text-gray-500 text-sm">
        Be the first to comment.
      </p>

    </div>

  ) : (

    <div className="space-y-3">

      {allComments?.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}

    </div>

  )}

<CommentCreation id={id} queryKey={['comment', id]}/>

</div>
    
    </>
  )
}
