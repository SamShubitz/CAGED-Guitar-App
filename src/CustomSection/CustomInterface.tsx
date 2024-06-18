import { Chord, CustomBarre, ClassNameType } from "../types.ts";
import CustomChordDiagram from "./CustomChordDiagram.tsx";
import ViewModeInterface from "./ViewModeInterface.tsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CustomInterface = () => {
  const [chord, setChord] = useState<Chord>({
    name: "",
    shape: [],
    mutedFrets: [],
    barre: "",
    barreIndicator: "",
  });
  const [progression, setProgression] = useState<Chord[]>([]);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [progressionTitle, setProgressionTitle] = useState<string>("");
  let { state } = useLocation();

  const displayProgression = (
    progression.length >= 12
      ? [...progression.slice(0, 11), { name: "..." }]
      : [...progression]
  ).map((chord) => {
    return chord.name;
  });

  useEffect(() => {
    if (state) {
      const sentProgression = state[0].progression;
      const sentTitle = state[0].title;
      setProgression(sentProgression);
      setProgressionTitle(sentTitle);
    }
  }, []);

  const handleClear = () => {
    setChord({
      name: "",
      shape: [],
      mutedFrets: [],
      barre: "",
      barreIndicator: "",
    });
  };

  const handleChordClear = () => {
    setProgression([...progression.slice(0, progression.length - 1)]);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextBarre = e.target.value as CustomBarre;
    setChord({ ...chord, barre: nextBarre });
  };

  const handleClick = (
    fretIndex: number,
    className: ClassNameType,
    updatedMuteIndex: number
  ) => {
    setChord((prevChord: Chord) => {
      const isMuted = fretIndex < 6 && updatedMuteIndex === 2;
      const newShape =
        className !== "open" && prevChord.shape.includes(fretIndex)
          ? prevChord.shape.filter((index) => index !== fretIndex)
          : [...prevChord.shape, fretIndex];

      const newMutedFrets = isMuted
        ? [...prevChord.mutedFrets, fretIndex]
        : prevChord.mutedFrets.filter((index) => index !== fretIndex);

      return {
        ...prevChord,
        shape: newShape,
        mutedFrets: newMutedFrets,
      };
    });
  };

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProgression((prevProgression) => [...prevProgression, chord]);
    handleClear();
  };

  return (
    <div className="caged-diagram-interface">
      {!viewMode ? (
        <CustomChordDiagram
          chord={chord}
          setChord={setChord}
          progression={progression}
          progressionTitle={progressionTitle}
          displayProgression={displayProgression}
          toggleViewMode={toggleViewMode}
          handleSave={handleSave}
          handleSelect={handleSelect}
          handleChordClear={handleChordClear}
          handleClear={handleClear}
          handleClick={handleClick}
        />
      ) : (
        <ViewModeInterface
          progression={progression}
          setProgression={setProgression}
          progressionTitle={progressionTitle}
          setProgressionTitle={setProgressionTitle}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
    </div>
  );
};

export default CustomInterface;
