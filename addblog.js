document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    
    let type = document.getElementById("value").value;
    let user = {
        image: document.getElementById("image").value,
        title: document.getElementById("title").value,
        message: document.getElementById("message").value
    };
    if (type === "submit") {
        fetch("http://localhost:8090/user", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("image").value = "";
                document.getElementById("title").value = "";
                document.getElementById("message").value = "";
            });
    }
    else {
        fetch("http://localhost:8090/user/" + id, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(() => {
                fetch("http://localhost:8090/user")
                    .then((response) => response.json())
                    .then((response) => ui(response));
                })
            }
            
         window.location.href="./blog.html";
        });
        
const ui = (data) => {
    document.getElementById("ui").innerHTML = "";
    data.map((ele) => {
        let image = document.createElement("img");
        image.src = ele.image;

        let title = document.createElement("h2");
        title.innerHTML = ele.title;
        
        let message = document.createElement("p");
        message.innerHTML = ele.message;

        let btn1 = document.createElement("button")
        btn1.innerHTML = "delete"
        btn1.addEventListener("click", () => {
            fetch(`http://localhost:8090/user/${ele.id}`, {
                method: "DELETE",
            })
                .then(() => {
                    fetch("http://localhost:8090/user")
                        .then((response) => response.json())
                        .then((response) => ui(response));
                });
        })
        let btnLike = document.createElement("button");
        const likeKey = `like-count-${ele.id}`;
        let likes = parseInt(localStorage.getItem(likeKey)) || (ele.likes || 0);
        btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Like (${likes})`;
        btnLike.addEventListener("click", () => {
            fetch(`http://localhost:8090/user/like/${ele.id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
            })
                .then(() => {
                    likes++;
                    localStorage.setItem(likeKey, likes);
                    btnLike.innerHTML = `<i class="fas fa-thumbs-up"></i> Like (${likes})`;
                })
        });
        let container = document.createElement("div");
        container.append(image, title, message, btn1, btnLike);
        document.getElementById("ui").append(container);
    });
};
fetch("http://localhost:8090/user")
    .then((response) => response.json())
    .then((response) => ui(response))

