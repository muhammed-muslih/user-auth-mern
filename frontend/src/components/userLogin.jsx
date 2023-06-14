import React ,{useEffect, useState}from "react"
import {Link} from 'react-router-dom'
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/features/loginUserSlice";

const UserLogin = ()=>{

    const dispatch = useDispatch()
    const data = useSelector((state)=>state.loginUser)
    const navigate = useNavigate();
    
    const [userData,setUserData] = useState({
        email:'',
        password:''
  
       })

       function registerHandler (e){
        e.preventDefault()
        console.log(userData);
         dispatch(loginUser(userData))
       }
       if(data?.status ==='success'){
        navigate('/')
       }

    useEffect(()=>{
        const token = localStorage.getItem("userToken")
       if(token){
        navigate('/')
       }

    },[])
       



    return(

        <div className="flex my-40 justify-center " >
        <div className="shadow-lg shadow-slate-800 p-24  bg-slate-800 rounded-lg">
            <h1 className=" text-white text-2xl font-black mx-20 "> 
            
                <span>LOGIN USER</span>
            
            </h1>
        <form  onSubmit={registerHandler}>

        <label className="block mt-2">
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-white">
         Email
        </span>
          <input type="email" name="email" className="mt-1 px-3 py-2 sm:w-96 h-14 bg-white border shadow-sm border-slate-300
           placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
            rounded-md sm:text-lg focus:ring-1" placeholder="you@example.com" value={userData.email}
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
            <div>
            {
            data?.status ==='failed'? <span className="text-red-600 text-lg">{data?.message}</span>:""

             }
             </div>

           
                <p className="text-white mt-2  text-md hover:text-slate-300 cursor-pointer"><Link to='/register'>register new user</Link>  </p>
            


           
        </form>
        </div>
    </div>
        
    )
}

export default UserLogin