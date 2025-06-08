let postid=localStorage.getItem('postid')
let token = localStorage.getItem('accesstoken');
const validatetoken=async (event)=>{
    const response = await fetch("http://localhost:5000/verify/verifytoken",{
        method:'POST',
        headers:{
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`  

    }})
    const result = await response.json();
    if(result.status=="failed"){
        alert("Session expired! please login again")
        window.location.href="login.html";
    }else{
        
    }
}

const editpost=async()
