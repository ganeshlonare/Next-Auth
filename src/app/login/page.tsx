'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {toast ,Toaster} from 'react-hot-toast'
import Link from 'next/link'

export default function SignInPage() {

    const router=useRouter()

    const [user,setUser]=useState({
        email:"",
        password:""
    })

    const [buttonDisabled , setButtonDisabled]=useState(false)

    const [loading , setLoading]=useState(false)

    const onSignUp=async ()=>{
        try {
            setLoading(true)
            if(user.email.length<=0){
                return toast.error("email is required")
            }
            if(user.password.length<=0){
                return toast.error("email is required")
            }
            const response=await axios.post("/api/Signin",user)
            console.log("Signup Success",response)
            router.push("/profile")
            setLoading(false)
        } catch (error:any) {
            setLoading(false)
            console.log("Sign Up failed" , error.response.data)
            return toast.error("Sign Up Failed")
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    },[user])

    console.log(user)
    return (
        <>
        <Toaster/>
        <div  className='bg-black w-screen h-screen flex flex-col items-center justify-center gap-4'>
        <div className="h-96 w-72 bg-slate-200 rounded-lg border-gray-500 border-2 flex flex-col justify-center items-center">
        <h1 className="text-4xl text-black pb-4">Sign Up</h1>
        <form className="flex flex-col">
            <label className='text-black' htmlFor="email">Email</label>
            <input 
            value={user.email}
            onChange={(e)=>{
                setUser({...user,email:e.target.value})
            }}
            placeholder='Enter email' 
            className='text-white
             rounded-md w-fit bg-black p-2' 
            type="text" 
            id="email" />
            <label className='text-black' htmlFor="password">Password</label>
            <input 
            value={user.password}
            onChange={(e)=>{
                setUser({...user,password:e.target.value})
            }}
            placeholder='Enter password' 
            className='text-white rounded-md w-fit bg-black p-2' 
            type="text" 
            id="password" />
        </form>
        <div className="text-center">
            <button onClick={onSignUp} className='mt-4 bg-green-500 rounded-lg p-2 text-white'>{loading? "Loading" : "Sign In"}</button>
            <br />
            <Link className='text-black' href="/signup">Visit to Sign Up</Link>
        </div>
        </div>
    </div>
    </>
    )
  }
  