import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="side-nav">
      <h1 className="nav-header">unCAGED</h1>
      <ul className="nav-list">
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/CAGED">LEARN CAGED</Link>
        </li>
        <li>
          <Link to="/Customize">CUSTOMIZE</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
