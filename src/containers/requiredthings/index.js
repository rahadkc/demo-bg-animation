import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, withRouter, useLocation } from "react-router-dom";
import "./requiredthings.scss";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";

// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
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

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const cookie = new Cookies();
  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push('/login')
    }
  }, [])

  return (
    <Fragment>
      <Helmet>
        <title>What You'll Need - Clarity Cooperative</title>
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

      <div className="requiredthings">

        <div className="requiredthings__container">
          <div className="requiredthings__background">
            <div>
              <h1>What You’ll Need</h1>
              <p>You’ll need the following information handy to apply.</p>
            </div>
          </div>

          <div className="requiredthings__info">
            <div className="requiredthings__singleinfo">
              <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg></h2>
              <div>
                <b>Medical History</b>
                <p>Medical history and list of current medications (name and dosage)</p>
              </div>
            </div>

            <div className="requiredthings__singleinfo">
              <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg></h2>
              <div>
                <b>Insurance Information</b>
                <p>Most recent health insurance start and expiration dates</p>
              </div>
            </div>

            <div className="requiredthings__singleinfo">
              <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg></h2>
              <div>
                <b>Banking Information</b>
                <p>Bank name, account type, routing and account numbers for monthly ACH withdrawals to pay for your premiums (credit cards are not accepted)</p>
              </div>
            </div>

            <div className="requiredthings__singleinfo">
              <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg></h2>
              <div>
                <b>Life Insurance Policy (Included in enrollment)</b>
                <p>For the included life insurance policy ($7K), your beneficiary’s name, DOB and social security number</p>
              </div>
            </div>

            <div className="requiredthings__singleinfo">
              <h2><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" /></svg></h2>
              <div>
                <b>Cooperative Member Code</b>
                <p>To access the association, you’ll go to our partner site and then you’ll enter the code and credentials sent to your email address</p>
              </div>
            </div>

            <Link to="/select-insurance" className="nextnavigate">
              Select Insurance{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                />
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

export default withRouter(Index);