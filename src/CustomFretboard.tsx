import CustomFret from "./CustomFret";
import { useState } from "react";

const CustomFretboard = () => {
  const [shape, setShape] = useState([]);

  const handleClick = (index) => {
    setShape((shape) => {
      if (shape.includes(index)) {
        return shape.filter((i) => i !== index);
      } else {
        return [...shape, index];
      }
    });
  };

  const handleClear = () => {
    setShape([]);
  };

  const fretboard = new Array(36).fill(null).map((_, index) => {
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";
    const isFretted = shape.includes(index);
    return (
      <CustomFret
        className={className}
        handleClick={handleClick}
        isFretted={isFretted}
        index={index}
      />
    );
  });

  return (
    <div className="caged-diagram-interface">
      <button>save</button>
      <button onClick={handleClear}>clear</button>
      <div className="fret-board">{fretboard}</div>
    </div>
  );
};

export default CustomFretboard;
