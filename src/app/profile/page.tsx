'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast , Toaster } from 'react-hot-toast'

export default function page() {

    const router = useRouter()

    const [userData,setUserData]=useState({
        username:"",
        email:""
    })

    const [isUser,setIsUser]=useState(false)

    const profileData=async()=>{
        try {
            const user=await axios.post("/api/me")
            
        setUserData({
            username:user.data.data.username,
            email:user.data.data.email
        })
        setIsUser(true)
        console.log("profile",user)
        } catch (error) {
            console.log(error)
            return toast.error("You are not authenticated")
        }
    }

    const handleSignOut=async()=>{
        try {
            await axios.post("/api/logout")
            router.push("/signup")
            console.log("signed out")
        } catch (error) {
            console.log(error)
            return toast.error("You are not authenticated")
        }
    }
  return (
    <>
    <Toaster />
    <div className='h-screen flex flex-col justify-center items-center'>
      <button onClick={profileData}>click me</button>
      <div className="">
        {
           isUser?`Your Name:- ${userData.username}`:null
        }
      </div>
      <div className="">
      {isUser?`Your Email:- ${userData.email}`:null}
      </div>
      <button onClick={handleSignOut} className='bg-white text-black rounded-lg p-2'>
        Sign Out
      </button>
    </div>
    </>
  )
}
