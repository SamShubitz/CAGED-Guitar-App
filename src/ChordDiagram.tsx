import FretBoard from "./FretBoard";
import { useState, useEffect } from "react";

const ChordDiagram = ({ currentShape, selectedRoot }) => {
  const [barredFret, setBarredFret] = useState("");
  const isBarred = currentShape.name != selectedRoot;
  const { shape, name } = currentShape;

  const barredFrets =
    name === "C"
      ? [11]
      : name === "D" || name === "G"
      ? [10, 11]
      : name === "A"
      ? [9, 10, 11]
      : [8, 9, 10, 11];

  let finalShape = [];
  if (shape.length != 0) {
    if (isBarred) {
      const newFrets = shape
        .filter((fret) => fret >= 6)
        .map((fret) => fret + 6);
      const barredShape = Array.from(new Set([...barredFrets, ...newFrets]));
      finalShape = barredShape;
    } else {
      finalShape = shape;
    }
  }

  useEffect(() => {
    const calculateBarredFret = () => {
      const barredFretValues = {
        C: 0,
        "C#/Db": 1,
        D: 2,
        "D#/Eb": 3,
        E: 4,
        F: 5,
        "F#/Gb": 6,
        G: 7,
        "G#/Ab": 8,
        A: 9,
        "A#/Bb": 10,
        B: 11,
      };

      const shape = currentShape.name;
      let barredFret;

      if (shape === "C") {
        barredFret = barredFretValues[selectedRoot];
      } else if (shape === "A") {
        barredFret = barredFretValues[selectedRoot] + 3;
      } else if (shape === "G") {
        barredFret = barredFretValues[selectedRoot] + 5;
      } else if (shape === "E") {
        barredFret = barredFretValues[selectedRoot] + 8;
      } else if (shape === "D") {
        barredFret = barredFretValues[selectedRoot] + 10;
      }

      if (barredFret > 11) {
        barredFret -= 12;
      }
      setBarredFret(barredFret);
    };

    calculateBarredFret();
  }, [currentShape, selectedRoot]);

  return (
    <div className="chord-diagram">
      <FretBoard finalShape={finalShape} isBarred={isBarred} />
      {isBarred && barredFret && (
        <p className="barre-fret-indicator">{`${barredFret}fr`}</p>
      )}
    </div>
  );
};

export default ChordDiagram;
