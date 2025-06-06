const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
    type:String,
    required:true
    },
    id:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accesstoken:{
        type:String,
        required:true
    }
})
const usermodel=new mongoose.model('User',userSchema);
module.exports=usermodel 