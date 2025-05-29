 const myobj={};
const sinputs=(event)=>
{
    myobj[event.target.id]=event.target.value;
    console.log(myobj);
}

const signup=async(event)=>{
    event.preventDefault();

    const response = await fetch ('http://localhost:5000/user/signup',{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(myobj)
});
const result =  await response.json();
console.log(response);
console.log(result.message)
if(result.status === "success"){
    alert("signup success");
}
else{
    alert("signupfailed");
}
 

}

myobj2={};
const linputs=(event)=>{
    myobj2[event.target.id]=event.target.value;
    console.log(myobj2);
}
 
const login=async(event)=>{
    event.preventDefault();

    
    const response=await fetch ('http://localhost:5000/user/login',{
        method : 'POST',
        headers : {"Content-type" : "application/json"},
        body :  JSON.stringify(myobj2)
});
// console.log(response);

const result = await response.json();

console.log( result);
if(result.status === "success"){
    alert("login success");
}
else{
    alert("login failed");
}


}