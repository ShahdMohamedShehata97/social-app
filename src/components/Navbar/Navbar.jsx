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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { FiMessageCircle } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { authContext } from "../../context/AuthContext";
import { useContext ,useState} from "react";



export default function MyNavbar() {




const location =useLocation()


const {clearUserToken,userData}=useContext(authContext)
const navigate=useNavigate()


function handleLogout(){
  localStorage.removeItem('tkn')
  clearUserToken()
  navigate('/auth')


}

function handleProfile() {
  // setActive('profile'); // عشان Navbar يظهر الـ Profile نشط
  navigate('/profile');
}

function handlSettings(){
  navigate('/changepassword')
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
          <Link
to="/home"
className={`gap-1 flex items-center ${
location.pathname === "/home"
? "text-[#1f6fe5]"
: "text-gray-500 hover:text-black duration-200"
}`}
>
          <AiOutlineHome size={20} />
            <p className='text-[14px] font-extrabold hidden md:block ' >Feed</p>
          </Link>



        </NavbarItem>
        <NavbarItem>
<Link
to="/profile"
className={`gap-1 flex items-center ${
location.pathname === "/profile"
? "text-[#1f6fe5]"
: "text-gray-500 hover:text-black duration-200"
}`}
>
           <FiUser size={18} />
            <p className='text-[14px] font-extrabold hidden md:block'>Profile</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
to="/notification"
className={`gap-1 flex items-center ${
location.pathname === "/notification"
? "text-[#1f6fe5]"
: "text-gray-500 hover:text-black duration-200"
}`}
>
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

        <DropdownItem key="settings" className="" onClick={handlSettings}>
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
