
import { useEffect } from "react";
import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Auth from "./components/Auth/Auth";
import {HeroUIProvider} from "@heroui/react";
import AuthContextProvider from "./context/AuthContext";
import Profile from "./components/Profile/Profile";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import AuthProtectedRoutes from "./components/AuthProtectedRoutes/AuthProtectedRoutes";
// import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from "./components/PostDetails/PostDetails";
import UserProfile from "./components/UserProfile/UserProfile";
import Notification from "./components/Notification/Notification";
import ChangePassord from "./components/CgangePassword/ChangePassord";


const router=createBrowserRouter([{

 path:'',element:<Layout/>,children:[
  {index:true ,element:<ProtectedRoutes><Home/></ProtectedRoutes>},
  {path:'auth' ,element:<AuthProtectedRoutes><Auth/></AuthProtectedRoutes>},
  {path:'home',element:<ProtectedRoutes><Home/></ProtectedRoutes>},
  {path:'profile',element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
  {path:'notification',element:<ProtectedRoutes><Notification/></ProtectedRoutes>},
  {path:'usrprofile/:id',element:<ProtectedRoutes><UserProfile/></ProtectedRoutes>},
  {path:'changepassword',element:<ProtectedRoutes><ChangePassord/></ProtectedRoutes>},
  {path:'postdetails/:id',element:<ProtectedRoutes><PostDetails/></ProtectedRoutes>},
  // {path:'register',element:<Register/>},
  // {path:'login',element:<Login/>},
  {path:'*',element:<div className="bg-gray-600 flex justify-center items-center text-white h-screen ">
    <h2>404</h2>
  </div>}
]

}])

const QeueryClientConfigtution=new QueryClient()

export default function App() {

  // useEffect(() => {
  //   axios.get("https://route-posts.routemisr.com/")
  //     .then((res) => {
  //       console.log("Server Response:", res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err.response?.data || err.message);
  //     });
  // }, []);

  return (
    // <div>
    //   <h1>Route Posts API Test</h1>
    // </div>

    <>
      <QueryClientProvider client={QeueryClientConfigtution}>
          <AuthContextProvider>
     <HeroUIProvider>
        <RouterProvider router={router}/>
    </HeroUIProvider>
   </AuthContextProvider>
      </QueryClientProvider>
    
 
    </>
  );
}

 