import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import AuthContext from "../contexts/AuthContext";
import { useContext } from 'react'

export const PrivateRoutes = () => {
    const {currentUser} = useContext(AuthContext)
  return (
    currentUser ? <Outlet/> : <Navigate to='/login'/>
  )
}
