import { CagedBarre } from "../types.ts";

const ButtonSection = ({
  handleBarreChange,
}: {
  handleBarreChange: (barre: CagedBarre) => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const barre = e.currentTarget.value;
    handleBarreChange(barre as CagedBarre);
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
