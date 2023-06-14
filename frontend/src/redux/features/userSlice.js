import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    loading:false,
    status:'',
    users:[],
    error:""
}

export const  fetchUsers = createAsyncThunk('users/fetchUsers',()=>{
    let token = localStorage.getItem('adminToken')
    return( 
        axios.get('http://localhost:3000/api/admin/get-users',{
            headers:{Authorization:`Bearer ${token}` }
        })
        .then((response)=>response.data)
    )

})  

const userSlice = createSlice({
    name: "fetchusers",
    initialState,
    reducers:{},
    extraReducers : (builder)=>{
        builder.addCase(fetchUsers.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload.users
            state.status = action.payload.status
            state.error = ""
        })
        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false;
            state.users = [],
            state.status = ""
            state.error = action.error.message
        })
    }


})
export default userSlice.reducer
