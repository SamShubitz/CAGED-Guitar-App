import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Fretboard from "./Fretboard";

const Progression = () => {
  const [progression, setProgression] = useState([]);
  const { userTitle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const unparsedProgression = localStorage.getItem(userTitle);
    const userProgression = JSON.parse(unparsedProgression);
    userProgression && setProgression(userProgression);
  }, []);

  const handleDelete = () => {
    const key = progression[0].title;
    localStorage.removeItem(key);
    setProgression([]);
  };

  const progressionTitle = progression.map((progression, index) => (
    <li key={index}>
      <h1>{progression.title}</h1>
    </li>
  ));

  const progressionChords = progression.map((userProgression) =>
    userProgression.progression.map((chord, index) => (
      <li key={index}>
        <div className="chord-diagram">
          <Fretboard chord={chord} />
          {chord.barreIndicator && (
            <p className="barre-fret-indicator">{`${chord.barreIndicator}fr`}</p>
          )}
        </div>
        <p className="name-display" style={{ textAlign: "center" }}>
          {chord.name}
        </p>
      </li>
    ))
  );

  return (
    <div className="progressions-page">
      <button className="view-mode-button" onClick={() => navigate(-1)}>
        Go back
      </button>
      <button className="view-mode-button" onClick={handleDelete}>
        Delete progression
      </button>
      <ul style={{ marginTop: "3rem" }}>{progressionTitle}</ul>
      <div className="view-mode">
        <ul>{progressionChords}</ul>
      </div>
    </div>
  );
};

export default Progression;
