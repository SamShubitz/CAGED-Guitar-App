import { useState } from "react";

const Fret = ({ className }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <span className={className} onClick={handleClick}>
      {isClicked && <div className={`${className}-fret`} />}
    </span>
  );
};

export default Fret;
