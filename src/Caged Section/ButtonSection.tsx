const ButtonSection = ({ handleBarreChange }) => {
  const handleClick = (e) => {
    const barre = e.target.value;
    handleBarreChange(barre);
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
