import { useEffect, useState } from "react";
import "./Todos.css";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data.slice(0, 10)));
  }, []);

  return (
    <div className="todo-container">
      {todos.map((todo) => (
        <div key={todo.id} className="todo-card">
          <h4>{todo.title}</h4>
          <p>
            Status:{" "}
            <span className={todo.completed ? "completed" : "pending"}>
              {todo.completed ? "Completed" : "Not Completed"}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Todos;
