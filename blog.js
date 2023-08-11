
let pull = () => {
    let val = document.querySelector("#val").val
    fetch(`http://localhost:8090/blog?category=${val}`)
        .then((found) => found.json())
        .then((data) => {
            data.filter((ele) => {
                ele.category.toLowercase().includes(val.toLowercase())
                output(data)
            })
        })
}
document.querySelector("#found").addEventListener("click", pull)
document.querySelector("#val").addEventListener("input", (e) => {
    pull()
})

fetch("http://localhost:8090/user")
    .then((found) => found.json())
    .then((data) => output(data));


