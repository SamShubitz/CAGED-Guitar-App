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
      <ButtonSection setCurrentShape={setCurrentShape} />
      <ChordDiagram currentShape={currentShape} selectedRoot={selectedRoot} />
    </div>
  );
}

export default App;
