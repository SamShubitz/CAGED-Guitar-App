import RootSelect from "./RootSelect";
import ButtonSection from "./ButtonSection";
import ChordDiagram from "./ChordDiagram";
import { useState } from "react";

const CAGEDInterface = () => {
  const [currentShape, setCurrentShape] = useState({ name: "", shape: [] });
  const [selectedRoot, setSelectedRoot] = useState("C");

  return (
    <div className="caged-diagram-interface">
      <RootSelect setSelectedRoot={setSelectedRoot} />
      <p className="button-section-header">Select a shape:</p>
      <ButtonSection setCurrentShape={setCurrentShape} />
      <ChordDiagram currentShape={currentShape} selectedRoot={selectedRoot} />
      <p className="name-display">
        {currentShape.shape.length ? currentShape.name : ""}
      </p>
    </div>
  );
};

export default CAGEDInterface;
