import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios';

initialState = {
    status:'',
    message:'',
    error:""
}

export const deleteUser =createAsyncThunk('user/deleteUser',async(id)=>{
      let token= localStorage.getItem('adminToken');
      console.log("hello",id);
     const response =   await axios.delete(`http://localhost:3000/api/admin/delete-user/${id}`,{
        headers:{Authorization:`Bearer ${token}`}
     })
        console.log("response",response);
        return response.data
})

const deleteUserSlice = createSlice({
    name:"deleteUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.error= ""
            
        })
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.status =  ""
            state.message =""
            state.error= action.error.message
        })
    }
})

export default deleteUserSlice.reducer