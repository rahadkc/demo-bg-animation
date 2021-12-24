import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import Cookies from "universal-cookie";
import NotfoundShape from "../../assets/images/404-shape.svg";
import confirmBg2 from "../../assets/images/bg/confirm.jpg";
import menuBg from "../../assets/images/bg/menu/home.svg";
// images
import confirmBg from "../../assets/images/bg/upcoming.svg";
import reload from "../../assets/images/icons/reload.svg";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import {resendEmailVerifyCodeAction} from "../signup/actions";
import "./style.scss";

const cookie = new Cookies();

const ConfirmEmail = (props) => {
  const get_verify_email = cookie.get("verify_email");
  const user_token = cookie.get("user_token");
  const [openMenu, setOpenMenu] = useState(false);

  const handleResetEmail = () => {
    const data = {
      email: get_verify_email,
    };

    props.resendEmailVerifyCodeAction(data);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (!user_token) {
      props.history.push("/login");
    } else if (cookie.get("user_info")?.email_verified_at) {
      props.history.goBack();
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Confirm E-mail - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="CONFIRM E-MAIL"
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
        className="confirmEmailArea"
      >
        <div
          style={{
            background: `url(${confirmBg2}) no-repeat center center / cover`,
          }}
          className="confirmEmailWrap"
        >
          <img className="confirmShape" src={NotfoundShape} alt="shape"/>

          <h1>CHECK YOUR E-MAIL</h1>
          <p>
            Please, check your E-mail! We’ve sent you an e-mail with a
            confirmation link.
          </p>
          <div className="resendEmail">
            Can’t find the e-mail?
            <strong onClick={handleResetEmail}>
              Resend It <img src={reload} alt="reload"/>
            </strong>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  resendEmailVerifyCodeAction,
})(ConfirmEmail);
