import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import menuBg from "../../assets/images/bg/menu/request.svg";
import FooterBottom from "../../components/footerBottom";
// compoennst
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { getTermsDetailsAction } from "../App/actions";
import "./style.scss";

const TermsOfService = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  useEffect(() => {
    props.getTermsDetailsAction();
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>{`${props.terms?.name} - Clarity Cooperative`}</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title={props.terms?.name}
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
              {moment(props.terms?.updated_at).format("MMMM Do, YYYY")}
            </span>

            <h1>{props.terms?.name}</h1>
            <div
              className="termsContent"
              dangerouslySetInnerHTML={{
                __html: props.terms?.contents,
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
  terms: state.cms.terms,
});
export default connect(mapStateToProps, {
  getTermsDetailsAction,
})(TermsOfService);
