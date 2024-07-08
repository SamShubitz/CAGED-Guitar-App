import HamburgerIcon from "./HamburgerIcon";
import SideNav from "../SideNav";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    setMenuIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="header">
        <HamburgerIcon onClick={toggleMenu} />
        <h1 className="nav-header">unCAGED</h1>
      </nav>
      {menuIsOpen && (
        <SideNav className={"header-side-nav"} toggleMenu={toggleMenu} />
      )}
    </>
  );
};

export default Header;
