import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios';

initialState = {
    status:'',
    message:'',
    error:""
}

export const addUser =createAsyncThunk('users/adddUser',async(userData)=>{
      let token= localStorage.getItem('adminToken');
      console.log("hello");
     const response =   await axios.post('http://localhost:3000/api/admin/add-user', userData,{
        headers:{Authorization:`Bearer ${token}`}
     })
        console.log("response",response);
        return response.data
})

const addUserSlice = createSlice({
    name:"registerUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.error= ""
            
        })
        builder.addCase(addUser.rejected,(state,action)=>{
            state.status =  ""
            state.message =""
            state.error= action.error.message
        })
    }
})

export default addUserSlice.reducer