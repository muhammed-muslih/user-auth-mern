import axios from "axios";
export const loginAdmin =async(userData)=>{
console.log(userData);
    const response =   await axios.post('http://localhost:3000/api/admin/login',{
          data: userData
       })
       
       return response.data
}