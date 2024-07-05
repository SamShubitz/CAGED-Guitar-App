import Fret from "./Fret.tsx";
import { FretboardProps, BarreShape } from "../types.ts";

const Fretboard = ({
  chord,
  customize = false,
  caged = false,
  handleClick = () => {},
}: FretboardProps) => {
  const barreShapes: BarreShape = caged
    ? {
        "": [],
        C: [10, 11],
        D: [9, 10, 11],
        G: [9, 10, 11],
        A: [8, 9, 10, 11],
        E: [7, 8, 9, 10, 11],
      }
    : {
        "": [],
        2: [11],
        3: [10, 11],
        4: [9, 10, 11],
        5: [8, 9, 10, 11],
        6: [7, 8, 9, 10, 11],
      };

  const finalShape = caged
    ? chord.barre !== chord.name
      ? [...chord.shape, ...(barreShapes[chord.barre] ?? [])]
      : chord.shape
    : chord.barre
    ? [...chord.shape, ...(barreShapes[chord.barre] ?? [])]
    : chord.shape;

  const fretBoard = new Array(36).fill(null).map((_, index) => {
    const isFretted = finalShape.includes(index);
    const isBarred = caged
      ? (barreShapes[chord.barre] ?? []).includes(index) &&
        chord.barre !== chord.name
      : (barreShapes[chord.barre] ?? []).includes(index);
    const isMuted = chord.mutedFrets?.includes(index);
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";

    return (
      <Fret
        key={index}
        isBarred={isBarred}
        isMuted={isMuted}
        isFretted={isFretted}
        className={className}
        index={index}
        handleClick={handleClick}
        customize={customize}
      />
    );
  });

  return <div className="fret-board">{fretBoard}</div>;
};

export default Fretboard;
