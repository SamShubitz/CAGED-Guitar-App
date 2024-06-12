import { Link } from "react-router-dom";
import { useState } from "react";

const ProgressionsList = () => {
  const [progressionTitles, setProgressionTitles] = useState(
    Object.keys(localStorage)
  );

  const titleList = progressionTitles.map((title) => {
    return (
      <li>
        <Link to={title}>{title}</Link>
      </li>
    );
  });

  return (
    <div className="progressions-page">
      <ul className="progression-list">{titleList}</ul>
    </div>
  );
};

export default ProgressionsList;
