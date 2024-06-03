import CustomFret from "./CustomFret";

const CustomFretboard = ({ shape, handleClick }) => {
  const fretboard = new Array(36).fill(null).map((_, index) => {
    const className =
      index < 6 ? "open" : (index + 1) % 6 === 0 ? "last-string" : "fret";
    const isFretted = shape.includes(index);
    return (
      <CustomFret
        key={index}
        className={className}
        handleClick={handleClick}
        isFretted={isFretted}
        index={index}
      />
    );
  });

  return <div className="fret-board">{fretboard}</div>;
};

export default CustomFretboard;
