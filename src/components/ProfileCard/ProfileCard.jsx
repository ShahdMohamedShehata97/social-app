import React, { useRef,useState } from "react";
import { FaCamera } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useQuery, useQueryClient,useMutation } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../loader/Loader";
import Profile from "./../Profile/Profile";
import PostCard from "../PostCard/PostCard";
import { CiCamera } from "react-icons/ci";
import { CgMaximizeAlt } from "react-icons/cg";


export default function ProfileCard({ user }) {
  const {
    photo,
    name,
    followersCount,
    followingCount,
    email,
    bookmarksCount,
    _id,
  } = user;

  ////// CHANGE Profile photo
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

function handleImageChange(e) {
  const image = e.target.files[0];

  if (image) {
    const imageUrl = URL.createObjectURL(image); // ✅
    setPreviewImage(imageUrl);
    setShowModal(true);
  }
}

  const changedImage = useRef();
  console.log("changedImage.current", changedImage);

 function handleProfileChange() {

  const postObj = new FormData();

  if (changedImage.current.files[0]) {
    postObj.append("photo", changedImage.current.files[0]);
  }

  return axios.put(
    "https://route-posts.routemisr.com/users/upload-photo",
    postObj,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    }
  );
}
  const queryClient=useQueryClient()

  const {mutate,isPending}=useMutation({
    mutationFn:handleProfileChange,
    onSuccess:()=>{
       queryClient.invalidateQueries({ queryKey: ['getProfile']})
      setShowModal(false)

    }
  })






  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/users/${_id}/posts`, {
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

  // console.log('profileData',data.data.data.posts)

  const profilePosts = data.data.data.posts;

  return (
//     <div className="bg-[#f8f9fb] min-h-screen font-sans">
//       <div className="h-75 bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#7fa1c3] relative w-full md:w-[85%]  mx-auto">
//         <button className="absolute right-10 top-8 bg-[#00000050] hover:bg-[#00000080] text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold backdrop-blur-sm transition-all">
//           <FaCamera className="text-sm" />
//           Add cover
//         </button>
//       </div>

//       <div className="w-full  md:w-[83%] mx-auto px-6">
//         <div className="bg-white rounded-[40px] shadow-sm -mt-32 relative z-10 p-10">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
//             <div className="flex gap-6 items-center">
//               <div className="relative group">
//                 <img
//                   src={photo}
//                   alt="Profile"
//                   className="w-32 h-32 rounded-full border-[6px] border-white shadow-sm object-cover"
//                 />

//                 <div className="absolute bottom-0.5 left-7 hidden group-hover:block">
//                   <div className="flex gap-7  ">
//                     <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
//                       <CgMaximizeAlt color="#166FE5" size={18} />
//                     </div>

//                     <label htmlFor="profile">
//                       <div className="w-9 h-9 bg-[#166FE5] rounded-full flex items-center justify-center">
//                         <CiCamera color="white" size={18} />
//                       </div>
//                     </label>
//                     <input
//                       type="file"
//                       id="profile"
//                       ref={changedImage}
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />



//                     {showModal && (
//   <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

//     <div className="bg-white rounded-2xl p-6 w-125">

//       <h2 className="text-xl font-bold mb-4">
//         Adjust profile photo
//       </h2>

//       <div className="flex justify-center mb-6">
//         <img
//           src={previewImage}
//           className="w-72 h-72 rounded-full object-cover"
//         />
//       </div>

//       <div className="flex justify-end gap-3">
//        <button
//   onClick={()=>{
//     setShowModal(false)
//     changedImage.current.value = ""
//   }}
//   className="px-4 py-2 border rounded-lg"
// >
//   Cancel
// </button>

//         <button
//         disabled={isPending}
//         onClick={mutate}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Save photo
//         </button>
//       </div>

//     </div>

//   </div>
// )}




//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="text-2xl md:text-[32px] font-extrabold text-[#1a202c] leading-tight">
//                   {name}
//                 </h1>
//                 <p></p>
//                 <p className="text-gray-400 text-xl mt-1">{user.username}</p>
//                 <div className="flex items-center gap-2 bg-[#eef2ff] text-[#4f46e5] text-[13px] font-medium px-4 py-1.5 rounded-full mt-3 w-fit border border-[#e0e7ff]">
//                   <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-pulse"></span>
//                   Route Posts member
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 w-full lg:w-auto">
//               {[
//                 { label: "FOLLOWERS", value: followersCount },
//                 { label: "FOLLOWING", value: followingCount },
//                 { label: "BOOKMARKS", value: bookmarksCount },
//               ].map((item) => (
//                 <div
//                   key={item.label}
//                   className="flex-1 lg:w-35 bg-white border border-gray-100 rounded-3xl p-5 text-center shadow-sm"
//                 >
//                   <p className="text-[#94a3b8] text-[11px] font-bold tracking-wider mb-1">
//                     {item.label}
//                   </p>

//                   <p className="text-3xl font-black text-[#1e293b]">
//                     {item.value ?? 0}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
//             <div className="lg:col-span-2 border border-gray-100 rounded-4xl p-8 bg-[#fcfdfe]">
//               <h3 className="font-bold text-[#334155] text-lg mb-6">About</h3>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 text-[#64748b]">
//                   <HiOutlineMail className="text-xl" />
//                   <span className="text-[15px]">{email}</span>
//                 </div>
//                 <div className="flex items-center gap-3 text-[#64748b]">
//                   <FiUser className="text-xl" />
//                   <span className="text-[15px]">Active on Route Posts</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col gap-6">
//               <div className="border border-gray-100 rounded-[28px] p-7 bg-[#fcfdfe] relative overflow-hidden group">
//                 <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">
//                   MY POSTS
//                 </p>
//                 <p className="text-4xl font-black text-[#1e293b]">
//                   {profilePosts.length}
//                 </p>
//               </div>

//               <div className="border border-gray-100 rounded-[28px] p-7 bg-[#fcfdfe]">
//                 <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">
//                   SAVED POSTS
//                 </p>
//                 <p className="text-4xl font-black text-[#1e293b]">
//                   {bookmarksCount}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full md:w-[83%] mx-auto px-6 flex flex-col gap-5 mt-16">
//         {profilePosts?.map((post) => {
//           return (
//             <PostCard key={post.id} postInfo={post} queryKey={["getposts"]} />
//           );
//         })}
//       </div>
//     </div>


<div className="bg-[#f8f9fb] min-h-screen font-sans">

  {/* Cover */}
  <div className="h-40 md:h-72 bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#7fa1c3] relative w-full md:w-[85%] mx-auto">
    <button className="absolute right-4 md:right-10 top-4 md:top-8 bg-[#00000050] hover:bg-[#00000080] text-white px-3 md:px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold backdrop-blur-sm transition-all">
      <FaCamera className="text-sm" />
      Add cover
    </button>
  </div>

  <div className="w-full md:w-[83%] mx-auto px-4 md:px-6">

    {/* Profile Card */}
    <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-sm -mt-20 md:-mt-32 relative z-10 p-5 md:p-10">

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

        {/* Profile Info */}
        <div className="flex gap-4 md:gap-6 items-center">

          <div className="relative group">

            <img
              src={photo}
              alt="Profile"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[6px] border-white shadow-sm object-cover"
            />

            <div className="absolute bottom-0 left-2 md:left-7 hidden group-hover:block">
              <div className="flex gap-3 md:gap-7">

                <div className="w-8 h-8 md:w-9 md:h-9 bg-white rounded-full flex items-center justify-center">
                  <CgMaximizeAlt color="#166FE5" size={16} />
                </div>

                <label htmlFor="profile">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-[#166FE5] rounded-full flex items-center justify-center">
                    <CiCamera color="white" size={16} />
                  </div>
                </label>


                {showModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">

    <div className="bg-white rounded-2xl p-5 md:p-6 w-full max-w-md">

      <h2 className="text-lg md:text-xl font-bold mb-4">
        Adjust profile photo
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={previewImage}
          className="w-48 h-48 md:w-72 md:h-72 rounded-full object-cover"
        />
      </div>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => {
            setShowModal(false)
            changedImage.current.value = ""
          }}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          onClick={mutate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Save photo
        </button>

      </div>

    </div>

  </div>
)}

                <input
                  type="file"
                  id="profile"
                  ref={changedImage}
                  className="hidden"
                  onChange={handleImageChange}
                />

              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <h1 className="text-xl md:text-[32px] font-extrabold text-[#1a202c] leading-tight">
              {name}
            </h1>

            <p className="text-gray-400 text-sm md:text-xl mt-1">
              {user.username}
            </p>

            <div className="flex items-center gap-2 bg-[#eef2ff] text-[#4f46e5] text-[12px] md:text-[13px] font-medium px-3 md:px-4 py-1.5 rounded-full mt-3 w-fit border border-[#e0e7ff]">
              <span className="w-2 h-2 bg-[#4f46e5] rounded-full animate-pulse"></span>
              Route Posts member
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 w-full lg:flex lg:w-auto">

          {[
            { label: "FOLLOWERS", value: followersCount },
            { label: "FOLLOWING", value: followingCount },
            { label: "BOOKMARKS", value: bookmarksCount },
          ].map((item) => (

            <div
              key={item.label}
              className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-3 md:p-5 text-center shadow-sm"
            >
              <p className="text-[#94a3b8] text-[10px] md:text-[11px] font-bold tracking-wider mb-1">
                {item.label}
              </p>

              <p className="text-xl md:text-3xl font-black text-[#1e293b]">
                {item.value ?? 0}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 md:mt-12">

        <div className="lg:col-span-2 border border-gray-100 rounded-3xl p-5 md:p-8 bg-[#fcfdfe]">
          <h3 className="font-bold text-[#334155] text-lg mb-6">About</h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3 text-[#64748b]">
              <HiOutlineMail className="text-lg md:text-xl" />
              <span className="text-[14px] md:text-[15px]">{email}</span>
            </div>

            <div className="flex items-center gap-3 text-[#64748b]">
              <FiUser className="text-lg md:text-xl" />
              <span className="text-[14px] md:text-[15px]">
                Active on Route Posts
              </span>
            </div>

          </div>
        </div>

        {/* Posts Stats */}
        <div className="flex flex-col gap-4 md:gap-6">

          <div className="border border-gray-100 rounded-[24px] md:rounded-[28px] p-5 md:p-7 bg-[#fcfdfe]">
            <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">
              MY POSTS
            </p>

            <p className="text-2xl md:text-4xl font-black text-[#1e293b]">
              {profilePosts.length}
            </p>
          </div>

          <div className="border border-gray-100 rounded-[24px] md:rounded-[28px] p-5 md:p-7 bg-[#fcfdfe]">
            <p className="text-[#3b82f6] font-bold text-xs tracking-widest mb-2">
              SAVED POSTS
            </p>

            <p className="text-2xl md:text-4xl font-black text-[#1e293b]">
              {bookmarksCount}
            </p>
          </div>

        </div>

      </div>

    </div>
  </div>

  {/* Posts */}
  <div className="w-full md:w-[83%] mx-auto px-4 md:px-6 flex flex-col gap-5 mt-10 md:mt-16">

    {profilePosts?.map((post) => (
      <PostCard key={post.id} postInfo={post} queryKey={["getposts"]} />
    ))}

  </div>

</div>
  );
}
