import User from "@/models/userModel";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { connect } from "@/db/dbConfig";
import jwt from 'jsonwebtoken'

connect()

export async function POST(req:NextRequest){
    try {
        const reqBody=await req.json()
        const {email,password} = reqBody
        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({message:"User not found"},{status:404})
        }
        const checkedPassword = bcryptjs.compare(password,user.password)

        if(!checkedPassword){
            return NextResponse.json({error:"Invalid credentials"},{status:400})
        }

        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response=NextResponse.json({
            message:"User logged in successfully",
            success:true
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}