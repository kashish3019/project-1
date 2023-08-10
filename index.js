

//sign in details store in signin.json


document.getElementById("sign-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    console.log(user);
    
    fetch("http://localhost:3000/singup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
});


//counter for like and dislike

// let count = localStorage.getItem('Count') || 0;
// document.getElementById("count").innerHTML = count;
// document.getElementById("icon").addEventListener("click", () => {
//     alert("Count")
//     count++;
//     document.getElementById("count").innerHTML = count;
//     console.log(count);
//     localStorage.setItem('Count', count);
// });

// let count2 = sessionStorage.getItem('Count2') || 0;
// document.getElementById("count2").innerHTML = count2;
// document.getElementById("icon2").addEventListener("click", () => {
//     count2++;
//     document.getElementById("count2").innerHTML = count2;
//     console.log(count2);
//     sessionStorage.setItem('Count2', count2);
// });


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('blog.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Handle POST requests to increase likes
server.post('/posts/:id/like', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = router.db.get('posts').find({ id: postId }).value();
  
  if (post) {
    post.likes++;
    router.db.get('posts').find({ id: postId }).assign(post).write();
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Handle POST requests to increase dislikes
server.post('/posts/:id/dislike', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = router.db.get('posts').find({ id: postId }).value();
  
  if (post) {
    post.dislikes++;
    router.db.get('posts').find({ id: postId }).assign(post).write();
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

server.use(router);

const PORT = 3001; // You can change this port if needed
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});


async function handleLike(postId) {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, { method: 'POST' });
    const updatedPost = await response.json();
    const likeCount = document.querySelector(`#count${postId}`);
    likeCount.textContent = updatedPost.likes;
  }
  
  async function handleDislike(postId) {
    const response = await fetch(`http://localhost:3001/posts/${postId}/dislike`, { method: 'POST' });
    const updatedPost = await response.json();
    const dislikeCount = document.querySelector(`#count2${postId}`);
    dislikeCount.textContent = updatedPost.dislikes;
  }
  