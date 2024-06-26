import { useState } from "react";
import { ClassNameType, FretProps } from "../types.ts";

const Fret = ({
  className,
  isFretted,
  isBarred,
  isMuted,
  index,
  handleClick,
  customize,
}: FretProps) => {
  const [mutedIndex, setMutedIndex] = useState(0);
  const isMutedCycle = ["open", "open", "muted"];

  const handleFretClick = () => {
    if (!customize) return;

    const updatedIndex = (mutedIndex + 1) % 3;
    setMutedIndex(updatedIndex);
    handleClick(index, finalClassName, updatedIndex);
  };

  const finalClassName = isBarred
    ? "barred"
    : className === "open"
    ? (isMutedCycle[mutedIndex] as ClassNameType)
    : (className as ClassNameType);

  if (customize) {
    return (
      <span className={className} onClick={handleFretClick}>
        {isFretted && <div className={`${finalClassName}-fret`} />}
      </span>
    );
  }

  const fretClassName =
    isBarred && index >= 7 && index <= 11
      ? "barred-fret"
      : isMuted
      ? "muted-fret"
      : `${className}-fret`;

  return (
    <span className={className}>
      {isFretted && <div className={fretClassName} />}
    </span>
  );
};

export default Fret;
