const express=require('express');
const postModel=require("../model/postdata")
const postRoutes=express.Router();
const jwt=require("jsonwebtoken")
require("dotenv").config();

postRoutes.post('/createpost',async(req,res)=>{

    const data=req.body;
    
    const  token=data.accesstoken;
    
    try{
     const result=jwt.verify(token,process.env.SECURITY_KEY)
     const userid=result.id;
     const temppostdata={
        "title":data.title,
        "description":data.description,
        "userid":userid
     }
    //  console.log("temppostdata:",temppostdata);
     let newUser=new postModel({...temppostdata}) 
    // console.log( "new user",newUser);
    const results=await newUser.save();
    console.log("results",results);


    //  console.log('result'+JSON.stringify(result));
     res.status(200).json({msg:"post created successfully",status:'success'});
    }
    catch(error){
    res.status(400).json({msg:"Session Expired",status:"failure",error:JSON.stringify(error)})

    }
    });

    postRoutes.get('/allposts',async(req,res)=>{

        const allposts= await postModel.find().sort({ createdAt: 1 });
        res.status(200).json({msg:"post fetch successfully",status:"succes",allposts:allposts})
        

    })
module.exports=postRoutes;