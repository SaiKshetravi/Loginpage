const mongoose=require("mongoose");
const postSchema=new mongoose.Schema({
    userid:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Likes:{
        type:[],
        required:false
    },
    createdAt: {
  type: Date,
  default: Date.now
}
})
const postmodel=new mongoose.model('post',postSchema);
module.exports=postmodel 
