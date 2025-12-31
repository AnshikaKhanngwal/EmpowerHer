import React, { useState, lazy, Suspense } from "react";

// Lazy load the heavy component
const HeavyComponent = lazy(() => import("./HeavyComponent"));

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React.memo & Lazy Loading Demo</h1>

      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment Counter
      </button>

      <hr />

      <Suspense fallback={<p>Loading Heavy Component...</p>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};

export default App;
