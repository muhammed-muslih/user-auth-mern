import express from "express";
import cookieParser from 'cookie-parser'
import morgan from "morgan"
import colors from "colors"

import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from "./db.js";
dotenv.config({ path: "./backend.env" })


const app = express();
app.use(cookieParser())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api',userRouter)
app.use('/api/admin',adminRouter)


connect((error,db)=>{
    if(error){
        console.log("database not connected",error);
    }else{
        console.log(`database connected successfully`.bgMagenta);
    }
})


const PORT = 3000;
app.listen(PORT,(err)=>{
    if(err) console.log('error in connencting sever');
    console.log(`server running on port ${PORT} `.bgGreen);
})