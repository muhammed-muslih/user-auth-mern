import React from "react";
import {useNavigate} from 'react-router-dom'
const NavBar = ({admin})=>{
  const navigate = useNavigate()

    return(
        <div className="bg-slate-800 text-white flex justify-between p-7 ">
            <div className="lg:ml-56">
                <h1 className="text-2xl font-black antialiased">User Auth</h1>
            </div>
            <div className="lg:mr-52 bg-white text-slate-800 text-lg p-2 font-semibold rounded-md border-none ">
              {
                admin?
                 <button
                 onClick={(e)=>{
                  e.preventDefault();
                  localStorage.removeItem('adminToken');
                  navigate('/admin/login')
                 }}
                 
                
                >adminLogout</button>:<button onClick={(e)=>{
                  e.preventDefault();
                  localStorage.removeItem('userToken');
                  navigate('/login')
                }}>Logout</button>
              }  
            </div>
        </div>
    )
}
export default NavBar