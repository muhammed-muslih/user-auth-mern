import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios';

initialState = {
    status:'',
    message:'',
    error:""
}

export const editUser =createAsyncThunk('users/editUser',async(userData)=>{
      let token= localStorage.getItem('adminToken');
      console.log("hello",userData.id);
     const response =   await axios.patch(`http://localhost:3000/api/admin/update-user/${userData.id}`, userData,{
        headers:{Authorization:`Bearer ${token}`}
     })
        console.log("response",response);
        return response.data
})

const editUserslice = createSlice({
    name:"registerUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(editUser.fulfilled,(state,action)=>{
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.error= ""
            
        })
        builder.addCase(editUser.rejected,(state,action)=>{
            state.status =  ""
            state.message =""
            state.error= action.error.message
        })
    }
})

export default editUserslice.reducer