import { useState } from "react";

const CustomFret = ({ className, isFretted, index, handleClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMutedCycle = ["open", "open", "muted"];

  const handleSpanClick = () => {
    setCurrentIndex((index) => (index + 1) % 3);
    handleClick(index, finalClassName);
  };

  const finalClassName =
    className === "open" ? isMutedCycle[currentIndex] : className;

  return (
    <span className={className} onClick={handleSpanClick}>
      {isFretted && <div className={`${finalClassName}-fret`} />}
    </span>
  );
};

export default CustomFret;
