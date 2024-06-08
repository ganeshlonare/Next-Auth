import mongoose from 'mongoose'

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection
        connection.on("connect",()=>{
            console.log("Connected to MongoDB")
        })
        connection.on("error",(err)=>{
            console.log("Error connecting MongoDB",err)
            process.exit()
        })
    } catch (error) {
        console.log(`something went wrong in connecting db`)
        console.log(error)
    }
}