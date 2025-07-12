import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'


const ProtectedRoute = ({children}) => {
   const {isAuthenticated}= useSelector(store=>store.auth)
   if(!isAuthenticated){
    return <Navigate to='/login'/>
   }
   return children;

}
const AuthonticatedUser=({children})=>{
     const {isAuthenticated}= useSelector(store=>store.auth)
   if(isAuthenticated){
    return <Navigate to='/'/>
   }
   return children;
}

export  {ProtectedRoute ,AuthonticatedUser}
