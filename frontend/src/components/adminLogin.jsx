import React ,{useEffect, useState}from "react"
import {loginAdmin} from"../utils/adminLogin"
import { useNavigate } from "react-router-dom"

const AdminLogin = ()=>{
    const [errorMsg,setErrorMsg] = useState(false)
    const[requireMsg,setRequireMsg] = useState(false)
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        email:'',
        password:''
  
       })

       async function registerHandler (e){
        e.preventDefault()
        if(userData.password ==""||userData.email ==""){
            setRequireMsg(true)
            return
        }
        console.log(userData);
        const res = await loginAdmin(userData)
        console.log(res)
        if(res.status === "success"){
            localStorage.setItem('adminToken',res?.token)
            navigate('/admin')
        }else{
            setErrorMsg(true)

        }

       }

       useEffect(()=>{
        const token = localStorage.getItem('adminToken')
        if(token){
            navigate('/admin')
        }
       },[])
       
    return(

        <div className="flex my-40 justify-center " >
        <div className="shadow-lg shadow-slate-800 p-24  bg-slate-800 rounded-lg">
            <h1 className=" text-white text-2xl font-black mx-20 "> 
            
              <span>ADMIN LOGIN</span>
            
            </h1>
        <form  onSubmit={registerHandler}>

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

        {   requireMsg?
            <p className="text-red-600">all field required </p>
            :errorMsg?<p className="text-red-500">check your email or password</p>
            :""
        }


       
           <button type="submit" className="bg-white sm:w-96 mt-10 rounded-full py-2 text-lg font-bold text-slate-800
            hover:bg-slate-300">submit</button>
            <div>
            
             </div>
        </form>
        </div>
    </div>
        
    )
}

export default AdminLogin