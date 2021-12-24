import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {NavLink, useParams, withRouter} from "react-router-dom";
import {Element, Link} from "react-scroll";
import {toast} from "react-toastify";
import {Collapse} from "reactstrap";
import Cookies from "universal-cookie";
import NotfoundShape from "../../assets/images/404-shape.svg";
import angleDown from "../../assets/images/angle-down.svg";
import arrow from "../../assets/images/arrow.svg";
// images
import NotfoundBG from "../../assets/images/bg/404.jpg";
import menuBg from "../../assets/images/bg/menu/home.svg";
import downloadBtn from "../../assets/images/download-btn.svg";
import download from "../../assets/images/download.svg";
import {
  default as angleRight,
  default as NotfoundAngle,
} from "../../assets/images/icons/arrow-right.svg";
import crose from "../../assets/images/icons/crose.svg";
import plus from "../../assets/images/icons/plus.svg";
import bluePurpleBottom from "../../assets/images/resource/bg/blue/bottom.svg";
import bluePurpleTop from "../../assets/images/resource/bg/blue/top.svg";
import greenYellowBottom from "../../assets/images/resource/bg/green/bottom.svg";
import greenYellowTop from "../../assets/images/resource/bg/green/top.svg";
import blueLightBlueBottom from "../../assets/images/resource/bg/light-blue/bottom.svg";
import blueLightBlueTop from "../../assets/images/resource/bg/light-blue/top.svg";
import pinkYellowBottom from "../../assets/images/resource/bg/pink/bottom.svg";
import darkBluePurple from "../../assets/images/resource/bg/dark_blue/dark_blue.svg";
// template design
import pinkYellowTop from "../../assets/images/resource/bg/pink/top.svg";
import purpleGreenBottom from "../../assets/images/resource/bg/purple/bottom.svg";
import purpleGreenTop from "../../assets/images/resource/bg/purple/top.svg";
import greenTealBottom from "../../assets/images/resource/bg/teal/bottom.svg";
import greenTealTop from "../../assets/images/resource/bg/teal/top.svg";
import scrollText from "../../assets/images/scroll.svg";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import LoginModal from "../../components/loginModal";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import {getResourceDetailsAction} from "../resources/actions";
import "./style.scss";
import {getAccountInformation} from "../account/actions";

const cookie = new Cookies();

const DownloadButton = ({resourceType, userType, handleLoginModal, downloadURL}) => {
  const typeRank = {
    BASIC: 1,
    PREMIUM: 2,
    FOUNDER: 3,
  };

  if (!cookie.get("user_token")) {
    return (
      <span onClick={handleLoginModal} className="joinBtn d-none d-md-flex">
        Download This Resource <img src={arrow} alt="arrow"/>
      </span>
    );
  }

  if (typeRank[resourceType] <= typeRank[userType]) {
    return (
      <a
        className="joinBtn d-none d-md-flex"
        href={downloadURL}
        target="_blank"
        download
        rel="noreferrer"
      >
        Download This Resource <img src={arrow} alt="arrow"/>
      </a>
    );
  }
  return (
    <NavLink to="/membership" className="joinBtn d-none d-md-flex">
      Download This Resource <img src={arrow} alt="arrow"/>
    </NavLink>
  );
};

