import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col bg-background">
        <button
          className="text-foreground"
          onClick={() => setCount((count) => count + 1)}
        >
          up
        </button>
        <button
          className="bg-red-100 hover:bg-red-300"
          onClick={() => setCount((count) => count - 1)}
        >
          down
        </button>
        <p>{count}</p>
      </div>
    </>
  );
}

export default App;
