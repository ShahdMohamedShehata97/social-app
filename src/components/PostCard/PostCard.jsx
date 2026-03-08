import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@heroui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { useContext, useId, useRef, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { authContext } from "../../context/AuthContext";
import { useMutation, useQueryClient,useQuery} from "@tanstack/react-query";
import axios from "axios";
import EditPost from "../EditPost/EditPost";


export default function PostCard({postInfo,queryKey}) {
  
    const {body,image,user,topComment,sharesCount,likesCount,commentsCount,id,isShare, sharedPost}=postInfo

    const{username,photo,name,_id}=user
   
      let content, commentCreator;
  if (topComment) {
    content = topComment.content;
    commentCreator = topComment.commentCreator;
  }

  const CommentCreatorPhoto = commentCreator?.photo;
  const CommentCreatorName = commentCreator?.name;
  const commentCreatorUsernam = commentCreator?.username;
  const [showComments, setShowComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openLikes, setOpenLikes] = useState(false)

  const {userId}=useContext(authContext)
  const [openShare, setOpenShare] = useState(false);
  
const isLiked = postInfo.likes?.includes(userId)



  const queryclient=useQueryClient()
  function handlleDeletePost(){

      return axios.delete(`https://route-posts.routemisr.com/posts/${id}`,{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})

  }
  const {mutate,isPending,error}=useMutation({
    mutationFn:handlleDeletePost,
    onSuccess:()=>{
      queryclient.invalidateQueries({queryKey:queryKey})

    }

  })
   
 
  const shareCaption=useRef()

  function handleSharePost(){
      
       const body={
        body:shareCaption.current.value || " "
       }

      return axios.post(`https://route-posts.routemisr.com/posts/${id}/share`,body,{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})

  }

  const{mutate:sharePost,data}=useMutation({
   mutationFn:handleSharePost,
   onSuccess:()=>{
    shareCaption.current.value=null;
    setOpenShare(false)
    queryclient.invalidateQueries({queryKey:queryKey})
   }
  })



  function hadleLikeUnlike(){

    
      return axios.put(`https://route-posts.routemisr.com/posts/${id}/like`,{},{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})

  }

   const{mutate:likeUnlike,data:likeUnlikeData}=useMutation({
   mutationFn:hadleLikeUnlike,
   onSuccess:()=>{
  
   
    queryclient.invalidateQueries({queryKey:queryKey})
   }
  })

function getPostLikes(){
  return axios.get(`https://route-posts.routemisr.com/posts/${id}/likes`,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("tkn")}`
    }
  })
}


const {data:likesUsers}=useQuery({
  queryKey:["postLikes",id],
  queryFn:getPostLikes,
  enabled:openLikes
})

 

  // console.log('like',likeUnlikeData.data.data.liked)

  const likedPost=likeUnlikeData?.data?.data?.liked



  if (isEditing) {
  return (
    <EditPost
      postInfo={postInfo}
      setIsEditing={setIsEditing}
      queryKey={queryKey}
    />
  );
}
 
// const 


  return (
    <Card className="full">
      <CardHeader className="flex justify-between ">
       {/* {useId===_id ? <Link to='/profile' className="flex gap-3">
         <Image

          alt="heroui logo"
          height={40}
          radius="sm"
          src={photo}
          width={40}
            className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">{username}</p>
        </div>
       </Link>
       
       :
       
       <Link to={`/usrprofile/${_id}`} className="flex gap-3">
         <Image

          alt="heroui logo"
          height={40}
          radius="sm"
          src={photo}
          width={40}
            className="rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="text-md">{name}</p>
          <p className="text-small text-default-500">{username}</p>
        </div>
       </Link>} */}

       {userId === _id ? (
  <Link to="/profile" className="flex gap-3">
    <Image
      alt="user"
      height={40}
      radius="sm"
      src={photo}
      width={40}
      className="rounded-full object-cover"
    />
    <div className="flex flex-col">
      <p className="text-md">{name}</p>
      <p className="text-small text-default-500">{username}</p>
    </div>
  </Link>
) : (
  <Link to={`/usrprofile/${_id}`} className="flex gap-3">
    <Image
      alt="user"
      height={40}
      radius="sm"
      src={photo}
      width={40}
      className="rounded-full object-cover"
    />
    <div className="flex flex-col">
      <p className="text-md">{name}</p>
      <p className="text-small text-default-500">{username}</p>
    </div>
  </Link>
)}

       <div>
     <Dropdown className="w-fit" isDisabled={isPending}>
      <DropdownTrigger>
         <HiOutlineDotsHorizontal />
      </DropdownTrigger>
      {userId === _id ?<DropdownMenu aria-label="Static Actions" >
       
        <DropdownItem key="copy" >
          <div className="flex items-center gap-1">
            <CiBookmark />
            <p>Save</p>
          </div>
        </DropdownItem>
        <DropdownItem key="edit" onClick={() => setIsEditing(true)}>
           <div className="flex items-center gap-1">
          <MdEdit />
            <p>Edit</p>
          </div>
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={mutate}>
           <div className="flex items-center gap-1">
           <MdOutlineDeleteOutline />
            <p>Delete</p>
          </div>
        </DropdownItem>
      </DropdownMenu>:
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem key="copy" >
          <div className="flex items-center gap-1">
            <CiBookmark />
            <p>Save</p>
          </div>
        </DropdownItem>

      </DropdownMenu>}
    </Dropdown>

       </div>
      </CardHeader>
      
      {/* <CardBody>
        <p>{body}</p>
        {image && <img src={image} className="mt-2" alt="" />}
           <div className="mt-3.5 flex justify-between">
            <div className="flex gap-2 items-center">
                <div className="w-5 h-5 rounded-full bg-[#1877F2] flex justify-center items-center">
                 <AiOutlineLike  color="white"/>
                </div>
                <p className="text-[14px] font-semibold text-[#62748e]">{likesCount} likes</p>
            </div>
            <div className="flex gap-2.5 items-center">
  
  <div className="text-[#62748e] flex gap-1.5 items-center">
    <BiRepost />
    <p className="text-[14px] font-normal">{sharesCount} Share</p>
  </div>

  <p className="text-[14px] font-normal text-[#62748e]">{commentsCount} Comments</p>

  <Link to={`/postdetails/${id}`} className="ml-auto text-[12px] font-bold text-[#1877f2] 
                cursor-pointer px-3 py-1.5 
                rounded-md hover:bg-[#E7F3FF] transition">
    View Details
  </Link>

</div>


        </div>
      </CardBody> */}




     <CardBody>
  
  {(body?.trim() || !isShare) && <p>{body}</p>}

  
  {image && <img src={image} className="mt-2 rounded-lg" alt="" />}

 
  {isShare && sharedPost && (
    <div className="border border-gray-300 rounded-xl p-3 mt-3 bg-gray-50">
      <div className="flex gap-2 items-center mb-2">
        <img
          src={sharedPost.user.photo}
          alt={sharedPost.user.name}
          className="w-8 h-8 rounded-full"
        />
        <p className="font-semibold">{sharedPost.user.name}</p>
      </div>
      <p className="text-gray-700">{sharedPost.body}</p>
      {sharedPost.image && (
        <img
          src={sharedPost.image}
          alt=""
          className="mt-2 rounded-lg w-full"
        />
      )}
    </div>
  )}

  {/* Likes, Shares, Comments */}
  <div className="mt-3.5 flex justify-between">
    <div className="flex gap-2 items-center">
      <div className="w-5 h-5 rounded-full bg-[#1877F2] flex justify-center items-center">
        <AiOutlineLike color="white" />
      </div>
      
      <p 
onClick={()=>{
  if(likesCount > 0){
    setOpenLikes(true)
  }
}}
className={`text-[14px] font-semibold ${
  likesCount > 0 ? "text-[#62748e] cursor-pointer hover:underline" : "text-gray-400 cursor-default"
}`}
>
{likesCount} likes
</p>



{openLikes && (
<div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

<div className="bg-white w-[40%] max-h-125 overflow-y-auto rounded-xl p-4">

<div className="flex justify-between items-center mb-4">
<h2 className="font-bold text-lg">People who reacted</h2>
<button onClick={()=>setOpenLikes(false)}>✕</button>
</div>

{likesUsers?.data?.data?.likes?.map((user)=>(
<div key={user._id} className="flex items-center gap-3 py-2">

<img
src={user.photo}
className="w-10 h-10 rounded-full"
/>

<div>
<p className="font-semibold">{user.name}</p>
<p className="text-gray-500 text-sm">@{user.username}</p>
</div>

</div>
))}

</div>

</div>
)}
    </div>

    <div className="flex gap-2.5 items-center">
      <div className="text-[#62748e] flex gap-1.5 items-center">
        <BiRepost />
        <p className="text-[14px] font-normal">{sharesCount} Share</p>
      </div>

      <p className="text-[14px] font-normal text-[#62748e]">{commentsCount} Comments</p>

      <Link
        to={`/postdetails/${id}`}
        className="ml-auto text-[12px] font-bold text-[#1877f2] cursor-pointer px-3 py-1.5 rounded-md hover:bg-[#E7F3FF] transition"
      >
        View Details
      </Link>
    </div>
  </div>
</CardBody>


      <Divider />


      <CardFooter>
        <div className="flex justify-around w-full py-1"  onClick={()=>{
                  likeUnlike()
               
                }}>
            {/* <button
                onClick={likeUnlike}
               className="flex gap-2 items-center text-[#45556c] hover:bg-blue-300 w-fit">
                 <AiOutlineLike size={18} />
                 <p className="text-[14px] font-semibold">Like</p>

            </button> */}

              <button
               
               className={isLiked || likedPost ?"flex gap-2 items-center text-[#1877f2] cursor-pointer px-7 py-2 rounded-[10px]  bg-[#E7F3FF] " : "flex gap-2 items-center text-[#45556c] cursor-pointer px-7 py-2 rounded-[10px] hover:bg-[#F1F5F9] "}
>
                 <AiOutlineLike size={18} />
                 <p className="text-[14px] font-semibold">Like</p>

            </button>
            <button  onClick={() => setShowComments(!showComments)}
  className="flex gap-2 items-center text-[#45556c] cursor-pointer px-7 py-2 rounded-[10px] hover:bg-[#F1F5F9] "
>
  <FaRegComment />
  <p className="text-[14px] font-semibold">Comment</p>
            </button>
            <button  onClick={() => setOpenShare(true)}
            className="flex gap-2 items-center text-[#45556c] hover:bg-[#F1F5F9] cursor-pointer px-7 py-2 rounded-[10px]">
               <GoShareAndroid />
                 <p className="text-[14px] font-semibold">Share</p>

            </button>

            {openShare && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    
    <div className="bg-white w-125 rounded-2xl shadow-lg p-4">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="font-bold text-lg">Share post</h2>
        <button onClick={() => setOpenShare(false)}>✕</button>
      </div>

      {/* Content */}
      <textarea
        ref={shareCaption}
        placeholder="Say something about this..."
        className="w-full border rounded-xl p-3 mt-4 outline-none"
      />

      {/* Post Preview */}
      <div className="bg-gray-100 rounded-xl p-3 mt-4">
        <p className="font-bold">username</p>
        <p className="text-gray-500 text-sm">@username</p>
        <p className="mt-2">updated cover photo.</p>

        <img
          src={postInfo.image}
          className="rounded-xl mt-3 h-85 w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setOpenShare(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
        onClick={sharePost}
         className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          Share now
        </button>
      </div>

    </div>
  </div>
)}
        </div>
      </CardFooter>


      <CardFooter>

 {!showComments && topComment && (
  <div className="bg-[#f1f5f9] border border-gray-200 rounded-2xl p-4 w-full">

    <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
      Top Comment
    </p>

    <div className="flex gap-3 items-start">

      <img
        src={CommentCreatorPhoto}
        alt="user"
        className="w-10 h-10 rounded-full"
      />

      <div className="bg-white rounded-2xl px-4 py-1 flex-1 shadow-sm">
        <p className="font-semibold text-sm text-gray-800">
          {CommentCreatorName}
        </p>
        <p className="text-sm mt-1">
          {content}
        </p>
      </div>

    </div>

    <p
      onClick={() => setShowComments(true)}
      className="text-sm text-[#1877f2] font-medium mt-2 cursor-pointer hover:underline"
    >
      View all comments
    </p>

  </div>
)}

{showComments && <Comment id={id}/>}

</CardFooter>
    </Card>
  );
}
