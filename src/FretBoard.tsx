import FixedFret from "./FixedFret";

const FretBoard = ({ currentShape, selectedRoot }) => {
  const fretBoard = new Array(36).fill(null).map((_, index) => {
    const isFretted = currentShape.shape.includes(index);
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";

    return (
      <FixedFret className={className} key={index} isFretted={isFretted} />
    );
  });

  return <div className="fret-board">{fretBoard}</div>;
};

export default FretBoard;
