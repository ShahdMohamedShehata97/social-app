import { useContext } from "react"
import { authContext } from "../../context/AuthContext"
import ProfileCard from "../ProfileCard/ProfileCard"
// import ProfileCard

export default function Profile() {

const {userData}=useContext(authContext)

if(!userData){
  return <div>Loading...</div>
}

return (
//  <ProfileCard user={userData}/>
<ProfileCard user={userData}/>
)
}