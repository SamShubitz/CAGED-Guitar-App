import Fretboard from "../Fretboard";
import RootSelect from "../RootSelect";
import ButtonSection from "./ButtonSection";
import { useState } from "react";

const CAGEDInterface = () => {
  const [currentName, setCurrentName] = useState("C");
  const [currentBarre, setCurrentBarre] = useState("");
  const isBarred = currentName !== currentBarre;

  const shapes = {
    "": [],
    C: [3, 5, 10, 14, 19],
    A: [1, 5, 14, 15, 16],
    G: [2, 3, 4, 13, 18, 23],
    E: [0, 4, 5, 9, 13, 14],
    D: [2, 15, 17, 22],
  };

  const handleBarreChange = (barre) => {
    setCurrentBarre(barre);
  };

  const handleNameChange = (name) => {
    setCurrentName(name);
  };

  const getFinalShape = (barre) => {
    let finalShape;
    if (isBarred) {
      finalShape = shapes[barre]
        .filter((fret) => fret >= 6)
        .map((fret) => fret + 6);
    } else {
      finalShape = shapes[barre];
    }
    return finalShape;
  };

  const getBarreIndicator = (name, barre) => {
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

    let barredFret;

    if (barre === "C") {
      barredFret = barredFretValues[name];
    } else if (barre === "A") {
      barredFret = barredFretValues[name] + 3;
    } else if (barre === "G") {
      barredFret = barredFretValues[name] + 5;
    } else if (barre === "E") {
      barredFret = barredFretValues[name] + 8;
    } else if (barre === "D") {
      barredFret = barredFretValues[name] + 10;
    }

    if (barredFret > 11) {
      barredFret -= 12;
    }
    return barredFret;
  };

  const buildChord = () => {
    const finalShape = getFinalShape(currentBarre);
    const barreIndicator = getBarreIndicator(currentName, currentBarre);
    const finalChord = {
      name: currentName,
      shape: finalShape,
      barre: currentBarre,
      barreIndicator: barreIndicator,
      mutedFrets: [],
    };
    return finalChord;
  };

  const finalChord = buildChord();

  return (
    <div className="caged-diagram-interface">
      <RootSelect handleNameChange={handleNameChange} />
      <p className="button-section-header">Select a shape:</p>
      <ButtonSection handleBarreChange={handleBarreChange} />
      <div className="chord-diagram">
        <Fretboard chord={finalChord} caged={true} />
        {isBarred && finalChord.barreIndicator && (
          <p className="barre-fret-indicator">{`${finalChord.barreIndicator}fr`}</p>
        )}
      </div>
      <p className="name-display">
        {finalChord.shape.length ? finalChord.barre : ""}
      </p>
    </div>
  );
};

export default CAGEDInterface;
