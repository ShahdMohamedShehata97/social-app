import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@heroui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import { authContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import EditPost from "../EditPost/EditPost";


export default function PostCard({postInfo,queryKey}) {
  
    const {body,image,user,topComment,sharesCount,likesCount,commentsCount,id}=postInfo

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

  const {userId}=useContext(authContext)



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




 

  console.log(error)


  if (isEditing) {
  return (
    <EditPost
      postInfo={postInfo}
      setIsEditing={setIsEditing}
      queryKey={queryKey}
    />
  );
}



  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between ">
       <div className="flex gap-3">
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
       </div>

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
      
      <CardBody>
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
      </CardBody>


      <Divider />


      <CardFooter>
        <div className="flex justify-around w-full py-1">
            <button className="flex gap-2 items-center text-[#45556c]">
                 <AiOutlineLike size={18} />
                 <p className="text-[14px] font-semibold">Like</p>

            </button>
            <button  onClick={() => setShowComments(!showComments)}
  className="flex gap-2 items-center text-[#45556c] cursor-pointer px-7 py-2 rounded-[10px] hover:bg-[#F1F5F9] "
>
  <FaRegComment />
  <p className="text-[14px] font-semibold">Comment</p>
            </button>
            <button className="flex gap-2 items-center text-[#45556c]">
               <GoShareAndroid />
                 <p className="text-[14px] font-semibold">Share</p>

            </button>
        </div>
      </CardFooter>

      {/* <CardFooter>
   {topComment &&  <div className="bg-[#f1f5f9] border border-gray-200 rounded-2xl p-4 w-full">

  
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

     
      <p className="text-sm text-[#1877f2] font-medium mt-2 cursor-pointer hover:underline">
        View all comments
      </p>

    </div>}
      </CardFooter>


        <CardFooter>
       <Comment id={id}/>
      </CardFooter> */}

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
