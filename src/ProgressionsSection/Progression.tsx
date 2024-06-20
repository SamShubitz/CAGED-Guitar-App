import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fretboard from "../Common/Fretboard.tsx";
import { ProgressionType } from "../types.ts";

const Progression = () => {
  const [currentProgression, setCurrentProgression] = useState<ProgressionType>(
    { title: "", progression: [] }
  );
  const navigate = useNavigate();
  const { userTitle } = useParams();
  const keyPrefix = "CAGED-";
  const decodedTitle = decodeURIComponent(`${keyPrefix}${userTitle}` ?? "");

  useEffect(() => {
    const unparsedProgression = localStorage.getItem(decodedTitle);
    if (unparsedProgression) {
      const userProgression = JSON.parse(unparsedProgression);
      setCurrentProgression(userProgression);
    }
  }, [userTitle]);

  const handleDelete = () => {
    if (currentProgression) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this progression?"
      );
      if (isConfirmed) {
        const key = `${keyPrefix}${currentProgression.title}`;
        localStorage.removeItem(key);
        setCurrentProgression({ title: "", progression: [] });
        navigate("/Progressions");
      }
    }
  };

  const progressionChords =
    currentProgression.progression.length !== 0
      ? currentProgression.progression.map((chord, index) => (
          <li key={index}>
            <div className="chord-diagram">
              <Fretboard chord={chord} />
              {chord.barreIndicator && (
                <p className="barre-fret-indicator">{`${chord.barreIndicator}fr`}</p>
              )}
            </div>
            <p
              className="progression-name-display"
              style={{ marginRight: "1rem" }}
            >
              {chord.name}
            </p>
          </li>
        ))
      : [];

  return (
    <div className="progressions-page">
      <Link to="/Customize" state={currentProgression}>
        <button className="view-mode-button">Modify progression</button>
      </Link>
      {userTitle && (
        <button className="view-mode-button" onClick={handleDelete}>
          Delete progression
        </button>
      )}
      {currentProgression && (
        <>
          <h1 className="progression-title">{currentProgression.title}</h1>
          <div className="view-mode">
            <ul>{progressionChords}</ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Progression;
