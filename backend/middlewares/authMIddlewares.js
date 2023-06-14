import  Jwt  from "jsonwebtoken";

export const  userAuthentication = (req,res,next) =>{
    const authHead = req.headers?.authorization?.startsWith("Bearer") && req.headers.authorization
    const token = authHead?.split(' ')[1]
    if(!token){
        return res.status(401)
        .json({
            status:"faild",
            message:'token not found',
        })
    }

    Jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err,decoded)=>{
            if(err) res.status(403).json({status:"failed",message:"invalid token"})
            req.userId = decoded.userId
            return next()

        }
    )
}


export const  adminAuthentication = (req,res,next) =>{
    const authHead = req.headers?.authorization?.startsWith("Bearer ") && req.headers.authorization
    const token = authHead?.split(' ')[1]
    if(!token){
        return res.status(401).json({
            status:"faild",
            message:'token not found',
        })
    }

    Jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (err,decoded)=>{
            if(err) res.status(403).json({status:"failed",message:"invalid token"})
            return next()

        }
    )
}