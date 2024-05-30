import "./App.css";
import { useState } from "react";
import ChordDiagram from "./ChordDiagram";

function App() {
  const [currentChord, setCurrentChord] = useState([]);
  const chords = {
    C: [4, 8, 13],
    A: [8, 9, 10],
    G: [7, 12, 17],
    E: [3, 7, 8],
    D: [9, 11, 16],
  };

  const handleClick = (e) => {
    setCurrentChord(chords[e.target.value]);
  };

  return (
    <div className="app">
      <button onClick={handleClick} value="C">
        C
      </button>
      <button onClick={handleClick} value="A">
        A
      </button>
      <button onClick={handleClick} value="G">
        G
      </button>
      <button onClick={handleClick} value="E">
        E
      </button>
      <button onClick={handleClick} value="D">
        D
      </button>
      <ChordDiagram currentChord={currentChord} />
    </div>
  );
}

export default App;
