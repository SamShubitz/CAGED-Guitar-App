const Fret = ({ className, isFretted, isBarred, index }) => {
  const fretClassName =
    isBarred && index >= 8 && index <= 11 ? "barred-fret" : `${className}-fret`;

  return (
    <span className={className}>
      {isFretted && <div className={fretClassName} />}
    </span>
  );
};

export default Fret;
