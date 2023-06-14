import React,{useState} from 'react';
import axios from "axios";
import Modal from 'react-modal';
import ReactLoading from 'react-loading';
import { uploadImage } from '../redux/features/imageUploadSlice';
import { useDispatch ,useSelector} from "react-redux";
import { log } from 'console';



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





function ChangePic() {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  

 const [image,setImage] = useState()

 const imageUpload = (data) => {
  console.log("hello");
  const formdata = new FormData();
  formdata.append("image", data);
  console.log(formdata);
  dispatch(uploadImage(formdata))
  closeModal()
};


  return (
    <div>
      <button onClick={openModal}>change profile pic</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
       
        <div><h1>choose new profile image</h1></div>
        <form>
           <label classNmae="block">
            <span className="sr-only">Choose profile photo</span>
              <input type="file" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                p-8" name='image'
                onChange={(e)=>{
                   setImage(e.target.files[0])
                }}
                />
            </label>
          
        </form>
        <div className='flex justify-end  '>
            <div className='bg-slate-800 text-white p-2 px-3 rounded-lg'>
            <div> <button type='submit'
             onClick={()=> imageUpload(image)}
            
            >Submit</button></div>
            </div>
            &nbsp;&nbsp;&nbsp;
            <div  className='text-slate-800 border border-slate-800 p-2  px-3 rounded-lg'>
                 <button  onClick={closeModal} > close</button>
            </div>
            
        </div>
       
      </Modal>
    </div>
  );
}

export default ChangePic