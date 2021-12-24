import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter, useLocation } from "react-router-dom";
import "./allinsurance.scss";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";

// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import Disclaimer from "../../components/disclaimer";
import { useDispatch, useSelector } from "react-redux";
import { AllInsurances } from "../reduxinsurance/actions";
import Cookies from "universal-cookie";

const Index = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AllInsurances());
  }, []);

  const allinsurance = useSelector(
    (state) => state.insurancereducer.allinsurance
  );

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const cookie = new Cookies();
  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/login");
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Select Insurance - Clarity Cooperative</title>
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
        className="headerStyleWhite"
        logoWhite={true}
      />

      <div className="allinsurance">
        <div className="allinsurance__container">
          <div className="allinsurance_heading_wrapper">
            <h1>What type of insurance are you interested in?</h1>
          </div>

          {allinsurance === "undefined" ||
            Object.keys(allinsurance).length === 0 ? null : (
            <div className="allinsurance__info">
              {allinsurance?.insurances?.map((insurance) => (
                <Link to={`/insurance/${insurance.slug}`}>
                  <div className="allinsurance__info_box">

                    <img src={insurance.icon} alt="" />

                    <p>{insurance.name}</p>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Disclaimer />

      {/* <Footer /> */}
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

export default withRouter(Index);
