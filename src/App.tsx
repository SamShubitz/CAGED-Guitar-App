import "./App.css";
import ChordDiagram from "./ChordDiagram";
import ButtonSection from "./ButtonSection";
import RootSelect from "./RootSelect";
import { useState } from "react";

function App() {
  const [currentShape, setCurrentShape] = useState({ name: "", shape: [] });
  const [selectedRoot, setSelectedRoot] = useState("C");

  return (
    <div className="app">
      <RootSelect setSelectedRoot={setSelectedRoot} />
      <p className="button-section-header">Select shape:</p>
      <ButtonSection setCurrentShape={setCurrentShape} />
      <ChordDiagram currentShape={currentShape} selectedRoot={selectedRoot} />
      <p className="name-display">{currentShape.name}</p>
    </div>
  );
}

export default App;
