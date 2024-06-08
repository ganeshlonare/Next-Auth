import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEMail = async ({email,emailType,userId}:any)=>{
    try {

      const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
          await User.findById(userId,{
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000
          })
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOption={
            from: "ganesh.ai",
            to:email,
            subject: emailType==="VERIFY" ? "Verify Your Email" : "Reset Password",
            html: "<b>Hello world?</b>", 
          }

          const mailResponse = await transporter.sendMail(mailOption)
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.msg)
    }
}