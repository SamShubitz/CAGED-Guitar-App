import { useState } from "react";

const Fret = ({ className, fretted }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <span className={className} onClick={handleClick}>
      {isClicked || fretted ? <div className="fretted" /> : null}
    </span>
  );
};

export default Fret;
