// import React from 'react'

// import { AiOutlineHome } from "react-icons/ai";

// export default function Navbar() {
//   return (
//   <>
//     <div className='flex justify-center'>
       
//        <div className='w-[82%] bg-amber-600 h[100px] p-3 '>
//         <div className="left flex gap-2 items-center">
//           <div className='w-10 h-10 bg-amber-50 rounded-[10px]  '>
//            <img src={route} alt="" className='w-full rounded-[10px]' />
          
//           </div>
//            <p className='text-[20px] font-extrabold '>Route Posts</p>
//         </div>

//         <div className="center">
//           <div className='bg-pink-300'>
//             <div className='flex gap-2'>
//               <AiOutlineHome />
//               <p className='font-extrabold text-[14px] text-gray-500'>Feed</p>
//             </div>
//           </div>
//         </div>
//        </div>

//     </div>
//   </>
//   )
// }


import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
 
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { AiOutlineHome } from "react-icons/ai";
import route from '../../assets/images/route.webp'
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { authContext } from "../../context/AuthContext";
import { useContext } from "react";

// export const AcmeLogo = () => {
//   return (
//     <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
//       <path
//         clipRule="evenodd"
//         d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
//         fill="currentColor"
//         fillRule="evenodd"
//       />
//     </svg>
//   );
// };

export default function MyNavbar() {


// const userInfo = JSON.parse(localStorage.getItem('user'))

//   // console.log('userInfo',userInfo)

const {clearUserToken,userData}=useContext(authContext)
const navigate=useNavigate()

function handleLogout(){
  localStorage.removeItem('tkn')
  clearUserToken()
  navigate('/auth')


}

  function handleProfile(){
 
  navigate('/profile')
}

  return (
    <Navbar className='bg-white w-full'>
      <NavbarBrand>
     <div className="left flex gap-2 items-center">
           <div className='w-10 h-10 bg-amber-50 rounded-[10px]  '>
            <img src={route} alt="" className='w-full rounded-[10px]' />
          
           </div>
            <p className='text-[20px] font-extrabold hidden md:block '>Route Posts</p>
         </div>
      </NavbarBrand>

      <NavbarContent className="flex gap-5 bg-[#f4f2f4] h-fit py-2.5 px-3 rounded-2xl" justify="center">
        <NavbarItem>
          <Link color="foreground" to="/home" className=' gap-1 flex items-center text-gray-500  hover:text-black duration-200 focus:text-[#1f6fe5]'>
          <AiOutlineHome size={20} />
            <p className='text-[14px] font-extrabold hidden md:block ' >Feed</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" to='/profile' className=' gap-1 flex items-center  text-gray-500 hover:text-black duration-200 focus:text-[#1f6fe5]'>
           <FiUser size={18} />
            <p className='text-[14px] font-extrabold hidden md:block'>Profile</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className=' gap-1 flex items-center  text-gray-500 hover:text-black duration-200 focus:text-[#1f6fe5]'>
        <FiMessageCircle size={18} />
          <p className='text-[14px] font-extrabold hidden md:block'>  Notification</p>
          </Link>
        </NavbarItem>

      
      </NavbarContent>

      <NavbarContent as="div" justify="end">
  <div className='bg-[#f4f2f4] w-fit flex gap-3 items-center py-2 px-3 rounded-2xl'>
    
    <Dropdown placement="bottom-end">
      
      <DropdownTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar
            as="button"
            className="transition-transform"
            color="secondary"
            name="Shahd Mohamed"
            size="sm"
            src={userData?.photo}
          />
          <p className='text-[14px] font-semibold text-[#1d293d] hidden md:block'>
            {userData?.name}
          </p>
          <IoIosMenu size={27} />
          
        </div>
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" onClick={handleProfile}>
          <div className='flex gap-2'>
            <FiUser size={18}  />
            <p className='text-[14px] font-semibold '>Profile</p>
          </div>
        </DropdownItem>

        <DropdownItem key="settings" className="">
          <div className='flex gap-2'>
            <IoSettingsOutline size={18} />
            <p className='text-[14px] font-semibold'>Settings</p>
          </div>
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>

    </Dropdown>

  </div>
</NavbarContent>
    </Navbar>
  );
}
