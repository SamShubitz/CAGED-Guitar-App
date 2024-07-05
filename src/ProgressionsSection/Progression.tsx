import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Fretboard from "../Common/Fretboard.tsx";
import { Chord, ProgressionType } from "../types";
import { getProgressionByTitle } from "../uncaged-api";

const Progression = () => {
  const { userTitle } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(userTitle ?? "");
  const { data, isPending, error } = useQuery({
    queryKey: ["progressions", userTitle],
    queryFn: () => getProgressionByTitle(decodedTitle),
  });

  /*
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


*/
  const currentProgression = data
    ? data.find((p: ProgressionType) => p.title === userTitle) || state
    : state;

  const progressionChords = currentProgression
    ? currentProgression.chordList.map((chord: Chord, index: number) => (
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

  if (isPending) {
    return <div>Loading progression...</div>;
  }

  if (error) {
    return <div>Error fetching progression: {error.message}</div>;
  }

  return (
    <div className="progressions-page">
      <Link to="/Customize" state={currentProgression}>
        <button className="view-mode-button">Modify progression</button>
      </Link>
      {userTitle && (
        <button className="view-mode-button" /*onClick={handleDelete}*/>
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
