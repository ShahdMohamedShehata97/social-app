import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import axios from "axios";
import PostCard from "../PostCard/PostCard";
import Loader from "../loader/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from "../PostCreation/PostCreation";
import FollowSuggestions from "../FollowSuggwstions/FollowSuggestions";
import { LuNewspaper } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { LuEarth } from "react-icons/lu";
// import { CiBookmark } from "react-icons/ci";
import { FaRegBookmark } from "react-icons/fa"

export default function Home() {
  //   const [allPosts, setallPosts] = useState(null)
  //   const [isLoading, setisLoading] = useState(false)
  //   const [isError, setisError] = useState(null)

  // function getAllposts(){

  //   setisLoading(true)

  // axios.get('https://route-posts.routemisr.com/posts',{
  //   headers:{
  //     "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
  //   }
  // })
  //   .then(function(resp){
  //     // console.log('resp',resp)
  //     // console.log('resp',resp.data)
  //     console.log('posts',resp.data.data.posts)
  //     setallPosts(resp.data.data.posts)
  //   })
  //   .catch(function(error){
  //     console.log('error',error)
  //     setisError(error.response.data.message)
  //   })
  //   .finally(()=>{
  //     setisLoading(false)
  //   })
  // }

  // useEffect(function(){
  //   getAllposts()
  // },[])

  const [active, setActive] = useState("feed");

 function getSuggestionUsers() {
    return axios.get("https://route-posts.routemisr.com/users/suggestions?limit=10", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
  }

  const { data:suggestions } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestionUsers,
  });





  function getAllPosts() {
    return axios.get("https://route-posts.routemisr.com/posts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getposts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <h1>{error}</h1>
      </div>
    );
  }



  const allPosts = data.data.data.posts;
  // console.log("posts", allPosts);
  const allSuggestions=suggestions?.data?.data?.suggestions ||[]

  // console.log('sugg',allSuggestions)



  return (
    <>
      {/* <div className="min-h-screen p-6">
       
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">
          
          <div className="md:col-span-3 order-1 bg-white rounded-2xl shadow h-125"></div>
          <div className=" md:col-span-6 md:order-2 order-3 rounded-2xl min-h-screen flex flex-col gap-5 ">
           
            <PostCreation queryKey={["getposts"]} />{" "}
            {allPosts?.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  postInfo={post}
                  queryKey={["getposts"]}
                />
              );
            })}
          </div>
          <div className="md:col-span-3 md:order-3 order-2 bg-white rounded-2xl shadow h-125"></div>{" "}
        </div>
      </div> */}



      {/* <div className="min-h-screen p-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
    
  
    <div className="order-1 md:order-1 md:col-span-3 bg-white rounded-2xl shadow h-31.25 md:h-auto"></div>
    
 
    <div className="order-3 md:order-2 md:col-span-6 rounded-2xl min-h-screen flex flex-col gap-5">
      <PostCreation queryKey={["getposts"]} />
      {allPosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["getposts"]} />
      ))}
    </div>
    
  
    <div className="order-2 md:order-3 md:col-span-3 bg-white rounded-2xl shadow h-fit px-2 pb-3 sticky top-0 mt-1">
      {allSuggestions.map((sugg)=>{
        return <FollowSuggestions suggestionFollower={sugg}/>
      })}
    </div>
    
  </div>
</div> */}


<div className="min-h-screen p-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
    

    <div className="order-1 md:order-1 md:col-span-3 flex flex-col px-4 self-start sticky top-20 bg-white rounded-2xl shadow h-fit pb-4">

  <button
    onClick={() => setActive("feed")

    }
    className={`flex py-2 items-center gap-3 mt-4 rounded-2xl px-4 
    ${active === "feed" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuNewspaper size={18} />
    <p className="font-bold text-[14px]">Feed</p>
  </button>

  <button
    onClick={() => setActive("myposts")}
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4
    ${active === "myposts" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuSparkles size={18} />
    <p className="font-bold text-[14px]">My Posts</p>
  </button>

  <button
    onClick={() => setActive("community")}
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4
    ${active === "community" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuEarth size={18} />
    <p className="font-bold text-[14px]">Community</p>
  </button>

  <button
    onClick={() => setActive("saved")
      
    }
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4
    ${active === "saved" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <FaRegBookmark size={18} />
    <p className="font-bold text-[14px]">Saved</p>
  </button>

</div>

    <div className="order-3 md:order-2 md:col-span-6 rounded-2xl min-h-screen flex flex-col gap-5">
      <PostCreation queryKey={["getposts"]} />
      {allPosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["getposts"]} />
      ))}
    </div>

    
    <div className="order-2 md:order-3 md:col-span-3 self-start sticky top-20 bg-white rounded-2xl shadow h-fit px-2 pb-3">
      {allSuggestions.map((sugg) => (
        <FollowSuggestions key={sugg.id} suggestionFollower={sugg} sugKey={["suggestions"]} />
      ))}
    </div>

  </div>
</div>




    </>
  );
}
