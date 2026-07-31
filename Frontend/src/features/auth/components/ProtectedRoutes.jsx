import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Protected =({children})=>{
    const {
        user, loading
    } = useAuth 
    const navigate = useNavigate

    if(!loading && !user){
      return <Navigate to ='/login'/>
    }
    if(loading){
        <h1>Loading...</h1>
    }
    return children
}

export default protected