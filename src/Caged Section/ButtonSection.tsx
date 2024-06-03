const ButtonSection = ({ setCurrentShape }) => {
  const shapes = {
    C: [3, 5, 10, 14, 19],
    A: [1, 5, 14, 15, 16],
    G: [2, 3, 4, 13, 18, 23],
    E: [0, 4, 5, 9, 13, 14],
    D: [2, 15, 17, 22],
  };

  const handleClick = (e) => {
    const shapeName = e.target.value;
    setCurrentShape({ name: shapeName, shape: shapes[shapeName] });
  };

  return (
    <div className="button-section">
      <button onClick={handleClick} value="C">
        C
      </button>
      <button onClick={handleClick} value="A">
        A
      </button>
      <button onClick={handleClick} value="G">
        G
      </button>
      <button onClick={handleClick} value="E">
        E
      </button>
      <button onClick={handleClick} value="D">
        D
      </button>
    </div>
  );
};

export default ButtonSection;
