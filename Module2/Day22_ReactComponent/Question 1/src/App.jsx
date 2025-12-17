import React, { useState } from "react";
import FirstComponent from "./FirstComponent";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <FirstComponent/>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
  },
  card: {
    background: "white",
    padding: "20px 30px",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
  },
  text: {
    color: "#555",
    marginBottom: "15px",
  },
  button: {
    background: "#4f46e5",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
