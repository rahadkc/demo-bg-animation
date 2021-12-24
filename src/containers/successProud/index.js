import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import NotfoundShape from "../../assets/images/404-shape.svg";
import successCardBg from "../../assets/images/bg/success-bg.svg";
// images
import stepBg from "../../assets/images/bg/success.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import menuBg from "../../assets/images/bg/menu/account.svg";
import FooterBottom from "../../components/footerBottom";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import { getAccountInformation } from "../account/actions";
import { community_url } from "../../utils/constants";

const SuccessMessage = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const cookie = new Cookies();

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    props.getAccountInformation();

    const data = {
      is_complete: props?.user_info?.is_complete,
      role: props?.user_info?.role,
      subscription_type: props?.user_info?.subscription_type,
      email_verified_at: props?.user_info?.email_verified_at,
    };

    cookie.set("user_info", data, {
      path: "/",
      expires: new Date(Date.now() + (3600 * 1000 * 24)),
    });
  }, [props]);

  return (
    <Fragment>
      <Helmet>
        <title>Finish Account Setup - Clarity Cooperative</title>
      </Helmet>
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />

      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="My Account"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <div
        style={{
          background: `url(${stepBg}) no-repeat center center / cover`,
        }}
        className="loginArea signupArea"
      >
        <div
          style={{
            background: `url(${successCardBg}) no-repeat center center / cover`,
          }}
          className="successWrapper youDidWrap"
        >
          <img className="confirmShape" src={NotfoundShape} alt="shape" />

          <h2 style={{ fontSize: "5rem", lineHeight: "5rem" }}>
            <span>THANKS FOR BECOMING A PREMIUM MEMBER.</span>
          </h2>
          <div className="didContent">
            <p>You’re about to gain a whole new level of clarity.</p>
            <Link
              onClick={handleClickTop}
              to="/resources"
              className="joinBtnWhite joinBtn"
            >
              Start Exploring <img src={angleRight} alt="angle" />
            </Link>
            <a
              onClick={handleClickTop}
              href={community_url}
              target="_blank"
              className="joinBtnWhite joinBtn ml-4" rel="noreferrer"
            >
              Go To Forum <img src={angleRight} alt="angle" />
            </a>
          </div>
        </div>
      </div>
      <FooterBottom />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation,
})(withRouter(SuccessMessage));
