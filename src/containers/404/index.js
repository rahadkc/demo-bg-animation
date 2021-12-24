import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NotfoundShape from "../../assets/images/404-shape.svg";
// images
import NotfoundBG from "../../assets/images/bg/404.jpg";
import menuBg from "../../assets/images/bg/menu/home.svg";
import NotfoundAngle from "../../assets/images/icons/arrow-right.svg";
// compoennst
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import "./style.scss";

const PageNotFound = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Page Not Found - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="Page Not Found"
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleBlack"
        blackLogo={true}
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <div className="notfoundArea">
        <div
          style={{
            background: `url(${NotfoundBG}) no-repeat center center / cover`,
          }}
          className="notfoundWrapper"
        >
          <img className="notfoundShape" src={NotfoundShape} alt="shape" />
          <h2>Uh-oh, the waiting room is that way.</h2>
          <Link to="/">
            Take Me Home <img src={NotfoundAngle} alt="Back" />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default PageNotFound;
