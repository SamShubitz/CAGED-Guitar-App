import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fretboard from "./Fretboard";

const Progression = () => {
  const [currentProgression, setCurrentProgression] = useState([]);
  const navigate = useNavigate();
  const { userTitle } = useParams();
  const decodedTitle = decodeURIComponent(userTitle);

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
    <li key={index}>
      <h1>{progression.title}</h1>
    </li>
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
        <p className="progression-name-display">{chord.name}</p>
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
      <ul style={{ marginTop: "3rem" }}>{progressionTitle}</ul>
      <div className="view-mode">
        <ul>{progressionChords}</ul>
      </div>
    </div>
  );
};

export default Progression;
