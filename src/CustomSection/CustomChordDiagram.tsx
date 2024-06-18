import Fretboard from "../Common/Fretboard.tsx";
import { CustomDiagramProps } from "../types.ts";

const CustomChordDiagram = ({
  chord,
  setChord,
  progression,
  progressionTitle,
  displayProgression,
  toggleViewMode,
  handleSave,
  handleSelect,
  handleChordClear,
  handleClear,
  handleClick,
}: CustomDiagramProps) => {
  return (
    <>
      <div className="chord-list-container">
        <p className="chord-list-header">Chord List</p>
        {progression.length !== 0 ? (
          <ul className="chord-name-list">
            {displayProgression.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-text">Empty</p>
        )}
      </div>
      <h1 className="working-progression-title">
        {progressionTitle ? progressionTitle : "Untitled"}
      </h1>
      <div className="customize-chord-diagram">
        <div className="custom-button-section">
          <button className="custom-button view" onClick={toggleViewMode}>
            View progression
          </button>
          <button className="custom-button remove" onClick={handleChordClear}>
            Remove chord
          </button>
          <form id="save-form" className="save-form" onSubmit={handleSave}>
            <button className="custom-button add" type="submit">
              Add chord
            </button>
          </form>
        </div>
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
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
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
            setChord({
              ...chord,
              name: e.target.value,
            })
          }
        />
      </form>
    </>
  );
};

export default CustomChordDiagram;
