import Fretboard from "../Common/Fretboard.tsx";
import { ViewModeProps, ProgressionType } from "../types.ts";
import { useState } from "react";

const ViewModeInterface = ({
  progression,
  setProgression,
  progressionTitle,
  setProgressionTitle,
  viewMode,
  setViewMode,
}: ViewModeProps) => {
  const [progressionList, setProgressionList] = useState<ProgressionType[]>([]);
  const userProgression = progression.map((chord, index) => (
    <li key={index}>
      <div className="custom-chord-diagram">
        <Fretboard chord={chord} />
        {chord.barreIndicator && (
          <p className="barre-fret-indicator">{`${chord.barreIndicator}fr`}</p>
        )}
      </div>
      <p className="view-name-display">{chord.name}</p>
    </li>
  ));

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userProgression = {
      title: progressionTitle,
      progression: [...progression],
    };
    const nextList = [...progressionList, userProgression];
    setProgressionList([...nextList]);

    localStorage.setItem(`CAGED-${progressionTitle}`, JSON.stringify(nextList));

    setProgression([]);
    setProgressionTitle("");
    toggleViewMode();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressionTitle(e.target.value);
  };

  return (
    <div className="view-mode">
      <div className="view-mode-button-section">
        <li onClick={toggleViewMode}>Go back</li>
        <form id="save-progression-form" onSubmit={(e) => handleSubmit(e)}>
          {progression.length !== 0 && (
            <button className="view-mode-button" type="submit">
              Save progression
            </button>
          )}
        </form>
      </div>
      {progression.length !== 0 ? (
        <input
          className="progression-title-input"
          placeholder="Untitled"
          form="save-progression-form"
          maxLength={35}
          required
          onChange={(e) => handleChange(e)}
          value={progressionTitle}
        ></input>
      ) : (
        <p>No chords added yet</p>
      )}
      <ul className="custom-progression">{userProgression}</ul>
    </div>
  );
};

export default ViewModeInterface;
