import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Chord, CustomBarre, ClassNameType } from "../types.ts";
import CustomChordDiagram from "./CustomChordDiagram.tsx";
import ViewModeInterface from "./ViewModeInterface.tsx";

const CustomInterface = () => {
  const [chord, setChord] = useState<Chord>({
    name: "",
    shape: [],
    mutedFrets: [],
    barre: "",
    barreIndicator: "",
  });
  const [chordList, setChordList] = useState<Chord[]>([]);
  const [viewMode, setViewMode] = useState<boolean>(false);
  const [progressionTitle, setProgressionTitle] = useState<string>("");
  const { state } = useLocation();

  const displayProgression = (
    chordList.length >= 12
      ? [...chordList.slice(0, 11), { name: "..." }]
      : [...chordList]
  ).map((chord) => {
    return chord.name;
  });

  useEffect(() => {
    if (state) {
      const sentProgression = state.chordList;
      const sentTitle = state.title;
      setChordList(sentProgression);
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
    setChordList([...chordList.slice(0, chordList.length - 1)]);
  };

  const handleSelect = (e: any) => {
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

  const handleSave = (e: any) => {
    e.preventDefault();
    setChordList([...chordList, chord]);
    handleClear();
  };

  return (
    <div className="caged-diagram-interface">
      {!viewMode ? (
        <CustomChordDiagram
          chord={chord}
          setChord={setChord}
          chordList={chordList}
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
          chordList={chordList}
          setChordList={setChordList}
          progressionTitle={progressionTitle}
          id={state?.progressionId}
          setProgressionTitle={setProgressionTitle}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      )}
    </div>
  );
};

export default CustomInterface;
