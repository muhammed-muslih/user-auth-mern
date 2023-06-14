import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

import axios from 'axios';

initialState = {
    loading: false,
    status:'',
    message:'',
    data:'',
    token:'',
    error:""
}

export const loginUser =createAsyncThunk('users/loginUser',async(userData)=>{

     const response =   await axios.post('http://localhost:3000/api/login',{
           data: userData
        })
        if(response.data.status=="success"){
            console.log("response login",response);
            localStorage.setItem('userToken',response?.data?.token)
        }
        
        return response.data
})

const loginUserSlice = createSlice({
    name:"loginUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.data = action.payload.data,
            state.token = action.payload.token
            state.error= ""
            
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.status =  ""
            state.message =""
            state.data = "",
            state.token=""
            state.error= action.error.message
        })
    }
})

export default loginUserSlice.reducer