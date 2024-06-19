import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fretboard from "../Common/Fretboard.tsx";
import { ProgressionType } from "../types.ts";

const Progression = () => {
  const [currentProgression, setCurrentProgression] = useState<
    ProgressionType[]
  >([]);
  const navigate = useNavigate();
  const { userTitle } = useParams();
  const keyPrefix = "CAGED-";
  const decodedTitle = decodeURIComponent(`${keyPrefix}${userTitle}` ?? "");
  console.log(decodedTitle);

  useEffect(() => {
    const unparsedProgression = localStorage.getItem(decodedTitle);
    if (unparsedProgression) {
      const userProgression = JSON.parse(unparsedProgression);
      setCurrentProgression(userProgression);
    }
  }, [userTitle]);

  const handleDelete = () => {
    if (currentProgression.length !== 0) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this progression?"
      );
      if (isConfirmed) {
        const key = currentProgression[0].title;
        localStorage.removeItem(key);
        setCurrentProgression([]);
        navigate("/Progressions");
      }
    }
  };

  const progressionTitle = currentProgression.map((progression, index) => (
    <li key={index}>{progression.title}</li>
  ));

  const progressionChords = currentProgression.map((progression) =>
    progression.progression.map((chord, index) => (
      <li key={index}>
        <div className="chord-diagram">
          <Fretboard chord={chord} />
          {chord.barreIndicator && (
            <p className="barre-fret-indicator">{`${chord.barreIndicator}fr`}</p>
          )}
        </div>
        <p className="progression-name-display" style={{ marginRight: "1rem" }}>
          {chord.name}
        </p>
      </li>
    ))
  );

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
      <h1 className="progression-title">{progressionTitle}</h1>
      <div className="view-mode">
        <ul>{progressionChords}</ul>
      </div>
    </div>
  );
};

export default Progression;
