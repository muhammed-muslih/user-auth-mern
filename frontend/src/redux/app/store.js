import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import RegisterUserSlice from "../features/createUserSlice";
import getUserSlice from "../features/fetchSingleUser"
import  loginUserSlice  from "../features/loginUserSlice";
import uploadImageSlice from "../features/imageUploadSlice"
import addUserSlice from "../features/addNewUserSlice";
import  editUserslice from "../features/editUserSlice";
import deleteUserslice from "../features/deleteUserslice";

const store = configureStore({
    reducer:{
        users:userSlice,
        registerUser:RegisterUserSlice,
        singleUser:getUserSlice,
        loginUser:loginUserSlice,
        uploadImage:uploadImageSlice,
        addUser:addUserSlice,
        editUser:editUserslice,
        deleteUser:deleteUserslice

    }
})

export default store