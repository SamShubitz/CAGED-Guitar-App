import FretBoard from "./FretBoard";

const ChordDiagram = ({ currentShape, setCurrentShape, selectedRoot }) => {
  const isBarred = currentShape.name != selectedRoot;
  //if (isBarred) {
  //  const barredShape = currentShape.shape.map((shape) => shape + 6);
  //  setCurrentShape({ ...currentShape, shape: barredShape });

  return (
    <div className="chord-diagram">
      <FretBoard
        currentShape={currentShape}
        selectedRoot={selectedRoot}
        isBarred={isBarred}
      />
    </div>
  );
};

export default ChordDiagram;
