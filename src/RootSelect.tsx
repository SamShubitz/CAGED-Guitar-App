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
    <div className="note-select-section">
      <label htmlFor="note-select">Select chord: </label>
      <select className="note-select" id="note-select" onChange={handleChange}>
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
