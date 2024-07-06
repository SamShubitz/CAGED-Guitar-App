import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProgressionType } from "../types";
import { getProgressions } from "../uncaged-api";

const exampleProgression: ProgressionType = {
  title: "Autumn Leaves",
  chordList: [
    {
      name: "Cm7",
      shape: [24, 1, 1, 26, 27, 28, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "F7b9",
      shape: [22, 27, 20, 25, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Bbmaj7",
      shape: [12, 1, 1, 1, 20, 21, 16, 5, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Ebmaj9",
      shape: [13, 8, 21, 16, 0, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "5",
    },
    {
      name: "Am7b5",
      shape: [0, 0, 0, 1, 28, 33, 32, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "D7",
      shape: [22, 33, 26, 31, 0, 0, 0, 5, 5, 5],
      mutedFrets: [0, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "Gm6",
      shape: [18, 1, 1, 14, 21, 22, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "",
    },
    {
      name: "G7b13",
      shape: [18, 1, 1, 1, 20, 27, 28, 5, 5, 5],
      mutedFrets: [1, 5],
      barre: "",
      barreIndicator: "",
    },
  ],
};

const ProgressionsList = () => {
  const pQuery = useQuery({
    queryKey: ["progressions"],
    queryFn: getProgressions,
  });

  const defaultLink = () => {
    const safeTitle = encodeURIComponent(exampleProgression.title);
    return (
      <Link to={`Progressions/${safeTitle}`} state={exampleProgression}>
        {exampleProgression.title}
      </Link>
    );
  };

  const savedTitles = pQuery.data?.map((p: ProgressionType) => {
    const safeTitle = encodeURIComponent(p.title);
    return (
      <li key={p.ProgressionId}>
        <Link to={`Progressions/${safeTitle}`}>{p.title}</Link>
      </li>
    );
  });

  const titles = savedTitles
    ? [...savedTitles, defaultLink()]
    : [defaultLink()];

  if (pQuery.isLoading)
    return (
      <div className="nav-list">
        <p className="loading">Loading...</p>
      </div>
    );

  if (pQuery.error)
    return (
      <p className="error" style={{ whiteSpace: "wrap" }}>
        Error: {pQuery.error.message}
      </p>
    );
  return <ul className="progression-list">{titles}</ul>;
};

export default ProgressionsList;
