import { Link } from "react-router-dom";

const ProgressionTemplate = () => {
  return (
    <div className="progressions-page">
      <Link to="/Customize">
        <button className="view-mode-button">Back to customize</button>
      </Link>
    </div>
  );
};

export default ProgressionTemplate;
