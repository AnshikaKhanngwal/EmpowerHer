fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("todos", JSON.stringify(data.slice(0, 20)));
    showTodos();
  })
  .catch(err => console.log(err));


function showTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const list = document.getElementById("list");
  const emptyMsg = document.getElementById("empty");

  list.innerHTML = ""; 

  if (todos.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
      <span class="title">${todo.title}</span>
      <span class="status">${todo.completed ? " Completed" : " Not Completed"}</span>
      <button class="toggleBtn">Toggle</button>
      <button class="deleteBtn">Delete</button>
    `;

  
    li.querySelector(".toggleBtn").addEventListener("click", () => {
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos(); 
    });

 
    li.querySelector(".deleteBtn").addEventListener("click", () => {
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      showTodos();
    });

    list.appendChild(li);
  });
}
