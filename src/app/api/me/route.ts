import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse , NextRequest } from "next/server";

connect()

export async function POST(req:NextRequest){
    try {
        const userId=await getDataFromToken(req)
        const user=await User.findById({_id:userId}).select("-password")
        if(!user){
            NextResponse.json({error:"User not found"},{status:404})
        }
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
}