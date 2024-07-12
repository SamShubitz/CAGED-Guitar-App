import { useEffect, useState } from "react";
import Fretboard from "../Common/Fretboard.tsx";
import { ViewModeProps } from "../types.ts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProgressionTitles,
  postProgression,
  putProgression,
} from "../api/uncaged-api.tsx";
import { ProgressionType } from "../types.ts";

const ViewModeInterface = ({
  chordList,
  setChordList,
  progressionTitle,
  setProgressionTitle,
  id,
  viewMode,
  setViewMode,
}: ViewModeProps) => {
  const [userId, setUserId] = useState<number>();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["titles"],
    queryFn: () => getProgressionTitles(userId as number),
  });

  const postMutation = useMutation({
    mutationFn: (p: ProgressionType) => postProgression(p, userId as number),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressions"] });
    },
    onError: (error) => {
      console.error("Error saving progression:", error);
    },
  });

  const putMutation = useMutation({
    mutationFn: (p: ProgressionType) => putProgression(p),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressions"] });
    },
    onError: (error) => {
      console.error("Error updating progression:", error);
    },
  });

  useEffect(() => {
    const userId = Number(localStorage.getItem("CAGED-id"));
    if (userId) {
      setUserId(userId);
    }
  }, []);

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

  const handleSubmit = (e: any) => {
    console.log(userId);
    e.preventDefault();
    const userProgression = id
      ? {
          title: progressionTitle,
          chordList: [...chordList],
          progressionId: id ? id : null,
        }
      : { title: progressionTitle, chordList: [...chordList] };

    if (data.includes(userProgression.title)) {
      putMutation.mutate(userProgression);
    } else {
      postMutation.mutate(userProgression);
    }

    setChordList([]);
    setProgressionTitle("");
    toggleViewMode();
  };

  const handleChange = (e: any) => {
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
