import Fret from "./Fret";

const FretBoard = ({ finalShape, isBarred }) => {
  const fretBoard = new Array(36).fill(null).map((_, index) => {
    const isFretted = finalShape.includes(index);
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";

    return (
      <Fret
        className={className}
        isFretted={isFretted}
        isBarred={isBarred}
        index={index}
        key={index}
      />
    );
  });

  return <div className="fret-board">{fretBoard}</div>;
};

export default FretBoard;
