const CustomFret = ({ className, isFretted, index, handleClick }) => {
  return (
    <span className={className} onClick={() => handleClick(index)}>
      {isFretted && <div className={`${className}-fret`} />}
    </span>
  );
};

export default CustomFret;
