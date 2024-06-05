const NewRootSelect = ({ onChange }) => {
  const notes = [
    "C",
    "C#/Db",
    "D",
    "D#/Eb",
    "E",
    "F",
    "F#/Gb",
    "G",
    "G#/Ab",
    "A",
    "A#/Bb",
    "B",
  ];

  const handleSelect = (e) => {
    const root = e.target.value;
    onChange(root);
  };

  return (
    <div className="root-select-section">
      <label htmlFor="root-select">Select a chord: </label>
      <select className="root-select" id="root-select" onChange={handleSelect}>
        {notes.map((note, index) => (
          <option key={index} value={note}>
            {note}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewRootSelect;
