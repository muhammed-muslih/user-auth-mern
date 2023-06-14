import React,{useState,useEffect} from "react";
import Modal from 'react-modal';
import { useDispatch ,useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/features/addNewUserSlice";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const AddModal = ()=>{
      const dispatch =useDispatch()

      const [modalIsOpen, setIsOpen] = React.useState(false);
      const [errorMsg,setErrorMsg] = React.useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

     
      

      const [userData,setUserData] = useState({
        name:'',
        email:'',
        password:''
  
       })


       function addUserHandler (e){
        e.preventDefault()
        if(userData.name==""||userData.email==""||userData.password==''){
          console.log("allfeild required");
          setErrorMsg(true)
          
        }else{

        console.log(userData);
         dispatch(addUser(userData))
         closeModal()

        }
        
       }

    return(
    <div>
     <div className="text-2xl font-extrabold ">
      <button  className="border p-2 border-solid mb-2 cursor-pointer hover:text-slate-700  border-slate-900" onClick={openModal}>ADD USER</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
       
      <div><h1>Add New User</h1></div>
      <form  onSubmit={addUserHandler}>

          <label class="block mt-2">
          <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Name
          </span>
            <input type="text" name="name" className="mt-1 px-3 py-2 sm:w-96  h-14  bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
             rounded-md sm:text-lg focus:ring-1" placeholder="enter your name"
             onChange={(e)=>setUserData({...userData,name: e.target.value})}
              />
          </label>
          
          <label class="block mt-2">
          <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Email
          </span>
            <input type="email" name="email" className="mt-1 px-3 py-2 sm:w-96 h-14 bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
              rounded-md sm:text-lg focus:ring-1" placeholder="you@example.com" 
            onChange={(e)=>setUserData({...userData,email: e.target.value})}
              />
          </label>
          
          
          <label class="block mt-2">
          <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Password
          </span>
            <input type="password" name="password" className="mt-1 px-3 py-2  sm:w-96 h-14 bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
              rounded-md sm:text-lg focus:ring-1" placeholder="enter password" 
             onChange={(e)=>setUserData({...userData,password: e.target.value})}
              />
          </label>

          {
            errorMsg?<span className="text-red-600">allfeild required</span>:""
          }
          
          <div className='flex justify-end mt-2 '>
            <div className='bg-slate-800 text-white p-2 px-3 rounded-lg'>
            <div> <button type='submit' >Submit</button></div>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div  className='text-slate-800 border border-slate-800 p-2  px-3 rounded-lg'>
                 <button  onClick={closeModal} > close</button>
            </div>
                      
          </div>
       </form>
      </Modal>
    </div>
    )
}

export default AddModal