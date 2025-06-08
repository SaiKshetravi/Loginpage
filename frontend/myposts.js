
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
    }
    else{
        myposts();

    }
}

    const myposts=async(event)=>{
        const response=await fetch("http://localhost:5000/post/loginuserposts",{
            method:'GET',
            headers:{
                'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`  
            }
        })
        const result=await response.json();
        console.log(result);
        
        const posts=result.posts;
        console.log(posts);
        displayPosts(posts)
    }

    function displayPosts(post) {
  const container = document.getElementById("postContainer");
  container.innerHTML = "";

  post.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <small>User ID: ${post.userid}</small>
      <button onclick="handleDeletePost('${post._id}')" >Delete</button>
      <button onclick="handleeditpost('${post._id}')">Edit</button>
    `;
    container.appendChild(card);
  });
}

const handleDeletePost = async(id)=>{
    console.log("Delete Clicked" )
    console.log("post Id : "+ id)
    let postId = id;

    const response = await fetch(`http://localhost:5000/post/deletepost/${postId}`,{
         method:'DELETE',
        headers:{
                'Content-type': 'application/json',
        
            }
    })

    const result = await response.json();
    console.log(result);

    if(result.status=='success'){
        alert(`Post Deleted Successfully! with Title : ${result.title}`)
        location.reload();
    }
    else{
        alert(`Failed to delete Post`);

    }


}
const handleeditpost=(postid)=>{
    localStorage.setItem('postid',postid)
    window.location.href="editpost.html";
    console.log("postid",postid);

}