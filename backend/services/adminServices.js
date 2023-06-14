import { getDB } from "../db.js";
import { ObjectId } from 'mongodb';

export const getAllUsers = async ()=>{
    const users = await getDB().collection('users').find({isBlocked:false}).toArray()
    return users
}

export const editUser = async(userId,email,name)=>{

    await getDB().collection('users').updateOne(
        {_id:new ObjectId(userId)},
        {$set:{email,name}}
    )

}

export const deleteUser = async(userId)=>{
    await getDB().collection('users').deleteOne(
        {_id:new ObjectId(userId)}
    )
}