const ResourcesTemplate = (props) => {
  const {id} = useParams();
  const [loading] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);

  const handleCollapse = (data) => {
    setIsOpen(data);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const handleOpenSignupModal = () => {
    if (cookie.get("user_token")) {
      toast.error("you are already logged in");
    } else {
      setIsModal(true);
    }
  };

  useEffect(() => {
    props.getResourceDetailsAction(id);
  }, []);

  const handleLoginModal = () => {
    setIsModalLogin(true);
  };

  return (
    <Fragment>
      <>
        <Helmet>
          <title>
            {`${props.resources_details?.name}  - Clarity Cooperative`}
          </title>
        </Helmet>
        {loading ? (
          <></>
        ) : (
          <>
            {props.resources_details !== undefined ? (
              <>
                <LeftSideMenu
                  isOpen={openMenu}
                  openMenu={handleOpenMenu}
                  className="sidebarShadowChange"
                  title="Resources"
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
                <div
                  className={`resourcesTemplateHeroArea ${
                    (props.resources_details?.resource_color ===
                      "pink/yellow" &&
                      "resourcesTemplateHeroAreaPinkYellow") ||
                    (props.resources_details?.resource_color ===
                      "blue/purple" &&
                      "resourcesTemplateHeroAreaBluePurple") ||
                    (props.resources_details?.resource_color ===
                      "purple/green" &&
                      "resourcesTemplateHeroAreaPurpleGreen") ||
                    (props.resources_details?.resource_color ===
                      "green/yellow" &&
                      "resourcesTemplateHeroAreaGreenYellow") ||
                    (props.resources_details?.resource_color ===
                      "blue/lightBlue" &&
                      "resourcesTemplateHeroAreaBlueLightBlue") || 
                    (props.resources_details?.resource_color ===
                      "dark_blue/purple" &&
                      "resourcesTemplateHeroAreaDarkBluePurple") ||
                    (props.resources_details?.resource_color === "green/teal" &&
                      "resourcesTemplateHeroAreaGreenTeal")
                  }`}
                >
                  <div className="mainContainer">
                    <div className="resourcesTemplateHeroContainer">
                      <div className="resourcesTemplateHeroContent">
                        {
                          <span className="categorypub">
                            {props.resources_details?.categories?.map(
                              (item) => (
                                <span>{item}</span>
                              )
                            )}
                          </span>
                        }

                        <h1>{props.resources_details?.name}</h1>
                        <Link
                          to="test1"
                          spy={true}
                          smooth={true}
                          duration={500}
                          className="joinBtn"
                        >
                          Learn More <img src={arrow} alt="arrow"/>
                        </Link>
                      </div>
                      <div className="resourcesTemplateHeroImg">
                        <img
                          src={props.resources_details?.hero_image}
                          alt={props.resources_details?.name}
                        />
                      </div>
                      <Link
                        to="test1"
                        spy={true}
                        smooth={true}
                        duration={500}
                        className="scrollBtn"
                      >
                        <img
                          className="scrollText"
                          src={scrollText}
                          alt="text"
                        />
                        <img
                          className="angleText"
                          src={angleDown}
                          alt="angle"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <Element name="test1">
                  <div
                    className="communityAboutArea"
                    style={{
                      background: `url(${
                        (props.resources_details?.resource_color ===
                          "pink/yellow" &&
                          pinkYellowTop) ||
                        (props.resources_details?.resource_color ===
                          "blue/purple" &&
                          bluePurpleTop) ||
                        (props.resources_details?.resource_color ===
                          "purple/green" &&
                          purpleGreenTop) ||
                        (props.resources_details?.resource_color ===
                          "green/yellow" &&
                          greenYellowTop) ||
                        (props.resources_details?.resource_color ===
                          "blue/lightBlue" &&
                          blueLightBlueTop) ||  (props.resources_details?.resource_color ===
                          "dark_blue/purple" &&
                            darkBluePurple) ||
                        (props.resources_details?.resource_color ===
                          "green/teal" &&
                          greenTealTop)
                      }) no-repeat center center / cover`,
                    }}
                  >
                    <div className="mainContainer">
                      <div className="communityAboutContainer">
                        <div className="communityAboutImg">
                          <img
                            src={props.resources_details?.important_image}
                            alt={props.resources_details?.important_title}
                          />
                        </div>
                        <div className="communityAboutContent">
                          <h2>{props.resources_details?.important_title}</h2>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              props.resources_details?.important_paragraph,
                            }}
                          />
                          <span
                            onClick={handleOpenSignupModal}
                            className="joinBtn joinBtnWhite mt-30"
                          >
                            Join The Community{" "}
                            <img src={angleRight} alt="arrow"/>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Element>

                <div
                  className={`communityFeaturesArea comprehensiveArea ${
                    (props.resources_details?.resource_color ===
                      "pink/yellow" &&
                      "communityFeaturesAreaPinkYellow") ||
                    (props.resources_details?.resource_color ===
                      "blue/purple" &&
                      "communityFeaturesAreaBluePurple") ||
                    (props.resources_details?.resource_color ===
                      "purple/green" &&
                      "communityFeaturesAreaPurpleGreen") ||
                    (props.resources_details?.resource_color ===
                      "green/yellow" &&
                      "communityFeaturesAreaGreenYellow") ||
                    (props.resources_details?.resource_color ===
                      "blue/lightBlue" &&
                      "communityFeaturesAreaBlueLightBlue") || 
                    (props.resources_details?.resource_color ===
                      "dark_blue/purple" &&
                      "communityFeaturesAreaDarkBluePurple") ||
                    (props.resources_details?.resource_color === "green/teal" &&
                      "communityFeaturesAreaGreenTeal")
                  }`}
                >
                  <div className="mainContainer">
                    <div className="communityFeaturesContainer">
                      <div className="comprehensiveInfoWrap">
                        <div className="comprehensiveInfo">
                          <h3>{props.resources_details?.expect_title}</h3>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: props.resources_details?.expect_paragraph,
                            }}
                          />
                        </div>
                        <DownloadButton
                          resourceType={props.resources_details?.display_type}
                          userType={props.user_info?.subscription_type}
                          handleLoginModal={handleLoginModal}
                          downloadURL={props.resources_details?.document}
                        />
                      </div>
                      <div className="communityFeaturesWrap">
                        <h4 className="comprehensiveTitle">
                          {props.resources_details?.expect_second_title}
                        </h4>
                        <ul className="communityFeaturesItems">
                          {props.resources_details?.expect?.map((item, i) => (
                            <li key={i}>
                              <h4>{item.question}</h4>
                              <p>{item.answer}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="faqArea"
                  style={{
                    background: `url(${
                      (props.resources_details?.resource_color ===
                        "pink/yellow" &&
                        pinkYellowBottom) ||
                      (props.resources_details?.resource_color ===
                        "blue/purple" &&
                        bluePurpleBottom) ||
                      (props.resources_details?.resource_color ===
                        "purple/green" &&
                        purpleGreenBottom) ||
                      (props.resources_details?.resource_color ===
                        "green/yellow" &&
                        greenYellowBottom) ||
                      (props.resources_details?.resource_color ===
                        "blue/lightBlue" &&
                        blueLightBlueBottom) ||
                      (props.resources_details?.resource_color ===
                        "green/teal" &&
                        greenTealBottom)||
                      (props.resources_details?.resource_color ===
                        "dark_blue/purple" &&
                        darkBluePurple)
                    }) no-repeat center center / cover`,
                  }}
                >
                  <div className="faqWrap">
                    <h2>{props.resources_details?.faq_title}</h2>

                    <DownloadButton
                      resourceType={props.resources_details?.display_type}
                      userType={props.user_info?.subscription_type}
                      handleLoginModal={handleLoginModal}
                      downloadURL={props.resources_details?.document}
                    />

                    <ul className="faqsItems">
                      {props.resources_details?.faq?.map((faq, i) => (
                        <li className={isOpen === i ? "active" : ""} key={i}>
                          <h3 onClick={() => handleCollapse(i)}>
                            {faq.question}{" "}
                            <img
                              src={isOpen === i ? crose : plus}
                              alt={faq.question}
                            />
                          </h3>
                          <Collapse isOpen={isOpen === i}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: faq.answer,
                              }}
                            />
                          </Collapse>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <footer className="resourcesTemplateFooter">
                  <div className="mainContainer">
                    <div className="resourcesTemplateContainer">
                      <div className="resourcesTemplateFooterImg">
                        <img
                          src={props.resources_details?.get_image}
                          alt={props.resources_details?.get_title}
                        />
                      </div>
                      <div className="resourcesTemplateFooterContent">
                        <h2>{props.resources_details?.get_title}</h2>
                        <strong>
                          {props.resources_details?.get_sub_title}
                        </strong>
                        <div
                          className="mb-md-5 mb-4"
                          dangerouslySetInnerHTML={{
                            __html: props.resources_details?.get_paragraph,
                          }}
                        />
                        <DownloadButton
                          resourceType={props.resources_details?.display_type}
                          userType={props.user_info?.subscription_type}
                          handleLoginModal={handleLoginModal}
                          downloadURL={props.resources_details?.document}
                        />
                      </div>
                      {cookie.get("user_token") ? (
                        <a
                          href={props.resources_details?.document}
                          target="_blank"
                          download
                          rel="noreferrer"
                          className="scrollBtn"
                        >
                          <img
                            className="scrollText"
                            src={download}
                            alt="text"
                          />
                          <img
                            className="angleText"
                            src={downloadBtn}
                            alt="angle"
                          />
                        </a>
                      ) : (
                        <div onClick={handleLoginModal} className="scrollBtn">
                          <img
                            className="scrollText"
                            src={download}
                            alt="text"
                          />
                          <img
                            className="angleText"
                            src={downloadBtn}
                            alt="angle"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </footer>
                <FooterBottom/>
              </>
            ) : (
              <Fragment>
                <Helmet>
                  <title>Page Not Found - Clarity Cooperative</title>
                </Helmet>
                <LeftSideMenu
                  openMenu={handleOpenMenu}
                  className="sidebarShadowChange"
                  title="Page Not Found"
                />
                <Header
                  openMenu={handleOpenMenu}
                  className="headerStyleBlack"
                  blackLogo={true}
                />
                <MainMenu
                  closeMenu={handleCloseMenuMenu}
                  title="NAVIGATE"
                  bgImage={menuBg}
                  className={openMenu ? "active" : ""}
                />
                <div className="notfoundArea">
                  <div
                    style={{
                      background: `url(${NotfoundBG}) no-repeat center center / cover`,
                    }}
                    className="notfoundWrapper"
                  >
                    <img
                      className="notfoundShape"
                      src={NotfoundShape}
                      alt="shape"
                    />
                    <h2>Uh-oh, the waiting room is that way.</h2>
                    <NavLink to="/">
                      Take Me Home <img src={NotfoundAngle} alt="Back"/>
                    </NavLink>
                  </div>
                </div>
              </Fragment>
            )}
          </>
        )}
      </>
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)}/>
      <LoginModal
        isOpen={isModalLogin}
        onClosed={() => setIsModalLogin(false)}
        modal={setIsModalLogin}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  resources_details: state.resources.resources_details,
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getResourceDetailsAction,
  getAccountInformation,
})(withRouter(ResourcesTemplate));
