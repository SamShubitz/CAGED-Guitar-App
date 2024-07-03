import Fretboard from "../Common/Fretboard.tsx";
import { ViewModeProps } from "../types.ts";

const ViewModeInterface = ({
  chordList,
  setChordList,
  progressionTitle,
  setProgressionTitle,
  viewMode,
  setViewMode,
}: ViewModeProps) => {
  const userProgression = chordList.map((chord, index) => (
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
      chordList: [...chordList],
    };

    localStorage.setItem(
      `CAGED-${userProgression.title}`,
      JSON.stringify(userProgression)
    );

    setChordList([]);
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
          {chordList.length !== 0 && (
            <button className="view-mode-button" type="submit">
              Save progression
            </button>
          )}
        </form>
      </div>
      {chordList.length !== 0 ? (
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
