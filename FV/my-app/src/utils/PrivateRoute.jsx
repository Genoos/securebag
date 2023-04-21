import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext";
import { useContext ,useEffect} from 'react'

export const PrivateRoutes = () => {
  // const {setCurrentUser} = useContext(AuthContext)

  // useEffect(() => {
  //   const local = localStorage.getItem("currentUser");
  //   console.log("local in private ", local);
  //   setCurrentUser(()=>"local");
    // console.log("currentUser in private", currentUser);
  // },[])
  // const { currentUser } = useContext(AuthContext);
  const currentUser = localStorage.getItem("currentUser");
  console.log("currentUser in private", currentUser);
  return (
    currentUser ? <Outlet/> : <Navigate to='/login'/>
  )
}
