import React from "react";
import { Link } from "react-router-dom";
import dots from "../../assets/images/dots.svg";
// images
import logo from "../../assets/images/logo.svg";
import "./style.scss";

const LeftSideMenu = ({ title, className = "", openMenu, isOpen }) => {
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={`${className} leftMenu`}>
      <div className="logoHeight">
        <Link onClick={handleClickTop} className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <span onClick={openMenu} className="dots">
        <svg className={`${isOpen ? "active_svg" : "normal_svg"}`} width="30" height="50" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle r="3" fill="black" />
          <circle r="3" fill="black" />
          <circle r="3" fill="black" />
          <circle r="3" fill="black" />
          <circle r="3" fill="black" />
        </svg>
      </span>
      <h3 className="sidebarText">{title}</h3>
    </div>
  );
};
export default LeftSideMenu;
