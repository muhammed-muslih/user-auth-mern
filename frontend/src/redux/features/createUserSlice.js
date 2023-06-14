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

export const setUser =createAsyncThunk('users/RegisterUser',async(userData)=>{

     const response =   await axios.post('http://localhost:3000/api/register',{
           data: userData
        })
        console.log("response",response);
        localStorage.setItem('userToken',response.data.token)
        return response.data
})

const RegisterUserSlice = createSlice({
    name:"registerUser",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(setUser.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(setUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.data = action.payload.data,
            state.token = action.payload.token
            state.error= ""
            
        })
        builder.addCase(setUser.rejected,(state,action)=>{
            state.loading = false
            state.status =  ""
            state.message =""
            state.data = "",
            state.token=""
            state.error= action.error.message
        })
    }
})

export default RegisterUserSlice.reducer