import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"


import axios from 'axios';

initialState = {
    loading: false,
    status:'',
    message:'',
    image:'',
    error:''
}

export const uploadImage =createAsyncThunk('users/uploadimg',async(formdata)=>{
        console.log(formdata)
        let token = localStorage.getItem('userToken')
        let res = await axios.post('http://localhost:3000/api/set-profie-pic',formdata,{
        headers:{Authorization:`Bearer ${token}`}
         })
        console.log(res.data);
        return res.data
})

const uploadImageSlice = createSlice({
    name:"uploadImage",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadImage.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(uploadImage.fulfilled,(state,action)=>{
            state.loading = false,
            state.status = action.payload.status,
            state.message = action.payload.message,
            state.image = action.payload.image
            state.error= ""
            
        })
        builder.addCase(uploadImage.rejected,(state,action)=>{
            state.loading = false
            state.status =  ""
            state.message =""
            state.url=""
            state.error= action.error.message
        })
    }
})

export default uploadImageSlice.reducer