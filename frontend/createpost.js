
let token =localStorage.getItem("accesstoken")
const myobjs={};
const handleTitleinput=(event)=>
{
    
    myobjs[event.target.id]=event.target.value;
    console.log(myobjs);
}
const handleCreatepost=async(event)=>{
    event.preventDefault();
    const accesstoken=localStorage.getItem('accesstoken');
    myobjs.accesstoken=accesstoken

    const response=await fetch("http://localhost:5000/post/createpost",{
        method : 'POST',
        headers : {
            "Content-type" : "application/json",


        },
        body : JSON.stringify(myobjs)


    });
    const result= await response.json();
    if(result.status == 'success'){
        alert("Post created Successfully")
    }else{
        alert("post creation failed! Try again");
    }

}

const validatetoken=async (event)=>{
    const response = await fetch("http://localhost:5000/verify/verifytoken",{
        method:'POST',
        headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`  

    }})
    const result = await response.json();
    if(result.status=="failed"){
        alert("session expired! please login again")
        window.location.href="login.html";
    }
    

    // console.log(result);
};