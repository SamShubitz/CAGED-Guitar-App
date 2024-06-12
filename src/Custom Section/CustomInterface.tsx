import Fretboard from "../Fretboard";
import ViewModeInterface from "../ViewModeInterface";
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
  const [viewMode, setViewMode] = useState(false);

  const displayProgression =
    progression.length >= 12
      ? [...progression.slice(0, 11), { name: "..." }]
      : [...progression];

  const handleClear = () => {
    setChord({
      name: "",
      shape: [],
      mutedFrets: [],
      barre: "",
      barreIndicator: "",
    });
  };

  const handleChordClear = () => {
    setProgression([...progression.slice(0, progression.length - 1)]);
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

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProgression((prevProgression) => [...prevProgression, chord]);
    handleClear();
  };

  return (
    <div className="caged-diagram-interface">
      {!viewMode ? (
        <>
          <div className="custom-chord-diagram">
            <div className="chord-list-container">
              {progression.length !== 0 && (
                <p className="chord-list-header">Chord List</p>
              )}
              <ul className="chord-name-list">
                {displayProgression.map((chord, index) => (
                  <li key={index}>{chord.name}</li>
                ))}
              </ul>
            </div>
            <div className="custom-button-section">
              <button className="custom-button view" onClick={toggleViewMode}>
                View progression
              </button>
              <form id="save-form" className="save-form" onSubmit={handleSave}>
                <button className="custom-button save" type="submit">
                  Save chord
                </button>
              </form>
              <button
                className="custom-button remove"
                onClick={handleChordClear}
              >
                Remove chord
              </button>
            </div>
            <div className="custom-fretboard">
              <Fretboard
                chord={chord}
                handleClick={handleClick}
                customize={true}
              />
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
              <button className="clear-button" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
          <form className="chord-name-input">
            <label htmlFor="chord-name">Chord Name: </label>
            <input
              type="text"
              id="chord-name"
              name="chord-name"
              className="chord-name"
              maxLength={9}
              required
              form="save-form"
              value={chord.name}
              onChange={(e) =>
                setChord((prevChord) => ({
                  ...prevChord,
                  name: e.target.value,
                }))
              }
            />
          </form>
        </>
      ) : (
        <ViewModeInterface
          progression={progression}
          setProgression={setProgression}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
    </div>
  );
};

export default CustomInterface;
