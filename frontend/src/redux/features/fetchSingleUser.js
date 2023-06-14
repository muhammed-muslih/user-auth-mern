import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios';

initialState = {
    loading: false,
    status:"success",
    data:"",
    error:''
}

export const getUser =createAsyncThunk('user/getUser',async()=>{
     let token = localStorage.getItem('userToken')
     const response =   await axios.get('http://localhost:3000/api/getUser',{
               headers:{Authorization:`Bearer ${token}`}
        })
        console.log("response",response);
        console.log(response.data);
        return response.data
})

const getUserSlice= createSlice({
    name:"registerUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.status = action.payload.status,
            state.data = action.payload.userDetails
            state.error= ""
            
        })
        builder.addCase(getUser.rejected,(state,action)=>{
            state.loading= false
            state.status = ""
            state.data =""
            state.error= action.error.message
           
        })
    }
})

export default getUserSlice.reducer