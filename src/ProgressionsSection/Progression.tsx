import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Fretboard from "../Common/Fretboard.tsx";
import { ProgressionType } from "../types.ts";
import { getProgressionByTitle } from "../uncaged-api";

const Progression = () => {
  const [currentProgression, setCurrentProgression] = useState<ProgressionType>(
    { title: "", chordList: [] }
  );
  const navigate = useNavigate();
  const { encodedUserTitle } = useParams();
  const userTitle = decodeURIComponent(encodedUserTitle ?? "");

  useEffect(() => {
    const getProgression = async () => {
      try {
        const progression = await getProgressionByTitle(userTitle);
        setCurrentProgression(progression[0]);
      } catch (error) {
        console.error(error);
      }
    };
    getProgression();
  }, [userTitle]);

  const handleDelete = () => {
    if (currentProgression) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this progression?"
      );
      if (isConfirmed) {
        setCurrentProgression({ title: "", chordList: [] });
        navigate("/Progressions");
      }
    }
  };

  const progressionChords =
    currentProgression.chordList.length !== 0
      ? currentProgression.chordList.map((chord, index) => (
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
