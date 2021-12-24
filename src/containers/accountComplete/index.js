import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {useLocation, withRouter} from "react-router-dom";
import StepWizard from "react-step-wizard";
// images
import menuBg from "../../assets/images/bg/menu/account.svg";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import {accountVerifyAction} from "./actions";
import FinishSetup from "./components/finishSetup";
import MemberProfile from "./components/memberProfile";
import MemberProfile2 from "./components/memberProfile2";
import ProfilePhoto from "./components/profilePhoto";
import "./style.scss";
import Cookies from "universal-cookie";
import AccountCompleteBasic from "./basic";
import AccountCompletePremium from "./premium";
import AccountCompleteFounder from "./founder";

const cookie = new Cookies();

const AccountComplete = (props) => {
  const {search} = useLocation();
  let query = new URLSearchParams(search);
  const token = query.get("token");
  const user_id = query.get("id");
  const expires = query.get("expires");
  const signature = query.get("signature");
  const secret_token = query.get("secret_token");
  const [openMenu, setOpenMenu] = useState(false);
  const [getActiveStep, setGetActiveStep] = useState(1);
  const [showBasic, setShowBasic] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showFounder, setShowFounder] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/");
    } else if (
      cookie.get("user_info")?.is_complete === 1 ||
      cookie.get("user_info")?.is_complete === true
    ) {
      props.history.push("/my-account");
    }

    if (cookie.get("user_info")?.subscription_type === "BASIC" || cookie.get("user_info")?.subscription_type === null) {
      setShowBasic(true);
    }

    if (cookie.get("user_info")?.subscription_type === "PREMIUM") {
      setShowPremium(true);
    }

    if (cookie.get("user_info")?.subscription_type === "FOUNDER") {
      setShowFounder(true);
    }
  }, []);

  useEffect(() => {
    cookie.remove("verify_email");

    if (!cookie.get("user_token")) {
      props.history.push("/");
    } else if (cookie.get("user_info")?.is_complete === 1) {
      props.history.push("/my-account");
    }

    if (cookie.get("user_info")?.subscription_type === "BASIC" || cookie.get("user_info")?.subscription_type === null) {
      setShowBasic(true);
    }

    if (cookie.get("user_info")?.subscription_type === "PREMIUM") {
      setShowPremium(true);
    }

    if (cookie.get("user_info")?.subscription_type === "FOUNDER") {
      setShowFounder(true);
    }

    if (token && user_id && expires && signature) {
      props.accountVerifyAction(
        user_id,
        token,
        expires,
        signature,
        secret_token,
        props.history
      );
    }
  }, [token]);

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
        title={
          (getActiveStep === 1 && "FINISH SETUP") ||
          (getActiveStep === 2 && "SETUP PROFILE") ||
          (getActiveStep === 3 && "SETUP PROFILE") ||
          (getActiveStep === 4 && "SETUP PROFILE") ||
          (getActiveStep === 5 && "YOU DID IT")
        }
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <StepWizard className="accountCompleteWrap">
        <FinishSetup
          activeStep={setGetActiveStep}
          getActiveStep={getActiveStep}
        />
        <MemberProfile
          activeStep={setGetActiveStep}
          getActiveStep={getActiveStep}
        />
        <ProfilePhoto
          activeStep={setGetActiveStep}
          getActiveStep={getActiveStep}
        />
        <MemberProfile2
          showBasic={showBasic}
          setShowBasic={setShowBasic}
          activeStep={setGetActiveStep}
          getActiveStep={getActiveStep}
        />
        {showBasic && <AccountCompleteBasic/>}
        {showPremium && <AccountCompletePremium/>}
        {showFounder && <AccountCompleteFounder/>}
      </StepWizard>
      <FooterBottom/>
    </Fragment>
  );
};

export default connect(null, {accountVerifyAction})(
  withRouter(AccountComplete)
);
