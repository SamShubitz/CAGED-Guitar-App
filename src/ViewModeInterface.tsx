import Fretboard from "./Fretboard";
import { useState } from "react";

const ViewModeInterface = ({
  progression,
  setProgression,
  viewMode,
  setViewMode,
}) => {
  const [progressionTitle, setProgressionTitle] = useState("");
  const userProgression = progression.map((chord, index) => (
    <li key={index}>
      <div className="chord-diagram">
        <Fretboard chord={chord} className="display-fret-board" />
        {chord.barreIndicator && (
          <p className="barre-fret-indicator">{`${chord.barreIndicator}fr`}</p>
        )}
      </div>
      <p className="name-display" style={{ textAlign: "center" }}>
        {chord.name}
      </p>
    </li>
  ));

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userProgression = {
      title: progressionTitle,
      progression: [...progression],
    };
    localStorage.setItem("userProgression", JSON.stringify(userProgression));
    toggleViewMode();
    setProgression([]);
  };

  const handleChange = (e) => {
    setProgressionTitle(e.target.value);
  };

  return (
    <div className="view-mode">
      <div className="view-mode-button-section">
        <li onClick={toggleViewMode}>Go back</li>
        <form id="save-progression-form" onSubmit={(e) => handleSubmit(e)}>
          <button className="save-progression-button" type="submit">
            Save progression
          </button>
        </form>
      </div>
      {progression.length !== 0 ? (
        <input
          className="progression-title-input"
          placeholder="Untitled"
          form="save-progression-form"
          required
          onChange={(e) => handleChange(e)}
          value={progressionTitle}
        ></input>
      ) : (
        <p>No chords added yet</p>
      )}
      <ul>{userProgression}</ul>
    </div>
  );
};

export default ViewModeInterface;
