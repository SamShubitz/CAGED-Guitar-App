import CustomFretboard from "./CustomFretboard";
import { useState } from "react";

const CustomInterface = () => {
  const [chord, setChord] = useState({
    name: "",
    shape: [],
    mutedFrets: [],
    barre: "",
    barreIndicator: "",
  });
  const [progression, setProgression] = useState([]);

  const handleClear = () => {
    setChord({
      name: "",
      shape: [],
      mutedFrets: [],
      barre: "",
      barreIndicator: "",
    });
  };

  const handleSelect = (e) => {
    const nextBarre = e.target.value;
    setChord((prevChord) => ({ ...prevChord, barre: nextBarre }));
  };

  const handleClick = (fretIndex, className, updatedMuteIndex) => {
    setChord((prevChord) => {
      const isMuted = fretIndex < 6 && updatedMuteIndex === 2;
      const newShape =
        className !== "open" && prevChord.shape.includes(fretIndex)
          ? prevChord.shape.filter((index) => index !== fretIndex)
          : [...prevChord.shape, fretIndex];

      const newMutedFrets = isMuted
        ? [...prevChord.mutedFrets, fretIndex]
        : prevChord.mutedFrets.filter((index) => index !== fretIndex);

      return {
        ...prevChord,
        shape: newShape,
        mutedFrets: newMutedFrets,
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProgression((prevProgression) => [...prevProgression, chord]);
    handleClear();
  };

  return (
    <div className="custom-interface">
      <button onClick={handleClear}>Clear</button>
      <label htmlFor="barre-select">Barre:</label>
      <select
        className="barre-select"
        id="barre-select"
        onChange={(e) => handleSelect(e)}
      >
        <option value=""></option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <label className="barre-fret-indicator" htmlFor="fret-indicator-input">
        <input
          className="fret-indicator-input"
          id="fret-indicator-input"
          type="text"
          maxLength={2}
          value={chord.barreIndicator}
          onChange={(e) =>
            setChord({ ...chord, barreIndicator: e.target.value })
          }
        />
        fr
      </label>
      <CustomFretboard
        chord={chord}
        handleClick={handleClick}
        customize={true}
      />
      <div className="chord-name-input">
        <label htmlFor="chord-name">Chord Name: </label>
        <input
          type="text"
          id="chord-name"
          name="chord-name"
          className="chord-name"
          value={chord.name}
          onChange={(e) =>
            setChord((prevChord) => ({ ...prevChord, name: e.target.value }))
          }
        />
      </div>
      <form onSubmit={handleSave}>
        <button type="submit">Save</button>
      </form>
      <ul>
        {progression.map((chord, index) => (
          <li key={index}>
            {chord.name} <CustomFretboard chord={chord} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomInterface;
