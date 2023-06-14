import React,{useState} from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-regular-svg-icons'
import {useDispatch} from "react-redux"
import {editUser} from"../redux/features/editUserSlice"

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

const EditModal = ({name,email,id})=>{

      const [modalIsOpen, setIsOpen] = React.useState(false);
      const [errorMsg,setErrorMsg] = React.useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

    let dispatch = useDispatch()

      const [userData,setUserData] = useState({
        name:name,
        email:email,
        id:id
  
       })


       function editUserHandler (e){
        e.preventDefault()
        if(userData.email == ""||userData.name==""){
          setErrorMsg(true)
          return
        }
        
         dispatch(editUser(userData))
         closeModal()
       }

    return(
    <div>
     <div className="text-2xl font-extrabold ">
      <button onClick={openModal}><FontAwesomeIcon icon={faPenToSquare} size="lg"/></button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
       
      <div><h1>Edit User</h1></div>
      <form onSubmit={editUserHandler} >

          <label class="block mt-2">
          <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-md font-medium text-slate-800">
           Name
          </span>
            <input type="text" name="name" className="mt-1 px-3 py-2 sm:w-96  h-14  bg-white border shadow-sm border-slate-300
             placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block 
             rounded-md sm:text-lg focus:ring-1" placeholder="enter your name"
             defaultValue={name}
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
              defaultValue={email}
             onChange={(e)=>setUserData({...userData,email: e.target.value})}

               />
          </label>
          {
            errorMsg? <p className="text-red-600">field required</p>:""
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

export default EditModal