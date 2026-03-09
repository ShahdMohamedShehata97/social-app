import React, { useContext, useEffect, useState } from "react";
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
import { authContext } from "../../context/AuthContext";


export default function Home() {
  

  const [active, setActive] = useState("feed");

    const [getSpesificPosts, setgetSpesificPosts] = useState('all')

    const {userId}=useContext(authContext)








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

   
    function getSavedPosts() {
    return axios.get("https://route-posts.routemisr.com/users/bookmarks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });
  }

  const { data:savedPosts } = useQuery({
    queryKey: ["Savedposts"],
    queryFn: getSavedPosts,
  });



  function getMyPosts() {
      return axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });
    }
  
    const { data:myPosts} = useQuery({
      queryKey: ["getMyposts"],
      queryFn: getMyPosts,
    });


     function getCommunityPosts() {
      return axios.get(`https://route-posts.routemisr.com/posts/feed?only=following&limit=10`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tkn")}`,
        },
      });
    }
  
    const { data:myCommunityPosts} = useQuery({
      queryKey: ["getMyCommunityposts"],
      queryFn: getCommunityPosts,
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

  const MyprofilePosts = myPosts?.data?.data?.posts;

  const allSuggestions=suggestions?.data?.data?.suggestions ||[]

  const allSavedPosts=savedPosts?.data?.data?.bookmarks ||[];
  const allCommunityPosts=myCommunityPosts?.data?.data?.posts ||[];



  return (
    <>
     


{/* <div className="min-h-screen p-6">
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
</div> */}






                        <div className="min-h-screen p-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
    

    <div className="order-1 md:order-1 md:col-span-3 flex flex-col px-4 self-start md:sticky md:top-20 bg-white rounded-2xl shadow h-fit pb-4">

  <button
    onClick={() => {
      setActive("feed")
      setgetSpesificPosts('all')
    }

    }
    className={`flex py-2 items-center gap-3 mt-4 rounded-2xl px-4 border-none
    ${active === "feed" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuNewspaper size={18} />
    <p className="font-bold text-[14px]">Feed</p>
  </button>

  <button
    onClick={() => {setActive("myposts")
      setgetSpesificPosts('myPosts')
    }}
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4 boder-none
    ${active === "myposts" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuSparkles size={18} />
    <p className="font-bold text-[14px]">My Posts</p>
  </button>

  <button
    onClick={() => {
      setActive("community")
      setgetSpesificPosts('community')
    }}
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4 border-none
    ${active === "community" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <LuEarth size={18} />
    <p className="font-bold text-[14px]">Community</p>
  </button>

  <button
    onClick={() => {
      setActive("saved")
      setgetSpesificPosts('saved')
    }
     
    }
    className={`flex py-2 items-center gap-3 mt-2 rounded-2xl px-4 border-none
    ${active === "saved" ? "bg-blue-100 text-blue-600" : "hover:bg-[#F1F5F9]"}`}
  >
    <FaRegBookmark size={18} />
    <p className="font-bold text-[14px]">Saved</p>
  </button>

</div>

    <div className="order-3 md:order-2 md:col-span-6 rounded-2xl min-h-screen flex flex-col gap-5">

      <PostCreation queryKey={["getposts"]} />
      {getSpesificPosts === 'all' &&  allPosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["getposts"]} />
      ))}
      {getSpesificPosts === 'saved' &&  allSavedPosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["Savedposts"]} />
      ))}
      {getSpesificPosts === 'myPosts' &&  MyprofilePosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["myPosts"]} />
      ))}
      {getSpesificPosts === 'community' &&  allCommunityPosts?.map((post) => (
        <PostCard key={post.id} postInfo={post} queryKey={["getMyCommunityposts"]} />
      ))}




    </div>

    
    <div className="order-2 md:order-3 md:col-span-3 self-start md:sticky md:top-20 bg-white rounded-2xl shadow h-fit px-2 pb-3">
      {allSuggestions.map((sugg) => (
        <FollowSuggestions key={sugg.id} suggestionFollower={sugg} sugKey={["suggestions"]} />
      ))}
    </div>

  </div>
</div>








    </>
  );
}
