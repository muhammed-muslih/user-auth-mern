import adminData from "../config/adminCredentials.js"
import jwt from 'jsonwebtoken'
import * as adminService from '../services/adminServices.js'
import * as userService from '../services/userServices.js';
import {hash} from 'bcrypt';


export const verifyLogin = (req,res)=>{
    console.log(req.body);
    let {email,password} = req.body.data
    if(email != adminData.email || password != adminData.password){
        return  res.json({staus:'failed',message:'email or password not mathch'})
     }

     const token = jwt.sign({name:adminData},process.env.TOKEN_SECRET,{expiresIn:10000})

     res.json({
        status: "success",
        message: "admin verified",
        token,
     })
}

export const getAllUser = async (req,res)=>{
try{
    const users = await adminService.getAllUsers()
    
    res.json({
       status:"success",
       users
   })

}catch(err){
    console.log(err);
}
   
}

export const  addNewUser = async (req,res)=>{
    let {name,email,password} = req.body
    email = email.toLowerCase()
    const isEmailExist = await userService.isEmailExist(email)
    if(isEmailExist){
        return res.json({
            status:'failed',
            message: 'Email already exists',
        })
    }
    password = await hash(password,10)
    const user = await userService.registerUser(name,email,password)
    res.json({
        status:"success",
        message:"new user added",
        user
    })

}

export const editUser = async(req,res)=>{
    const userId=req.params.id
    let {email,name} = req.body
    const isEmailExist = await userService.isEmailExist(email)
    if(isEmailExist && email != isEmailExist.email){
        res.json({
            status:"failed",
            message: "Email already exists"

        })
    }

    await adminService.editUser(userId,email,name)
    res.json({
        status:"success",
        message:"user details updated successfully"
    })

    
}

export const deleteUser = async(req,res)=>{
    const userId = req.params.id
    await adminService.deleteUser(userId)
    res.json({
        status:"success",
        message:"user deleted successfully"
    })
}