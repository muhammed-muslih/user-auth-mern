import React ,{useState,useEffect}from "react";
import ChangePic from "./changerProfileModal";
import {useSelector} from "react-redux";
import {useSelector,useDispatch} from "react-redux"
import {getUser} from  "../redux/features/fetchSingleUser"
import {useNavigate} from 'react-router-dom'



const UserCard = ()=>{
const data = useSelector((state)=>state.singleUser)
const resImage = useSelector((state)=>state.uploadImage)
console.log(resImage);

  console.log("data",data.data);
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let {name,email,profile} = data?.data
   useEffect(()=>{
    dispatch(getUser())
    console.log("fetched");
   },[])

   if(data?.status != "success"){
    navigate('/login')
   }
   
    return(
        <div className="flex my-40 justify-center " >
            <div className=" shadow-2xl flex">
           
                <div>  

                    {
                        resImage.image?  <img src={resImage?.image} alt=""className="w-96  h-96 p-4 "/>
                        : profile?<img src={profile} alt=""className="w-96  h-96 p-4 "/>
                        : <img src={""} alt=""className="w-96  h-96 p-4 "/>
                    }


                <div className="ml-32 hover:text-gray-700">
                    <ChangePic/>

                </div>
                </div>
                <div className="px-14 py-32">
                <h1 className="text-gray-500 text-lg font-semibold">USER NAME</h1>
                <h1 className="text-slate-800 text-2xl font-extrabold">{name}</h1>
                <h1 className="text-gray-500 text-lg font-semibold">USER EMAIL</h1>
                <h1 className="text-slate-800 text-2xl font-extrabold">{email}</h1>
                </div>
            </div>

        </div>

    )
}

export default UserCard