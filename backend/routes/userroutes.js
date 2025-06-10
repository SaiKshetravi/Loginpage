
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRound=10;
// const userdata=require('../modules/userdata');
const  Userdata=require('../model/userModel');
// const postdata=require('../modules/postdata');

require("dotenv").config();

router.get('/userdata',(req,res)=>{
res.json({message:"userdata",userdata:userdata});
});


router.post('/signup',async(req,res)=>{
    const data=req.body;
    
    const temp={};

temp.username=data.signupUsername;
temp.password=data.signupPassword;



    console.log("entered data:", data);
    
    



    
    //  const existingUsername = userdata.filter(user => user.username === data.signupUsername);

    // if (existingUsername.length > 0) {
    //     console.log("Username already exists");
    //     return res.status(400).json({ message: "Username already exists",status:false });
    // }

    //  Check if username already exists
    const existingUser = await Userdata.findOne({ username:temp.username });
    console.log("existinguser:",existingUser);

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
        status: false
      });
    }  // const newUserId = userdata[userdata.length -1].id+1; 
    // const newUserId = Userdata[Userdata.length -1].id+1
     const lastUser = await Userdata.findOne().sort({ id: -1 }); 
     console.log("lastuser",lastUser);
     let newid;
    if (lastUser) {
  
 newId = lastUser.id + 1;  
} else {
  
  newId = 101;  
}
console.log("newId:", newId);

temp.id = newId;
    
const enterpassword=temp.password;
console.log(" entered password: ", enterpassword);
    const hashedpassword= await bcrypt.hash(temp.password,saltRound);
    temp.password=hashedpassword;
    // userCount += 1;
    // temp.id = newUserId;
    console.log("hashed Password "+hashedpassword);
    
    let accesstoken= jwt.sign(temp,process.env.SECURITY_KEY,{expiresIn:'10s'})
    console.log(accesstoken);

    temp.accesstoken=accesstoken;



    // const newUser = await Userdata.create(temp);
    // console.log(newUser);
    
    let newUser=new Userdata({...temp}) 
    console.log( "new user",newUser);
        await newUser.save();
        
    console.log("User created successfully" , newUser);
   return res.status(200).json({  
    message: "User created successfully",
     user: {
            userId: temp.userId,
            username: temp.username,
        
        }, 
        status: "success" 
    });
});




router.post('/login',async(req,res)=>{
    const data=req.body;
    console.log("login data", data);
    const isUserExits= await Userdata.findOne({username:data.loginUsername})
    console.log("isUserExits",isUserExits);
    if(isUserExits){
       const databasepassword=isUserExits.password;
               const isPasswordValid= await bcrypt.compare(data.loginPassword,databasepassword);
            //    console.log("valid password" ,isPasswordValid)
               if(isPasswordValid){
                // const token =isUserExits.accesstoken;
                try{
                // const result=jwt.verify(token,process.env.SECURITY_KEY)
                // console.log('result'+JSON.stringify(result));
                // console.log('postData' +JSON.stringify(postdata));
                // console.log("oldData : " + isUserExits)
                const accesstoken=jwt.sign(isUserExits.toJSON(),process.env.SECURITY_KEY,{expiresIn:'10m'});
                // console.log("accessToken : " + accesstoken);
                
                
                const refreshtoken=jwt.sign(isUserExits.toJSON(),process.env.REFRESH_TOKEN,{expiresIn:'1d'});
                    const logindata={
                        accesstoken:accesstoken,
                        refreshtoken:refreshtoken
                    }
                    // console.log("refreshtoken : "+refreshtoken);
                    return res.status(400).json({msg:"login success",status:"success",logindata:logindata})



                }
                catch(error){
                        res.status(400).json({msg:"technical error",error:JSON.stringify(error),status:"failure"})

            }
        }
                
                // if(postdata.length < 0){
                //     return res.json({message:"no posts available" ,status:"Failure"});
                // }
                // const userCreatedPosts = postdata.filter(item=>item.id===result.id)

                // console.log(userCreatedPosts+"userpostes")
                // res.status(200).json({message:"login successful",userdata:result,status:"success",userCreatedPosts:userCreatedPosts})
                // console.log("login successfull");
                // }
                // catch(error){
                //         res.status(400).json({msg:"Session Expired",error:"error"})

                // }
                // // console.log(await result);
                // // console.log("token result"+JSON.stringify(result));
                // // console.log("login successful");
               
               else{
                console.log("login failed");
                return res.status(400).json({message:"login failed due to invalid passworrd",status:"failed"});

               }

    }
    else{
        console.log("user does not exists");
        return res.status(400).json({message:'user does not exist',status:"failed"});
    }
    
    

});
// without database connection

// router.post('/login',async(req,res)=>{
//     const data=req.body;
//     console.log("login data", data);
//     const isUserExits=userdata.filter(user=>user.username===data.loginUsername);
//     console.log("isUserExits",isUserExits[0]);
//     if(isUserExits.length>0){
//        const databasepassword=isUserExits[0].password;
//                const isPasswordValid= await bcrypt.compare(data.loginPassword,databasepassword);
//                console.log("valid password" ,isPasswordValid)
//                if(isPasswordValid){
//                 const token =isUserExits[0].accesstoken;
//                 try{
//                 const result=jwt.verify(token,process.env.SECURITY_KEY)
//                 console.log('result'+JSON.stringify(result));
//                 console.log('postData' +JSON.stringify(postdata));
                
//                 if(postdata.length < 0){
//                     return res.json({message:"no posts available" ,status:"Failure"});
//                 }
//                 const userCreatedPosts = postdata.filter(item=>item.id===result.id)

//                 console.log(userCreatedPosts+"userpostes")
//                 res.status(200).json({message:"login successful",userdata:result,status:"success",userCreatedPosts:userCreatedPosts})
//                 console.log("login successfull");
//                 }
//                 catch(error){
//                         res.status(400).json({msg:"Session Expired",error:JSON.stringify(error)})

//                 }
//                 // console.log(await result);
//                 // console.log("token result"+JSON.stringify(result));
//                 // console.log("login successful");
//                }
//                else{
//                 console.log("login failed");
//                 return res.status(400).json({message:"login failed due to invalid passworrd",status:"failed"});

//                }

//     }
//     else{
//         console.log("user does not exists");
//         return res.status(400).json({message:'user does not exist',status:"failed"});
//     }
    
    

// });
const blacklist=[];
router.post('/logout',(req,res)=>{
    const data=req.body;
    blacklist.push(data.accesstoken);
    return res.status(400).json({message:'logout',status:'success'});
    
});







router.get('/getdata',(req,res)=>{
    res.send('UserID: (req.params.id');
});
module.exports=router;