import React, { useContext, useState } from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";

const changePasswordSchema = zod
  .object({
    currentPassword: zod
      .string()
      .min(1, "Current password is required"),

    newPassword: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
        "Minimum 8 characters with uppercase, lowercase, number and special character"
      ),

    confirmNewPassword: zod
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export default function ChangePassword() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const {clearUserToken,setAuthenticatedUser}=useContext(authContext)

  const {
    register,
    handleSubmit,
    formState
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });







function myHandleSubmit(values){
     const data = {
      password: values.currentPassword,
      newPassword: values.newPassword,
    };
     axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      ).then(function(resp){
        // clearUserToken()
        // navigate('auth')
  
        localStorage.setItem('tkn',resp.data.data.token)

        setAuthenticatedUser(resp.data.data.token)
        
      }).catch((err)=>{
        console.log(err)
      })
    
}

   
  return (
<>
     <div className=" flex items-center justify-center min-h-screen">
         <div className="bg-white w-[90%] md:w-[40%] py-10 px-10 rounded-2xl shadow">
        <div>
          <p className="text-3xl font-extrabold text-[#0f172a] mt-3">
            Change Password
          </p>
          <p className="text-sm text-[#64748b] mt-1">Keep your account secure by using a strong password.

</p>
        </div>

        <form onSubmit={handleSubmit(myHandleSubmit)} className="mt-6 space-y-4">
         

        

        

  

          <div className="relative">
             
                <label className="text-sm text-[#314158] font-bold mb-2" htmlFor="curr">Current Password</label>
            <input
            id="curr"
              type="password"
              {...register('currentPassword')}
              placeholder="Enter current Password"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-3 h-12 focus:outline-none focus:border-[#00298d]"
            />
            {formState.errors.currentPassword && formState.touchedFields.currentPassword &&<p className="text-[12px] font-semibold text-[#eb0040]">{formState.errors.currentPassword?.message}</p>}
          </div>

          <div className="relative">

            <label className="text-sm text-[#314158] font-bold mb-2" htmlFor="new">New Password</label>
      
            <input
            id="new"
              type="password"
              {...register('newPassword')}
              placeholder="Enter new Password"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-3 h-12 focus:outline-none focus:border-[#00298d]"
            />
            {formState.errors.newPassword && formState.touchedFields.newPassword &&<p className="text-[12px] font-semibold text-[#eb0040]">{formState.errors.newPassword?.message}</p>}
          </div>

          <div className="relative">
            <label className="text-sm text-[#314158] font-bold mb-2" htmlFor="confNew">Confirm new Password</label>
       
            <input
            id="confNew"
              type="password"
              {...register('confirmNewPassword')}
              placeholder="Password"
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl ps-3 h-12 focus:outline-none focus:border-[#00298d]"
            />
            {formState.errors.confirmNewPassword && formState.touchedFields.confirmNewPassword &&<p className="text-[12px] font-semibold text-[#eb0040]">{formState.errors.confirmNewPassword?.message}</p>}
          </div>

         

         <button
  disabled={isLoading}
  className={`w-full h-12 
  ${isLoading 
    ? 'bg-[#92a1c6] cursor-not-allowed' 
    : 'bg-[#00298d] hover:bg-[#001f6b]'} 
  text-white rounded-xl font-bold mt-2 transition`}
>
  Update password
</button>
        </form>
      
      </div>
     </div>
    </>
  )
}
