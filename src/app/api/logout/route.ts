import { connect } from "@/db/dbConfig";
import { NextResponse , NextRequest } from "next/server";

connect()

export async function POST(req:NextRequest){
    try {
        const response=NextResponse.json({
            message:"Logged out Successfully",
            success:true
        },{status:200})

        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:500})
    }
}