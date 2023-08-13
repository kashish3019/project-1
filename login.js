let storedData = JSON.parse(localStorage.getItem("datas")) || [];

document.getElementById("log-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let useremail = document.getElementById("username").value;
    let userpass = document.getElementById("password").value;

    let emailcheck = /^[A-Za-z0-9]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    let passwordcheck = /^(?=.*[A-Z]{1})(?=.*[0-9])(?=.*[!@#$%^&*=-])[a-zA-Z0-9!@#$%^&*=-]{8,16}$/;

    // Conditions
    if (emailcheck.test(useremail)) {
        document.getElementById("useremailalert").innerHTML = "";
    } else {
        document.getElementById("useremailalert").innerHTML = "Invalid Email!!";
    }
 
    if (passwordcheck.test(userpass)) {
        document.getElementById("userpassalert").innerHTML = "";
    } else {
        document.getElementById("userpassalert").innerHTML = "Invalid password!!";
    }

    fetch(`http://localhost:8090/singup?email=${useremail}`)
    .then((response) => response.json())
    .then((fetchedData) => {
        console.log(fetchedData);
        if (fetchedData.length > 0) {
            let userFound = false;
            for (let i = 0; i < fetchedData.length; i++) {
                if (fetchedData[i].email === useremail && fetchedData[i].password === userpass) {
                    userFound = true;
                    alert("Successfully logged in");
                    window.location.href = "index.html";
                    break;
                }
            }
            if (!userFound) {
                document.getElementById("useremailalert").innerHTML = "Invalid Email";
                document.getElementById("userpassalert").innerHTML = "Invalid Password";
            } else {
                // Clear the error messages when a successful login is detected
                document.getElementById("useremailalert").innerHTML = "";
                document.getElementById("userpassalert").innerHTML = "";
            }
        } else {
            document.getElementById("useremailalert").innerHTML = "User Not Exist";
        }
    });

});

let fetchData = async () => {
    fetch("http://localhost:8090/singup")
        .then((response) => response.json())
        .then((fetchedData) => console.log(fetchedData));
};
fetchData();
