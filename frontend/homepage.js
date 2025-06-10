let postid=localStorage.getItem('postid');
let token = localStorage.getItem('accesstoken');
const handleLogout = async (event) => {
    event.preventDefault();

    
    // const token = localStorage.getItem('accesstoken');

    const response = await fetch('http://localhost:5000/user/logout', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
        
    });

    const result = await response.json();

    console.log(result);

    if (result.status === "success") {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshtoken');
        alert("Logout success");
        window.location.href = "login.html";
    } else {
        alert("Logout failed");
    }
};


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
        allposts();
    }


    // console.log(result);
};


const allposts=async(event)=>{
    const response=await fetch("http://localhost:5000/post/allposts",{
        method:'GET',
        headers:{
            'Content-type': 'application/json',

        }


    });
    const result=await response.json();
    console.log(result);
    const postsArray = result.allposts;
    console.log(postsArray);
   displayPosts(postsArray); 
}

function displayPosts(posts) {
    
  const container = document.getElementById("postContainer");
  container.innerHTML = "";

  posts.forEach(post => {

    const card = document.createElement("div");
    card.className = "post-card";
    card.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.description}</p>
      <small>User ID: ${post.userid}</small>
       <button onclick="likePost('${post._id}')">Like</button>
      <span id="likeCount_${post._id}">${post.Likes.length} Likes</span>
    `;
    
    container.appendChild(card);
  });
}
function handlemyposts(event){
    window.location.href="mypost.html"
}



async function likePost(postid) {
  try {
    const response = await fetch(`http://localhost:5000/post/likepost/${postid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      
    });

    const result = await response.json();
    console.log("result:",result);
    document.getElementById(`likeCount_${postid}`).innerText = `${result.Likes} Likes`;
  } catch (error) {
    console.error("Failed to like post:", error);
  }
}

