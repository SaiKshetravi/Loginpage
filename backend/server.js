const express=require('express');
const cors = require('cors');

const userRoutes=require('./routes/userroutes');
const app=express();


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



























