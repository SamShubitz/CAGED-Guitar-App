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
    <select className="note-select" onChange={handleChange}>
      {notes.map((note, index) => (
        <option key={index} value={note}>
          {note}
        </option>
      ))}
    </select>
  );
};

export default RootSelect;
