import CustomFretboard from "./CustomFretboard";
import Fretboard from "../Caged Section/Fretboard";
import { useState } from "react";

const CustomInterface = () => {
  const [shape, setShape] = useState([]);
  const [chordName, setChordName] = useState("");
  const [progression, setProgression] = useState([]);

  const handleClear = () => {
    setShape([]);
  };

  const handleClick = (fretIndex, className) => {
    setShape((shape) => {
      if (className !== "open" && shape.includes(fretIndex)) {
        return shape.filter((index) => index !== fretIndex);
      } else {
        return [...shape, fretIndex];
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newChord = { name: chordName, shape: shape };
    setProgression([...progression, newChord]);
  };

  return (
    <div className="custom-interface">
      <div className="button-section">
        <form onSubmit={handleSave}>
          <button type="submit">Save</button>
        </form>
        <button onClick={handleClear}>Clear</button>
      </div>
      <CustomFretboard shape={shape} handleClick={handleClick} />
      <div className="chord-name-input">
        <label htmlFor="chord-name">Chord Name: </label>
        <input
          type="text"
          id="chord-name"
          name="chord-name"
          className="chord-name"
          onChange={(e) => setChordName(e.target.value)}
        />
      </div>
      <ul>
        {progression.map((chord, index) => (
          <li key={index}>
            {chord.name}: <Fretboard finalShape={chord.shape} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomInterface;
