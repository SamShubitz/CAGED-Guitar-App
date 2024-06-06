import Fretboard from "../Fretboard";
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
      <p
        style={{
          fontSize: ".85rem",
          fontWeight: "bolder",
          marginBottom: "1.5rem",
        }}
      >
        CUSTOMIZE
      </p>
      <div className="custom-button-section">
        <form className="save-form" onSubmit={handleSave}>
          <button type="submit">Add chord</button>
        </form>
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div className="custom-chord-diagram">
        <div className="custom-fretboard">
          <Fretboard chord={chord} handleClick={handleClick} customize={true} />
        </div>
        <div className="diagram-controls">
          <label
            className="barre-fret-indicator"
            htmlFor="fret-indicator-input"
          >
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
          <label htmlFor="barre-select">
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
            <p className="barre-select-text">Barre</p>
          </label>
        </div>
      </div>
      <div className="chord-name-input">
        <label htmlFor="chord-name">Chord Name: </label>
        <input
          type="text"
          id="chord-name"
          name="chord-name"
          className="chord-name"
          required
          value={chord.name}
          onChange={(e) =>
            setChord((prevChord) => ({ ...prevChord, name: e.target.value }))
          }
        />
      </div>
      <ul>
        {progression.map((chord, index) => (
          <li key={index}>{chord.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomInterface;
