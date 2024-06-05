import { useState } from "react";
import NewRootSelect from "./NewRootSelect";
import NewButtonSection from "./NewButtonSection";
import CustomFretboard from "./Custom Section/CustomFretboard";

const NewCAGEDInterface = () => {
  const [chord, setChord] = useState({
    name: "",
    shape: [],
    mutedFrets: [],
    barre: "C",
    barreIndicator: "",
  });

  const { shape, name, barre, barreIndicator } = chord;
  const isBarred = barre !== name;

  const barredFrets = {
    C: [11],
    D: [10, 11],
    G: [10, 11],
    A: [9, 10, 11],
    E: [8, 9, 10, 11],
  };

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

  const handleShapeChange = (nextBarre, nextShape) => {
    let finalShape = nextShape;

    if (nextShape.length !== 0 && isBarred) {
      const newFrets = nextShape
        .filter((fret) => fret >= 6)
        .map((fret) => fret + 6);
      finalShape = Array.from(
        new Set([...barredFrets[nextBarre], ...newFrets])
      );
    }

    const nextBarreIndicator = calculateBarredFret(nextBarre, name);

    setChord((prevChord) => ({
      ...prevChord,
      shape: finalShape,
      barre: nextBarre,
      barreIndicator: nextBarreIndicator,
    }));
    console.log("shapechange", chord);
  };

  const calculateBarredFret = (barre, name) => {
    let barredFret = barredFretValues[name] || 0;

    switch (barre) {
      case "C":
        barredFret += 0;
        break;
      case "A":
        barredFret += 3;
        break;
      case "G":
        barredFret += 5;
        break;
      case "E":
        barredFret += 8;
        break;
      case "D":
        barredFret += 10;
        break;
      default:
        break;
    }

    return barredFret > 11 ? barredFret - 12 : barredFret;
  };

  const handleRootChange = (selectedRoot) => {
    setChord((prevChord) => ({
      ...prevChord,
      name: selectedRoot,
    }));
    console.log("rootchange", chord);
  };

  return (
    <div className="caged-diagram-interface">
      <NewRootSelect onChange={handleRootChange} />
      <p className="button-section-header">Select a shape:</p>
      <NewButtonSection onChange={handleShapeChange} />
      <div className="chord-diagram">
        <CustomFretboard chord={chord} caged={true} />
        {isBarred && barreIndicator && (
          <p className="barre-fret-indicator">{`${barreIndicator}fr`}</p>
        )}
      </div>
      <p className="name-display">{shape.length ? barre : ""}</p>
    </div>
  );
};

export default NewCAGEDInterface;
