import { getDB } from "../db.js";
import { ObjectId } from 'mongodb';


export const registerUser = (name,email,password)=>{
    const isBlocked = false
    const userId = getDB().collection('users').insertOne({name,email,password,isBlocked})
    return userId

}

export const isEmailExist = (email) =>{
    const user = getDB().collection('users').findOne({email})
    return user
}

export const getUser = async(userId)=>{

    const user = await getDB().collection('users').findOne({_id:new ObjectId(userId)})
    return user

}

export const updateProfilePic = async(userId,profile)=>{
    await getDB().collection('users').updateOne(
        {_id:new ObjectId(userId)},
        {$set:{profile}}
    )
    

}