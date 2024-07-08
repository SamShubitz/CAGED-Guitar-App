import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Fretboard from "../Common/Fretboard.tsx";
import { Chord } from "../types";
import {
  getProgressionByTitle,
  deleteProgression,
} from "../api/uncaged-api.tsx";

const Progression = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userTitle } = useParams();
  const decodedTitle = decodeURIComponent(userTitle ?? "");
  const queryClient = useQueryClient();

  const { data, isPending, error } = useQuery({
    queryKey: ["progressions", userTitle],
    queryFn: () => getProgressionByTitle(decodedTitle),
    enabled: !state,
  });

  const mutation = useMutation({
    mutationFn: (progId: number) => deleteProgression(progId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressions"] });
    },
  });

  const currentProgression = data ? data : state;

  const progressionChords =
    currentProgression &&
    currentProgression.chordList.map((chord: Chord, index: number) => (
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
    ));

  const handleDelete = () => {
    if (data) {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this progression?"
      );
      if (isConfirmed && data) {
        mutation.mutate(data.progressionId);
        navigate("/Progressions");
      }
    }
  };

  if (!state && isPending) {
    return <p className="message">Loading progression...</p>;
  }

  if (error) {
    return (
      <p className="message">Error fetching progression: {error.message}</p>
    );
  }

  return (
    <div className="progressions-page">
      <Link to="/Customize" state={currentProgression}>
        <button className="view-mode-button">Modify progression</button>
      </Link>
      {!state && (
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
