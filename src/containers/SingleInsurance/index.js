import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import "./style.scss";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import FooterBottom from "../../components/footerBottom";
import heroBg from "../../assets/images/bg/community.svg";
import angleDown from "../../assets/images/angle-down.svg";
import scrollText from "../../assets/images/scroll.svg";

// components
import Header from "../../components/header";
import Plans from "../../components/insurancepricing/Plans";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";

import {Element, Link as ScrollLink} from "react-scroll";
import {getSingleInsurance} from "../reduxinsurance/actions";
import {connect} from "react-redux";
import Cookies from "universal-cookie";

const SingleInsurance = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const cookie = new Cookies();

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/login");
    }

    handleClickTop();
    props.getSingleInsurance(props?.match?.params?.insurance_slug);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          {props?.insurance?.insurance?.name || "Insurance"} - Clarity
          Cooperative
        </title>
      </Helmet>
      <LeftSideMenu  isOpen={openMenu}  openMenu={handleOpenMenu} title="Clarity Cooperative"/>
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
      />{" "}
      <div className="healthHeroArea">
        <img className="healthShape" src={heroBg} alt="shape"/>

        <div className="mainContainer">
          <div className="healthHeroContainer">
            <div className="healthHeroContent">
              <span className="category">{props?.insurance?.insurance?.hero_title_small}</span>

              <h1>{props?.insurance?.insurance?.name || ""}</h1>
              <p>{props?.insurance?.insurance?.description || ""}</p>
            </div>
            {props?.insurance?.insurance?.image !== undefined && (
              <div className="healthHeroImages">
                <div>
                  <img
                    src={props?.insurance?.insurance?.image}
                    alt="hero img"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <ScrollLink
          to="packages"
          spy={true}
          smooth={true}
          duration={500}
          className="scrollBtn"
        >
          <img className="scrollText" src={scrollText} alt="text"/>
          <img className="angleText" src={angleDown} alt="angle"/>
        </ScrollLink>
      </div>

      <Element name="packages">
        {props.insurance?.insurance?.plans?.length !== 0 ? (
          <>
            <Plans plans={props?.insurance?.insurance?.plans}/>
            <div className="disclaimer">
              <b>Disclaimer:</b>

              <p>
                Clarity Cooperative (CC) is not a licensed insurance agent. CC contracts with Elevate to Wellness (EW),
                a nationally licensed insurance producer. EW is acting as the health insurance agent of record for
                health (medical, dental, and vision) insurance. EW pays new member fees to CC, which are used for the
                general operating expenses of CC. Coverage is subject to all terms, conditions, limitations and
                exclusions set forth in the contract of insurance. You should consider your own needs when selecting
                health insurance products. CC does not make specific product recommendations for individuals. Each
                insurer has sole responsibility for its products. CC is not an insurer.
              </p>
            </div>
          </>
        ) : null}
      </Element>
      <FooterBottom/>
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)}/>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  insurance: state.insurancereducer.insurance,
});

export default connect(mapStateToProps, {
  getSingleInsurance,
})(SingleInsurance);
