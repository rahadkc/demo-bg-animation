import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter, useLocation } from "react-router-dom";
import "./howitworks.scss";
import { getHowItWorksDetails } from "../account/actions";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";

// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import Cookies from "universal-cookie";
import { connect } from "react-redux";

const Index = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const cookie = new Cookies();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    props.getHowItWorksDetails();
  }, []);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/login");
    }
  }, []);


  return (
    <Fragment>
      <Helmet>
        <title>How It Works - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu isOpen={openMenu} openMenu={handleOpenMenu} title="Clarity Cooperative" />
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
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
        className="headerStyleBlack"
        blackLogo={true}
      />

      <div className="howitworks">
        <div className="howitworks__container">
          <div className="howitworks__background">
            <div>
              <h1>{props?.howitworks_cms?.name || ""}</h1>
              <p>{props?.howitworks_cms?.subtitle || ""}</p>
            </div>
          </div>

          <div className="howitworks__info">
            {props?.howitworks_cms?.body?.map((item) => (
              <div className="howitwork__singleinfo">
                <h2>{item?.key}</h2>
                <div>
                  <b>{item?.title}</b>
                  <p>
                    {item?.body}
                  </p>
                </div>
              </div>
            ))}

            <Link
              to={props?.howitworks_cms?.button_link || ""}
              className="nextnavigate"
            >
              {props?.howitworks_cms?.button_title || ""}{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  howitworks_cms: state.my_account.howitworks_cms,
});
export default connect(mapStateToProps, {
  getHowItWorksDetails,
})(withRouter(Index));
