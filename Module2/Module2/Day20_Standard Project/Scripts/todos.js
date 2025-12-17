import { navbar } from "../components/navbar.js";
import { footer } from "../components/footer.js";
import { displayTodos } from "../modules/displayTodos.js";

document.getElementById("navbar").innerHTML = navbar();
document.getElementById("footer").innerHTML = footer();

// Protect route
if (!localStorage.getItem("loggedIn")) {
    alert("Please login first!");
    window.location.href = "login.html";
}

async function fetchTodos() {
    let res = await fetch("https://jsonplaceholder.typicode.com/todos");
    let data = await res.json();
    displayTodos(data.slice(0, 20)); // Display first 20
}

fetchTodos();
