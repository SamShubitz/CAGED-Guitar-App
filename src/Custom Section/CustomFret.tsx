import { useState } from "react";

const CustomFret = ({
  className,
  isFretted,
  isBarred,
  isMuted,
  index,
  handleClick,
  customize,
}) => {
  const [mutedIndex, setMutedIndex] = useState(0);
  const isMutedCycle = ["open", "open", "muted"];

  const handleSpanClick = () => {
    if (!customize) return;

    const updatedIndex = (mutedIndex + 1) % 3;
    setMutedIndex(updatedIndex);
    handleClick(index, finalClassName, updatedIndex);
  };

  const finalClassName = isBarred
    ? "barred"
    : className === "open"
    ? isMutedCycle[mutedIndex]
    : className;

  if (customize) {
    return (
      <span className={className} onClick={handleSpanClick}>
        {isFretted && <div className={`${finalClassName}-fret`} />}
      </span>
    );
  }

  const fretClassName =
    isBarred && index >= 8 && index <= 11
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

export default CustomFret;
