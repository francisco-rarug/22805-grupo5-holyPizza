const users = [
    { username: "LioMessi", password: "1234" },
    { username: "DibuMartinez", password: "1234" },
    { username: "FideoDiMaria", password: "1234" }
];

function validateLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        window.location.href = "/index.html";
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.textContent = "Credenciales incorrectas";
        errorMessage.style.display = "block";
    }
}


document.getElementById("formlogin").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        validateLogin();
    }
});