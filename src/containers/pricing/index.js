import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import { connect } from "react-redux";
import { getAccountInformation } from "../account/actions";
import Membership from "../../components/membership";

const Pricing = (props) => {
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
      <LeftSideMenu isOpen={openMenu} openMenu={handleOpenMenu} title="Clarity Cooperative" />
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="Membership"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleBlack"
        blackLogo={true}
      />
      <Membership userInfo={props?.user_info} />
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation,
})(withRouter(Pricing));