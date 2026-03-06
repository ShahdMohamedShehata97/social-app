// import React from 'react'
// import { RiUser3Line } from "react-icons/ri";
// import { CiAt } from "react-icons/ci";
// import { LuUsers } from "react-icons/lu";
// import { CiCalendar } from "react-icons/ci";
// import { IoKeyOutline } from "react-icons/io5";
// export default function Auth() {
//   return (
//    <>
//     <div className="h-screen flex justify-center items-center  ">
  
//   <div className="w-[82%]">
//     <div className="grid grid-cols-2 gap-10  min-h-125">
      
//       <div className="left  ">
//         <div className="">
//           <h2 className="text-6xl text-[#00298d] font-extrabold">
//             Route Posts
//           </h2>

//           <p className="text-2xl font-medium mt-4">
//             Connect with friends and the world around you on Route Posts.
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded-[15px] border-2 border-[#becff9] mt-7">
//             <p className="text-[14px] font-extrabold text-[#00298d]">About Route Academy</p>
//             <p className="text-[18px] font-bold mt-2">Egypt's Leading IT Training Center Since 2012</p>
//             <p className="mt-2 text-[14px] font-normal text-[#314158]">Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.</p>

//              <div className="grid grid-cols-3 mt-2 gap-3" >
//             <div className="bg-[#F2F6FF] p-4 rounded-[10px] border border-[#becff9]">
//                 <p className="text-[16px] font-extrabold text-[#00298d]">2012</p>
//                 <p className="text-[11px] text-[#45556c] font-bold">FOUNDED</p>
//             </div>
//             <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
//                 <p className="text-[16px] font-extrabold text-[#00298d]">40K+</p>
//                 <p className="text-[11px] text-[#45556c] font-bold uppercase">Graduates</p>
//             </div>
//             <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
//                 <p className="text-[16px] font-extrabold text-[#00298d]">50+</p>
//                 <p className="text-[11px] text-[#45556c] font-bold uppercase">Partner Companies</p>
//             </div>
//             <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
//                 <p className="text-[16px] font-extrabold text-[#00298d]">5</p>
//                 <p className="text-[11px] text-[#45556c] font-bold uppercase">Branches</p>
//             </div>
//             <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
//                 <p className="text-[16px] font-extrabold text-[#00298d]">20</p>
//                 <p className="text-[11px] text-[#45556c] font-bold uppercase">Diplomas Available

// </p>
//             </div>
            
//         </div>
//         </div>


       
        

    
//       </div>

//       <div className="right ">
         
        

//         <div className="right">
//   <div className="w-[90%] mx-auto bg-white p-8 rounded-3xl shadow-lg">
//       <div className="bg-[#F1F5F9] py-3 rounded-2xl  flex justify-around">
//           <button className="text-14px font-extrabold cursor-pointer">Login</button>
//           <button className="text-14px font-extrabold cursor-pointer ">Register</button>
//          </div>
//   <div>
//       <p className="text-3xl font-extrabold text-[#0f172a] mt-3">
//       Create a new account
//     </p>
//     <p className="text-sm text-[#64748b] mt-1">
//       It is quick and easy.
//     </p>

//     <form className="mt-6 space-y-4">

     
//       <div className="relative">
//         <RiUser3Line className="absolute left-3 top-1/2 -translate-y-1/2  text-[#90A1B9]" strokeWidth={.8} size={18}/>
//         <input
//           type="text"
//           placeholder="Full name"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

    
//       <div className="relative">
//         <CiAt strokeWidth={.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" size={18}/>
//         <input
//           type="text"

//           placeholder="Username (optional)"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

      
//       <div className="relative">
//         <CiAt className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" strokeWidth={.8} size={18}/>
//         <input
//           type="email"
//           placeholder="Email address"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

  
//       <div className="relative">
//         <LuUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" size={18} strokeWidth={2}/>
//         <select
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         >
//           <option>Select gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//       </div>

  
//       <div className="relative">
//         <CiCalendar strokeWidth={.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" size={18}/>
//         <input
//           type="date"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

   
//       <div className="relative">
//         <IoKeyOutline strokeWidth={.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" size={18}/>
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

  
//       <div className="relative">
//         <IoKeyOutline strokeWidth={.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#90A1B9]" size={18}/>
//         <input
//           type="password"
//           placeholder="Confirm password"
//           className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-10 h-12 focus:outline-none focus:border-[#00298d]"
//         />
//       </div>

//       <button className="w-full h-12 bg-[#00298d] text-white rounded-xl font-bold mt-2 hover:bg-[#001f6b] transition">
//         Create New Account
//       </button>

//     </form>
//   </div>
//   </div>
// </div>


//        {/* <div className="w-[90%] mx-auto bg-white p-6 rounded-2xl shadow-md">
//           <p className="text-2xl font-extrabold">Create a new account</p>
//           <p className="text-[14px] text-[#62748e] font-normal">It is quick and easy.</p>

//          <form action="" className="">
//           <div className="relative mt-4">
//           <RiUser3Line color="#90A1B9" size={18} strokeWidth={.8}  className="absolute left-20 top-3.5"/>
//             <input type="text" placeholder="Full name" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>

//           <div className="relative mt-4">
//           <CiAt color="#90A1B9" size={20}    strokeWidth={.8} className="absolute left-20 top-3.5"/>
//             <input type="text" placeholder="Username (optional)" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>

//           <div className="relative mt-4">
//                 <CiAt color="#90A1B9" size={20}    strokeWidth={.8} className="absolute left-20 top-3.5"/>
//             <input type="text" placeholder="Email" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>

//           <div className="relative mt-4">
//              <LuUsers color="#90A1B9" size={20}    strokeWidth={2} className="absolute left-20 top-3.5"/>
           
//             <select name="" id=""   className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto">
//             <option value="">Select gender</option>
//             <option value="">Male</option>
//             <option value="">Female</option>
//             </select>
//           </div>

//           <div className="relative mt-4">
//              <CiCalendar color="#90A1B9" size={20}    strokeWidth={.8} className="absolute left-20 top-3.5"/>
//             <input type="date" placeholder="Full name" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>

//           <div className="relative mt-4">
          
//           <IoKeyOutline color="#90A1B9" size={20}   className="absolute left-20 top-3.5"/>
//             <input type="text" placeholder="Password" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>
//           <div className="relative mt-4">
          
//           <IoKeyOutline color="#90A1B9" size={20}   className="absolute left-20 top-3.5"/>
//             <input type="text" placeholder="Confirm password" className="bg-[#F8FAFC] border-2 rounded-2xl border-[#E2E8F0] text-[#1d293d] ps-10 h-12  w-3/4 block mx-auto"  />
//           </div>

       


//         </form>
//        </div> */}
//       </div>

//     </div>
//   </div>

// </div>
//     </>
//   )
// }

import { useState } from "react";
import Login from '../Login/Login'
import Register from '../Register/Register'

// import Register from './../Register/Register';

export default function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  return (

    
   <>
    <div className="min-h-screen flex justify-center items-center  ">
  
  <div className="md:w-[82%]">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10  min-h-125 p-5 md:p-0">
      
      <div className="left order-2 md:order-1   ">
        <div className="">
          <h2 className="text-6xl text-[#00298d] font-extrabold">
            Route Posts
          </h2>

          <p className="text-2xl font-medium mt-4">
            Connect with friends and the world around you on Route Posts.
          </p>
        </div>

        <div className="bg-white p-5 rounded-[15px] border-2 border-[#becff9] mt-7">
            <p className="text-[14px] font-extrabold text-[#00298d]">About Route Academy</p>
            <p className="text-[18px] font-bold mt-2">Egypt's Leading IT Training Center Since 2012</p>
            <p className="mt-2 text-[14px] font-normal text-[#314158]">Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.</p>

             <div className="grid grid-cols-3 mt-2 gap-3" >
            <div className="bg-[#F2F6FF] p-4 rounded-[10px] border border-[#becff9]">
                <p className="text-[16px] font-extrabold text-[#00298d]">2012</p>
                <p className="text-[11px] text-[#45556c] font-bold">FOUNDED</p>
            </div>
            <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
                <p className="text-[16px] font-extrabold text-[#00298d]">40K+</p>
                <p className="text-[11px] text-[#45556c] font-bold uppercase">Graduates</p>
            </div>
            <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
                <p className="text-[16px] font-extrabold text-[#00298d]">50+</p>
                <p className="text-[11px] text-[#45556c] font-bold uppercase">Partner Companies</p>
            </div>
            <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
                <p className="text-[16px] font-extrabold text-[#00298d]">5</p>
                <p className="text-[11px] text-[#45556c] font-bold uppercase">Branches</p>
            </div>
            <div className="bg-[#F2F6FF] p-4 rounded-lg border border-[#becff9]">
                <p className="text-[16px] font-extrabold text-[#00298d]">20</p>
                <p className="text-[11px] text-[#45556c] font-bold uppercase">Diplomas Available

</p>
            </div>
            
        </div>
        </div>


       
        

    
      </div>

       <div className="right md:order-2 order-1">
      <div className="w-[90%] mx-auto bg-white p-8 rounded-3xl shadow-lg">

       
        <div className="bg-[#F1F5F9] p-1 rounded-2xl flex">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 rounded-xl font-bold transition cursor-pointer ${
              isLogin ? "bg-white text-[#00298d] shadow" : "text-gray-500"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 rounded-xl font-bold transition cursor-pointer ${
              !isLogin ? "bg-white text-[#00298d] shadow" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

       
        <div className="mt-6">
          {isLogin ? <Login /> : <Register />}
        </div>

      </div>
    </div>

    </div>
  </div>

</div>
    </>
  );
}