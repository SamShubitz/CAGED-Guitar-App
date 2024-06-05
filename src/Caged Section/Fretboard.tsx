import Fret from "./Fret";
import { useEffect, useState } from "react";

const FretBoard = ({
  finalShape,
  isBarred,
  mutedFrets = [],
  selectedBarre = "",
}) => {
  const [currentMutedFrets, setCurrentMutedFrets] = useState([]);
  const [currentBarre, setCurrentBarre] = useState("");
  const currentIsBarred = currentBarre !== "";

  useEffect(() => {
    setCurrentMutedFrets(mutedFrets);
    setCurrentBarre(selectedBarre);
  }, []);

  const barreShapes = {
    "": [],
    "3fr": [11],
    "4fr": [10, 11],
    "5fr": [9, 10, 11],
    "6fr": [8, 9, 10, 11],
  };

  const fretBoard = new Array(36).fill(null).map((_, index) => {
    const barredFinalShape = [...finalShape, ...barreShapes[currentBarre]];
    const isFretted = barredFinalShape.includes(index);
    const isMuted = currentMutedFrets.includes(index);
    const className = isMuted
      ? "muted"
      : index < 6
      ? "open"
      : (index + 1) % 6 === 0
      ? "last-string"
      : "fret";

    return (
      <Fret
        className={className}
        isFretted={isFretted}
        isBarred={isBarred}
        currentIsBarred={currentIsBarred}
        index={index}
        key={index}
      />
    );
  });

  return <div className="fret-board">{fretBoard}</div>;
};

export default FretBoard;
