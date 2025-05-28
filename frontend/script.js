 const myobj={};
const sinputs=(event)=>
{
    myobj[event.target.id]=event.target.value;
    console.log(myobj);
}

const signup=async(event)=>{
    event.preventDefault();
    
    console.log(myobj);

    const response = await fetch ('http://localhost:5000/user/signup',{
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(myobj)
});
console.log( await response.json().id)
 

}

myobj2={};
const linputs=(event)=>{
    myobj2[event.target.id]=event.target.value;
    console.log(myobj2);
}
 
const login=async(event)=>{
    event.preventDefault();
    console.log(myobj2);
    
    const response=await fetch ('http://localhost:5000/user/userdata',{
        method : 'GET',
        headers : {"Content-type" : "application/json"},
});
console.log( await response.json());
}