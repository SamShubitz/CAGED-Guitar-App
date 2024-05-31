import "./App.css";
import ChordDiagram from "./ChordDiagram";
import ButtonSection from "./ButtonSection";
import RootSelect from "./RootSelect";
import { useState } from "react";

function App() {
  const [currentShape, setCurrentShape] = useState({ name: "", shape: [] });
  const [selectedRoot, setSelectedRoot] = useState("");

  return (
    <div className="app">
      <ButtonSection setCurrentShape={setCurrentShape} />
      <RootSelect setSelectedRoot={setSelectedRoot} />
      <ChordDiagram
        currentShape={currentShape}
        setCurrentShape={setCurrentShape}
        selectedRoot={selectedRoot}
      />
    </div>
  );
}

export default App;
