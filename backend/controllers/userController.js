import {hash,compare} from 'bcrypt';
import jwt from 'jsonwebtoken'
import * as userService from '../services/userServices.js'
import cloudinary from '../util/cloudinary.js';



export const registerUser = async(req,res)=>{
    let {name,email,password} = req.body.data;
    console.log(req.body);
    email =email.toLowerCase();
    const isEmailExist = await userService.isEmailExist(email)
    if(isEmailExist){
        return res.json({
            status:'failed',
            message: 'Email already exists',
        })
    }
    password = await hash(password,10)
    const user = await userService.registerUser(name,email,password)
    const userId = user.insertedId
    const token =  jwt.sign({userId},process.env.TOKEN_SECRET,{expiresIn:10000})
    res.json({
        status: 'success',
        message:"User registered",
        data:{
            userId,
            name
        },
        token
    })

}

export const loginVerify = async(req,res)=>{
    let {email,password} = req.body.data
    email = email.toLowerCase();
    const user = await userService.isEmailExist(email)
     if(!user){
        return res.json({
            status:'failed',
            message:"this user doesn't exist"
        })
    }
    const isPassowrdCorrect = await compare(password, user.password)
    if(!isPassowrdCorrect){
        return res.json({
            status:'failed',
            message:'Sorry, your password was incorrect'
        })
    }
    const token =  jwt.sign({userId:user._id},process.env.TOKEN_SECRET,{expiresIn:10000})
     res.json({
        status:"success",
        message:"verified user",
        data:{
            userId:user._id,
            name:user.name,
        },
        token
     })
}

export const getUser = async (req,res)=>{
    const userId =req?.userId
    const userDetails = await userService.getUser(userId)
     
    res.json({
        status:'success',
        userDetails
    })
}

export const setProfilePic = async(req,res) =>{
   console.log(req.userId);
    if(!req.file){
        return res.status(401).json({
            status:"failed",
            message:'please upload your image before submit'

        })
    }

    const {url} = await cloudinary.uploader.upload(req.file.path)
    await userService.updateProfilePic(req.userId,url)
    res.json({
        status:'success',
        message:"Profile updated successfully",
        image:url
    })
}
