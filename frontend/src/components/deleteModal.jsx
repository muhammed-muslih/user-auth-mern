import React from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-regular-svg-icons'
import {useSelector,useDispatch} from "react-redux"
import { deleteUser } from "../redux/features/deleteUserslice";


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

const DeleteModal = ({id})=>{

      const [modalIsOpen, setIsOpen] = React.useState(false);
    
      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }

      const dispatch = useDispatch()

      const deleteHandler = ()=>{
        console.log(id);
        dispatch(deleteUser(id))
        closeModal()
      }

      
    return(
    <div>
     <div className="text-2xl font-extrabold ">
      <button onClick={openModal}><FontAwesomeIcon icon={faTrashCan}  size='lg'/></button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
       
     
           <div>
            <h1 className="text-xl text-slate-800 font-bold">Are you sure!Do you want to delete this user?</h1>

           </div>

          <div className='flex justify-end mt-2 '>
            <div className='bg-slate-800 text-white p-2 px-3 rounded-lg'>
            <button  onClick={closeModal} > No</button>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div  className='text-slate-800 border border-slate-800 p-2  px-3 rounded-lg'>
            <div> <button type='submit' onClick={deleteHandler} >yes</button></div>
            </div>
                      
          </div>
      </Modal>
    </div>
    )
}

export default DeleteModal