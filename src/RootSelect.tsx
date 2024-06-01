const RootSelect = ({ setSelectedRoot }) => {
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

  const handleChange = (e) => {
    setSelectedRoot(e.target.value);
  };

  return (
    <div className="root-select-section">
      <label htmlFor="root-select">Select chord: </label>
      <select className="root-select" id="root-select" onChange={handleChange}>
        {notes.map((note, index) => (
          <option key={index} value={note}>
            {note}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RootSelect;
