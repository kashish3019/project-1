//sign in details store in signin.json

document.getElementById("sign-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };
    // console.log(user);
    
    fetch("http://localhost:3000/singup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
});