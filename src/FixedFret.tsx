const Fret = ({ className, isFretted }) => {
  return (
    <span className={className}>
      {isFretted && <div className={`${className}-fret`} />}
    </span>
  );
};

export default Fret;
