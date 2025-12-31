import React from "react";

const HeavyComponent = () => {
  console.log("🔥 HeavyComponent rendered");

  // Simulate heavy UI
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
      <h3>Heavy Component</h3>
      <p>This component should render only once.</p>
    </div>
  );
};

// Prevent re-render if props do not change
export default React.memo(HeavyComponent);
