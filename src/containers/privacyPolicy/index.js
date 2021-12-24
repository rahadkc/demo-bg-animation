import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import menuBg from "../../assets/images/bg/menu/account.svg";
import FooterBottom from "../../components/footerBottom";
// compoennst
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { getPrivacyDetailsAction } from "../App/actions";
import "./style.scss";

const PrivacyPolicy = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  useEffect(() => {
    props.getPrivacyDetailsAction();
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>{`${props.privacy?.name} - Clarity Cooperative`}</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title={props.privacy?.name}
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

      <div className="termsOfServiceArea">
        <div className="mainContainer">
          <div className="tremsContentWrap">
            <span className="update">
              Last Updated{" "}
              {moment(props.privacy?.updated_at).format("MMMM Do, YYYY")}
            </span>
            <h1>{props.privacy?.name}</h1>
            <div
              className="termsContent"
              dangerouslySetInnerHTML={{
                __html: props.privacy?.contents,
              }}
            />
          </div>
        </div>
      </div>
      <FooterBottom />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  privacy: state.cms.privacy,
});
export default connect(mapStateToProps, {
  getPrivacyDetailsAction,
})(PrivacyPolicy);
