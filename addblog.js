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
    data.forEach((item) => {
        let image = document.createElement("img");
        image.src = item.image;

        let title = document.createElement("h2");
        title.innerHTML = item.title;
        
        let message = document.createElement("p");
        message.innerHTML = item.message;

        let btn1 = document.createElement("button")
        btn1.innerHTML = "delete"
        btn1.addEventListener("click", () => {
            fetch(`http://localhost:8090/user/${item.id}`, {
                method: "DELETE",
            })
                .then(() => {
                    fetch("http://localhost:8090/user")
                        .then((response) => response.json())
                        .then((response) => ui(response));
                });
        })
        let btn2 = document.createElement("button")
        btn2.innerHTML = "update"

        btn2.addEventListener("click", () => {
            document.getElementById("image").value = item.image
            document.getElementById("title").value = item.title
            document.getElementById("message").value = item.message
            document.getElementById("value").value = "update"
            id = item.id;
        })
        let container = document.createElement("div");
        container.append(image, title, message);
        document.getElementById("ui").append(container);
    });
};
fetch("http://localhost:8090/user")
    .then((response) => response.json())
    .then((response) => ui(response))

