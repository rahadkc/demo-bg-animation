import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NotfoundShape from "../../assets/images/404-shape.svg";
import confirmBg2 from "../../assets/images/bg/confirm.jpg";
import menuBg from "../../assets/images/bg/menu/home.svg";
// images
import confirmBg from "../../assets/images/bg/upcoming.svg";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import "./style.scss";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import { getAccountInformation } from "../account/actions";

const CancelAccount = () => {
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
        <title>We're sorry to see you go - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="CANCEL ACCOUNT"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />
      <div
        style={{
          background: `url(${confirmBg}) no-repeat center center / cover`,
        }}
        className="sadMessageArea"
      >
        <div
          style={{
            background: `url(${confirmBg2}) no-repeat center center / cover`,
          }}
          className="sadMessageWrap"
        >
          <img className="sadShape" src={NotfoundShape} alt="shape" />

          <h1>WE'RE SORRY TO SEE YOU GO.</h1>
          <p>
            Feel free to <b>share with us</b> why you’re deactivating your
            account. We’re always looking to improve and really appreciate your
            feedback.
          </p>

          <a href="mailto:hello@claritycooperative.com?subject=Share%20My%20Feedback"
            className="joinBtnWhite joinBtn ">
            Share My Feedback <img src={angleRight} alt="angle" />
          </a>

        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation
})(withRouter(CancelAccount));
