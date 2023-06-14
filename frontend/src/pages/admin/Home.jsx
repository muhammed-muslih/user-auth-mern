import React from 'react';
import NavBar from '../../components/NavBar';
import UserTable from '../../components/UserList';
import AddModal from '../../components/addUserModal';
const AdminHome = ()=>{
    return(
        <>
        <NavBar admin/>
        <UserTable/>
        </>
    )
}
export default AdminHome