import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProgressionsList from "../Common/ProgressionsList";
import Logo from "../assets/Logo.jpeg";
import HamburgerIcon from "./HamburgerIcon";

const SideNav = ({ className = "side-nav", toggleMenu = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={className}>
      {className === "header-side-nav" && (
        <HamburgerIcon onClick={toggleMenu} />
      )}
      <img className="logo" src={Logo} alt="logo" />
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
        <li className="progressions">
          <a onClick={toggleOpen}>PROGRESSIONS</a>
        </li>
        {isOpen && (
          <li>
            <ProgressionsList />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
