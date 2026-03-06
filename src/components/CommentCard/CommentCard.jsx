import React from 'react'

export default function CommentCard({comment}) {
    const {commentCreator,content,image,createdAt,repliesCount,likes}=comment
    const {username,photo,name}=commentCreator
  return (
    <>
    <div class=" w-fit  p-4">
  <div class="flex items-start space-x-3">
    
  
    <img 
      src={photo} 
      alt="avatar"
      class="w-10 h-10 rounded-full"
    />

    <div class="flex-1">

      <div class="bg-[#F0F2F5] rounded-lg px-4 py-3">
        <div class=" space-x-2">
          <h3 class="font-semibold text-gray-900 text-sm">
            {name}
          </h3>
          <span class="text-gray-500 text-sm">
           {username}
          </span>
        </div>

        
        <p class="text-gray-800 text-sm mt-1">
        {content}
        </p>
        {image && <img src={image} className="mt-2" alt="" />}
      </div>

      
      <div class="flex items-center space-x-4 text-gray-500 text-sm mt-2 pl-1">
        {/* <span>Feb 25, 1:24 PM</span> */}
        <span>
  {new Date(createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })}
</span>

        <button class="hover:underline">Like ({likes?.length})</button>
        <button class="hover:underline">Reply </button>
      </div>

    </div>
  </div>
</div>
    </>
  )
}
