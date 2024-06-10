import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEMail = async ({email,emailType,userId}:any)=>{
    try {

      const hashedToken=await bcryptjs.hash(userId.toString(),10)
        if(emailType==="VERIFY"){
          await User.findByIdAndUpdate(userId,{
            $set:{
            verifyToken:hashedToken,
            verifyTokenExpiry:Date.now()+3600000
            }
          })
        }else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userId,{
            $set:{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now()+3600000
            }
          })
        }

        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "50a69d2d44b8d2",
            pass: "287269ad1d4611"
          }
        });

          const mailOption={
            from: "ganeshlonare311@gmail.com",
            to:email,
            subject: emailType==="VERIFY" ? "Verify Your Email" : "Reset Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"?"verify your email":"reset your password"}
              or copy and paste the link below in your browser
              <br>
              ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
              </p>`, 
          }

          const mailResponse = await transport.sendMail(mailOption)
          return mailResponse;
    } catch (error:any) {
      console.log(error)
        throw new Error(error.msg)
    }
}