const express=require('express');
const validateRoute=express.Router();
const jwt=require("jsonwebtoken")
require("dotenv").config();
validateRoute.post('/verifytoken',async(req,res)=>{
    let authHeader = req.headers.authorization;
    const accesstoken = authHeader && authHeader.split(" ")[1];

    // console.log("authheader : "+ accessToken);
    // const acesstoken=req.body.accesstoken;
    try{
        const result=jwt.verify(accesstoken,process.env.SECURITY_KEY)
        // console.log(result);
        res.status(200).json({msg:"verified",status:"success"});
    }
    catch(error){
        res.status(400).json({msg:"session expired",status:"failed",error:JSON.stringify(error)});
    }

});
module.exports=validateRoute;



