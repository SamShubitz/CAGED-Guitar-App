import Fret from "./Fret";

const ChordDiagram = ({ currentChord }) => {
  const gridCells = new Array(30).fill(null);

  const fretCells = gridCells.map((_, index) => {
    const isFretted = currentChord.includes(index);
    const className = (index + 1) % 6 === 0 ? "last-fret" : "fret";

    return <Fret className={className} key={index} fretted={isFretted} />;
  });

  return <div className="neck">{fretCells}</div>;
};

export default ChordDiagram;
