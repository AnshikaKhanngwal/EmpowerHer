import { navbar } from "../components/navbar.js";
import { footer } from "../components/footer.js";

document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();

document.getElementById("login-btn").addEventListener("click", () => {
    let savedUser = JSON.parse(localStorage.getItem("user"));

    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (savedUser && savedUser.email === email && savedUser.password === pass) {
        alert("Login Successful!");
        localStorage.setItem("loggedIn", true);
        window.location.href = "todos.html";
    } else {
        alert("Invalid Credentials");
    }
});
