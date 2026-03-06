import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import axios from 'axios'


export const authContext=createContext()

export default function AuthContextProvider({children}) {
const [userToken, setuserToken] = useState(function(){
    return localStorage.getItem('tkn')
})

const [userId, setuserId] = useState(null)
const [userData, setuserData] = useState(null)


console.log('userToken',userToken)

 function setAuthenticatedUser(tkn){
    setuserToken(tkn)
 }

 function clearUserToken(){
    setuserToken(null)
 }

 
function getMyProfile(){
    return axios.get(`https://route-posts.routemisr.com/users/profile-data`,{   headers:{
      "Authorization": `Bearer ${localStorage.getItem('tkn')}`,
    }})
    .then((resp)=>{
      setuserData(resp.data.data.user)
    }).catch((error)=>{
      console.log(error)
    })
}



 function decodeUserToken(){
  const decodedToken=  jwtDecode(userToken)
  console.log('decodeToken',decodedToken.user)
  setuserId(decodedToken.user)
 }

 useEffect(function(){
   if(userToken){
      decodeUserToken()
   }
 },[userToken])

 useEffect(function(){
   if(userToken){
     getMyProfile()
   }
 },[userToken])

  return (
    <authContext.Provider value={{userToken,setAuthenticatedUser,clearUserToken,userId,userData}} >
        
    {children} 
    </authContext.Provider>
  )
}
