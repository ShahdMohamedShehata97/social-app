import React, { useEffect ,useState} from 'react'
import Login from '../Login/Login'
import axios from 'axios'
import PostCard from '../PostCard/PostCard'
import Loader from '../loader/Loader'
import { useQuery } from '@tanstack/react-query'
import PostCreation from './../PostCreation/PostCreation';


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

function getAllPosts(){
  return   axios.get('https://route-posts.routemisr.com/posts',{
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

const allPosts=data.data.data.posts
console.log('posts',allPosts)
  return (
    <>

        <div className="min-h-screen  p-6">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <div className="md:col-span-3 order-1 bg-white rounded-2xl shadow h-[500px]"></div>

        {/* Center Content */}
        <div className=" md:col-span-6  md:order-2 order-3  rounded-2xl  min-h-screen flex flex-col gap-5  ">
          <PostCreation queryKey={['getposts']}/>
          {allPosts?.map((post)=>{return <PostCard key={post.id} postInfo={post} queryKey={['getposts']}/>})}

        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-3 md:order-3 order-2 bg-white rounded-2xl shadow h-[500px]"></div>

      </div>

    </div>
    </>
  )
}
