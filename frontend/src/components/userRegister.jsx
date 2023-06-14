import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import {setUser} from "../redux/features/createUserSlice"
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";



const RegisterUser = ()=>{
    const dispatch = useDispatch()
    const data = useSelector((state)=>state.registerUser)
    const navigate = useNavigate();
    
    const [userData,setUserData] = useState({
        name:'',
        email:'',
        password:''
  
       })

       function registerHandler (e){
        e.preventDefault()
        console.log(userData);
         dispatch(setUser(userData))
       }
       useEffect(()=>{
        if(data?.status === 'success'){
            navigate('/')
        }

       })
       

    return(

        <div className="flex my-40 justify-center " >
        <div className="shadow-lg shadow-slate-800 p-24  bg-slate-800 rounded-lg">
            <h1 className=" text-white text-2xl font-black mx-20 ">REGISTER USER</h1>
        <form  onSubmit={registerHandler}>

        <label className="block mt-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-white">
         Name
        </span>
          <input type="text" name="name" className="mt-1 px-3 py-2 sm:w-96  h-14  bg-white border shadow-sm border-slate-300
           placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
           rounded-md sm:text-lg focus:ring-1" placeholder="enter your name" 
           onChange={(e)=>setUserData({...userData,name: e.target.value})}
           
           />
        </label>



        <label className="block mt-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-white">
         Email
        </span>
          <input type="email" name="email" className="mt-1 px-3 py-2 sm:w-96 h-14 bg-white border shadow-sm border-slate-300
           placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
            rounded-md sm:text-lg focus:ring-1" placeholder="you@example.com"
            onChange={(e)=>setUserData({...userData,email: e.target.value})}
            />
        </label>


        <label className="block mt-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-white">
         Password
        </span>
          <input type="password" name="password" className="mt-1 px-3 py-2  sm:w-96 h-14 bg-white border shadow-sm border-slate-300
           placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
            rounded-md sm:text-lg focus:ring-1" placeholder="enter password"
             onChange={(e)=>setUserData({...userData,password: e.target.value})}
            
            />
        </label>

       
           <button type="submit" className="bg-white sm:w-96 mt-10 rounded-full py-2 text-lg font-bold text-slate-800
            hover:bg-slate-300">submit</button>
           <p className="mt-2 text-white">already have an account? <span className="text-md hover:text-slate-300 cursor-pointer"> <Link to='/login'>login </Link></span></p> 
        </form>
        </div>
    </div>


    )
}
export default RegisterUser 