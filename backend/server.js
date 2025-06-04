const express=require('express');
const cors = require('cors');

const userRoutes=require('./routes/userroutes');
const mongoose =require('mongoose');
const app=express();

const db = mongoose.connect("mongodb+srv://addetlasaikshetravi:Sai3101@cluster0.ctnhkkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const PORT=5000;
const path = require('path');









// app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());






app.use(cors());
app.use('/user',userRoutes);
















// app.use(express.static('frontend'));

app.post('/',(req,res)=>{
    const data=req.body;
    console.log(data);
    res.send('helloworld');
  

});
app.listen(PORT,()=>{
    console.log('server is running ' + PORT);
});





































