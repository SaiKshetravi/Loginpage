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


    postRoutes.get('/loginuserposts',async(req,res)=>{
        let authHeader = req.headers.authorization;
    const accesstoken = authHeader && authHeader.split(" ")[1];
try{
    const result= await jwt.verify(accesstoken,process.env.SECURITY_KEY)
    console.log(result);
        
        const userid=result.id;
        
        const posts=await postModel.find({userid:userid});
        
        res.status(200).json({msg:"posts with userid",status:"success",posts: posts});
}
catch(error){
    res.status(400).json({msg:"session expires",status:"failed"})
}


    });




    postRoutes.delete('/deletepost/:postid',async(req,res)=>{
        let postid = req.params.postid;
        try{
            let postData = await postModel.findById(postid);
            // console.log("postData :" + postData);
            let result = await postModel.findByIdAndDelete(postid);

            // if(!result){
            //      res.status(400).json({msg:"Post Does't Present  !" ,status:"failure",postData:postData,tittle:postData.title})
            // }

            // console.log("result : "+result)

            res.status(200).json({msg:"Post Deleted Successfully !" ,status:"success",title:postData.title})



        }
        catch(error){
            res.status(400).json({msg:"Error in Deleting the post",status:"false"});
        }



    })

    postRoutes.get('/postdata/:postid',async(req,res)=>{
        let postid=req.params.postid;
        try{
        let postdata= await postModel.findById(postid);
        // console.log('data :' ,postdata);
        res.status(200).json({msg:"edit post data",status:"success",postdata:postdata})
        }
        catch(error){
            res.status(400).json({msg:"error in postid",status:"false"});
        }
    })
    postRoutes.put('/updatepost/:postid',async(req,res)=>{

        let postid=req.params.postid;
        const data=req.body;
        try {
    const updatedPost = await postModel.findByIdAndUpdate(
      postid,
      { title:data.title, description:data.description},
      { new: true }
      
    );
    console.log("updatedpost",updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});


postRoutes.put('/likepost/:postid', async (req, res) => {
  const postid = req.params.postid;
  const authHeader = req.headers.authorization;
  const accesstoken = authHeader && authHeader.split(" ")[1];

  if (!accesstoken) {
    return res.status(401).json({ msg: "Access token missing" });
  }

  try {
    const result = await jwt.verify(accesstoken, process.env.SECURITY_KEY);
    // console.log(result )
    const userid = result.id;

    console.log("User ID from token:", userid);

    const like = await postModel.findByIdAndUpdate(
      postid,
      { $addToSet: { Likes: userid } }, // Prevents duplicate likes
      { new: true }
    );

    if (!like) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // console.log("Updated Post:", like);
    res.status(200).json({ msg: "Liked the post", status: "success",Likes:like.Likes.length });

  } catch (error) {
    res.status(400).json({ msg: "Could not like the post", error: error.message });
  }
});


module.exports=postRoutes;








