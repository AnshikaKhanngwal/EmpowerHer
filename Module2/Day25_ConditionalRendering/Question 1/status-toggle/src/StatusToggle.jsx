import { useState } from "react";

function StatusToggle() {
  const [status, setStatus] = useState(false);

  const toggleStatus = () => {
    setStatus(!status);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={toggleStatus}>Toggle Status</button>

      {status ? (
        <h2>Status is TRUE</h2>
      ) : (
        <h2>Status is FALSE</h2>
      )}
    </div>
  );
}

export default StatusToggle;
