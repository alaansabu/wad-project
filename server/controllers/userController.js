const Nodemailer = require('nodemailer')
const crypto = require('crypto')
const users = require('../models/users');
const { register } = require('module');

require('dotenv').config();


const transport = Nodemailer.createTransport(

{

service:'gmail',
auth:{
user:process.env.EMAIL_ADRESS,
pass:process.env.EMAIL_PASS
}
}


)

//otp gene

const generateOtp = ()=> crypto.randomInt(100000 , 999999).toString()


//register user

exports.register = async (req,res)=>{

try {
    

    

const {name,password,email,confirmPassword} =  req.body;

const user = await users.findOne(email)

if (user){

   return  res.status(400).json({message:'user alredy exists'})

}


 if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }


const otp = generateOtp()
const otpExpiery = new Date(Date.now()+10*60*1000)

user = new users ({name,password,otp,otpExpiery})
await user.save()


await  transport.sendMail({

    from:"selfflearning@gmail.com",
    to:email,
    subject:"your otp is",
    text:`your otp is ${otp}`
})

    res.status(200).json({message:"otp send successfully"})

}
 catch (error) {

    console.log(error);
    
res.status(500).josn({message:"server error"})


 }}

 //verigy otp

 exports.verifyOtp = async(req,res)=>{
try {
    
    


const {email,otp} =req.body;
const user = users.findOne({email})
 if(!user){

return res.status(404).json({message:"user not found"})


 }

 if(user.isVerified){

    return res.status(400).json({message:"user already verified"})

 }

if(user.otp !== otp || user.otpExpiery < new date()){

res.status(400).json({message:"invalid or expired otp"})

}

user.isVerified = true;
user.otp = undefined;
use.otpExpiery = undefined;

await  user.save()

res.status(200).json({message:"user verified successfully"})

 }
  catch (error) {


    res.status(500).json({message:"server error " , error})

 }}

 //resend otp

exports.resendOTP = async(req,res)=>{


    try {

        const {email} = req.body

        const user  = await user.findOne({email})
        if(!user) return res.status(404).json({message:"user does not exists"})
         if(user.isVerified){

    return res.status(400).json({message:"user already verified"})
         }
    const otp = generateOtp()
    user.otp = otp
    user.otpExpiery = new Date(Date.now() +10*60*1000)


            await user.save()

    await  transport.sendMail({

    from:"selfflearning@gmail.com",
    to:email,
    subject:"your otp is",
    text:`your otp is ${otp}`
})


 

    } catch (error) {

            res.status(500).json({message:"server error " , error})
    }

}

//login iser


exports.userLogin = async(req,res)=>{

try{

const {email,password} = req.body;

const user = users.findOne({email})

if(!user) return res.status(404).json({message:"user not found"})

if (user.password == password) return res.status(400).json({message:"incorrect password"})

if(!isVerified) return res.status(400).json({message:"user not verified"})

    req.session.user = {id:user._id,email:user.email,name:user.name};
    res.json({message:"login successfull"})
} 

catch(error){

res.status(500).json({message:"unable to login"})

}
}


//log out


exports.logoutUser = async(req,res)=>{

try {
    

req.session.destroy((req,res)=>{

res.status(200).json({message:"sessione ended"})

})

} catch (error) {
   if(error) return res.status(400).json({message:"unable to logout"},error)
    
}


}

///dashboard
exports.dashboard = (req,res)=>{


res.json({message:`welcome ${req.session.user.name}`})}