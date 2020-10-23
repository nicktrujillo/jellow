import React from "react";
import { Board } from "./features/board/Board";
import "./App.css";
import { selectColumns } from "./features/board/boardSlice";

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
