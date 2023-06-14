import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { fetchUsers } from '../redux/features/userSlice';
import AddModal from './addUserModal';
import EditModal from './editUserModal';
import DeleteModal from './deleteModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = ()=>{
  const navigate = useNavigate()

  const users = useSelector((state)=>state.users)
  const addUsers = useSelector((state)=>state.addUser)
  const editUsers = useSelector((state)=>state.editUser)
  const deleteUser = useSelector((state)=>state.deleteUser)

  const [searchText,setSearchText] = useState('')
  const [filterUser,setFilterUser] = useState([])

  const dispatch = useDispatch()

   useEffect(()=>{
    dispatch(fetchUsers())
    setFilterUser(users?.user)
   },[addUsers,editUsers,deleteUser])

   const token = localStorage.getItem("adminToken")
       if(!token){
        navigate('/admin/login')
       }

      
      useEffect(()=>{
        if(searchText){
          console.log(filterUser);
          const filter = users?.users.filter((user)=>{
            return user?.name.toLowerCase()?.includes(searchText.toLowerCase()) ||
            user?.email.toLowerCase()?.includes(searchText.toLowerCase())
          })
          setFilterUser(filter)
          }else{
            setFilterUser(users?.users)
          }
      },[searchText,users])
      
     return(
      <div  className='px-52 mt-6'>

        <div className='flex justify-between'>
        <div>
          <input type="text" className='border p-2 border-slate-900  text-lg'
           placeholder='search here....'
           onChange={(e)=>setSearchText(e.target.value)}
            />
        </div>
        <AddModal/>
        </div>
      <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" className='text-white'>
        <TableHead className='bg-slate-800' >
          <TableRow>
            <TableCell style={{color:"white",fontWeight:"bolder",fontSize:"1.5rem"}}>No</TableCell>
            <TableCell style={{color:"white",fontWeight:"bolder",fontSize:"1.5rem"}} align="right">Name</TableCell>
            <TableCell style={{color:"white",fontWeight:"bolder",fontSize:"1.5rem"}} align="right">Email</TableCell>
            <TableCell  style={{color:"white",fontWeight:"bolder",fontSize:"1.5rem"}} align="right">Edit</TableCell>
            <TableCell  style={{color:"white",fontWeight:"bolder",fontSize:"1.5rem"}} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
           

              
              {
                filterUser?.map((user,index)=>{
                  return(
              <TableRow key={user._id}>
              <TableCell component="th" scope="row"> <h1 style={{fontWeight:"bolder",fontSize:"1.3rem"}}> {index+1}</h1></TableCell>
              <TableCell align="right"> <h1 style={{fontWeight:"bolder",fontSize:"1.3rem"}}> {user.name}</h1 ></TableCell>
              <TableCell align="right"><h1 style={{fontWeight:"bolder",fontSize:"1.3rem"}}>{user.email}</h1></TableCell>
              <TableCell align="right">
                <EditModal 
                name={user.name}
                email={user.email}
                id={user._id}
                />
               </TableCell>
              <TableCell align="right"><DeleteModal id={user._id}/></TableCell>
              </TableRow>
                  )
                })
              }

           
        </TableBody>
      </Table>
    </TableContainer>
    </div>
                     
    )
}          
export default UserTable    