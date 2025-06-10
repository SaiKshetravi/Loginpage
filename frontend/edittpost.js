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
        editpost();
    }
}

const editpost=async()=>{
    const response=await fetch(`http://localhost:5000/post/postdata/${postid}`,{
        method:'GET',
        headers:{
            'Content-type': 'application/json'

        }
    })
    const result=await response.json();
    const posts=result.postdata;
    console.log("postdata",posts);
     document.getElementById('title').value = posts.title;
    document.getElementById('description').value = posts.description;
}


const updatepost=async()=>{
  event.preventDefault(); 

  const updatedTitle = document.getElementById('title').value;
  const updatedDescription = document.getElementById('description').value;

  try {
    const response = await fetch(`http://localhost:5000/post/updatepost/${postid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
    
      },
      body: JSON.stringify({
        title: updatedTitle,
        description: updatedDescription
      })
    });

    const result = await response.json();
    console.log("result:",result);

    if (response.ok) {
      alert("Post updated successfully!");
      window.location.href = "homepage.html"; 
    } else {
      alert("Failed to update post: " + result.message);
    }

  } catch (error) {
    console.error("Error updating post:", error);
    alert("Something went wrong while updating the post.");
  }
}