import CustomFret from "./CustomFret";

const CustomFretboard = ({
  chord,
  customize = false,
  caged = false,
  handleClick = () => {},
}) => {
  const barreShapes = caged
    ? {
        C: [11],
        D: [10, 11],
        G: [10, 11],
        A: [9, 10, 11],
        E: [8, 9, 10, 11],
      }
    : {
        "": [],
        "3": [11],
        "4": [10, 11],
        "5": [9, 10, 11],
        "6": [8, 9, 10, 11],
      };

  const fretBoard = new Array(36).fill(null).map((_, index) => {
    const finalShape = chord.barre
      ? [...chord.shape, ...barreShapes[chord.barre]]
      : chord.shape;
    const isBarred = barreShapes[chord.barre].includes(index);
    const isMuted = chord.mutedFrets.includes(index);
    const isFretted = finalShape.includes(index);
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";

    return (
      <CustomFret
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

export default CustomFretboard;
