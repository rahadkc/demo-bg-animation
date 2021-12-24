import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Cookies from "universal-cookie";
import NotfoundShape from "../../assets/images/404-shape.svg";
import confirmBg2 from "./background.png";
import menuBg from "../../assets/images/bg/menu/home.svg";
// images
import confirmBg from "../../assets/images/bg/ConfirmEmail.png";
import reload from "../../assets/images/icons/reload.svg";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
// import { getAccountInformation } from "../../containers/account/actions";
import { applyForPlan } from "./actions";
import { checkEmptyObject } from "../../utils/commonFunctions";
// import { getAccountInformation } from "../account/actions";
import "./style.scss";

const cookie = new Cookies();

const ApplyForPlan = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleSendEmailAgain = () => {
    props?.applyForPlan();
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/login");
    }

    // props.getAccountInformation();
  }, []);

  useEffect(() => {
    if (!checkEmptyObject(props.user_info)) {
      if (
        props?.user_info?.subscription_type === "BASIC" ||
        props?.user_info?.subscription_type === null
      ) {
        props.history.push("/membership");
      }

      if (
        props?.user_info?.subscription_type !==
        cookie.get("user_info")?.subscription_type
      ) {
        cookie.set("user_info", props?.user_info, {
          path: "/",
          expires: new Date(Date.now() + 3600 * 1000 * 24),
        });
      }
    }

    if (
      props?.user_info?.subscription_type === "PREMIUM" ||
      props?.user_info?.subscription_type === "FOUNDER"
    ) {
      props?.applyForPlan();
    }
  }, [props.user_info]);

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

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

      {checkEmptyObject(props.user_info) ? (
        <></>
      ) : (
        <div
          style={{
            background: `url(${confirmBg}) no-repeat center center / cover`,
          }}
          className="confirmPremiumEmailArea"
        >
          <div
            style={{
              background: `url(${confirmBg2}) no-repeat center center / cover`,
            }}
            className="confirmPremiumEmailWrap"
          >
            <img
              className="confirmPremiumShape"
              src={NotfoundShape}
              alt="shape"
            />

            <h1>CHECK YOUR E-MAIL</h1>
            <p>
              You’re close to getting the insurance that you need! Please, check
              your E-mail!
            </p>
            <div className="resendPremiumEmail">
              Can’t find the e-mail?
              <strong onClick={handleSendEmailAgain}>
                Resend It <img src={reload} alt="reload" />
              </strong>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
  is_loading: state.meta.isLoading,
});

export default connect(mapStateToProps, {
  // getAccountInformation,
  applyForPlan,
})(withRouter(ApplyForPlan));
