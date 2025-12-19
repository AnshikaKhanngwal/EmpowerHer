import { useState, useEffect } from "react";

/* ---------- TodoCard Component ---------- */
function TodoCard({ userId, title, completed }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "8px", borderradius:"10px"}}>
      <p><strong>User ID:</strong> {userId}</p>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Status:</strong> {completed ? "Completed" : "Pending"}</p>
    </div>
  );
}

/* ---------- TodosList Component ---------- */
function TodosList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data.slice(0, 15));
      });

    // cleanup function
    return () => {
      alert("cleanup worked");
    };
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          userId={todo.userId}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}

/* ---------- App Component ---------- */
function TodoList() {
  const [showTodos, setShowTodos] = useState(true);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setShowTodos(false)}>
        Unmount Todos
      </button>

      {showTodos && <TodosList />}
    </div>
  );
}

export default  TodoList;
