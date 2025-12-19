import { useState } from "react";

function Div() {
  const [isRed, setIsRed] = useState(true);

  const toggleColor = () => {
    setIsRed(!isRed);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          padding: "20px",
          backgroundColor: isRed ? "red" : "blue",
          color: "white",
          marginBottom: "10px",
        }}
      >
        This div changes color
      </div>

      <button onClick={toggleColor}>Toggle Color</button>
    </div>
  );
}

export default Div;
