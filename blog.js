let data = []

fetch("http://localhost:8090/user"), {
    method: "GET",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data)
    .then((res) => res.json())
    .then((data) =>ui(data))
}
