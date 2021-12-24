import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import Footer from "../../components/footer";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import Subscription from "../../components/subscription";

const SubscriptionPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Membership - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        title="Clarity Cooperative"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleEmpty"
        blackLogo={true}
      />
      <Subscription />
      <Footer />
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

export default withRouter(SubscriptionPage);
