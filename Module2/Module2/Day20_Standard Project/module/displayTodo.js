export function displayTodos(data) {
    let container = document.getElementById("todos-container");
    container.innerHTML = "";

    data.forEach(todo => {
        let div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.margin = "10px";
        div.innerHTML = `
            <h4>${todo.title}</h4>
            <p>Status: ${todo.completed ? "✔️ Completed" : "❌ Pending"}</p>
        `;
        container.appendChild(div);
    });
}
