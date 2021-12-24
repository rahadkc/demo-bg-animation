import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Element, Link } from "react-scroll";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import angleDown from "../../assets/images/angle-down.svg";
import arrow from "../../assets/images/arrow.svg";
import aboutBg from "../../assets/images/bg/community-about.svg";
import heroBg from "../../assets/images/bg/community.svg";
// images
import menuBg from "../../assets/images/bg/menu/account.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import scrollText from "../../assets/images/scroll.svg";
import Footer from "../../components/footer";
import FooterBottom from "../../components/footerBottom";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import { getCommunityDetailsAction } from "../App/actions";
import "./style.scss";

const Community = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const cookie = new Cookies();

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
    props.getCommunityDetailsAction();
  }, []);
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <Fragment>
      <Helmet>
        <title>{`${props.community?.name} - Clarity Cooperative`}</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="community"
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
      <div className="communityHeroArea">
        <img className="communityShape" src={heroBg} alt="shape" />
        <div className="mainContainer">
          <div className="communityHeroContainer">
            <div className="communityHeroContent">
              <span className="category">{props.community?.label}</span>
              <h1>{props.community?.hero_title}</h1>
              <p>{props.community?.hero_sub_title} </p>
              <span onClick={handleOpenSignupModal} className="joinBtn">
                {props.community?.hero_button_title}{" "}
                <img src={arrow} alt="arrow" />
              </span>
            </div>
            <ul className="communityHeroImages">
              {props.community?.hero_image?.map((item, i) => (
                <li key={i}>
                  <img src={item.image} alt={`hero img ${i + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          spy={true}
          smooth={true}
          duration={500}
          className="scrollBtn"
        >
          <img className="scrollText" src={scrollText} alt="text" />
          <img className="angleText" src={angleDown} alt="angle" />
        </Link>
      </div>
      <Element name="test1">
        <div
          className="communityAboutArea"
          style={{
            background: `url(${aboutBg}) no-repeat center center / cover`,
          }}
        >
          <div className="mainContainer">
            <div className="communityAboutContainer">
              <div className="communityAboutImg">
                <img
                  src={props.community?.supportive_image}
                  alt={props.community?.supportive_title}
                />
              </div>
              <div className="communityAboutContent">
                <h2>{props.community?.supportive_title}</h2>
                <h3 className="aboutSub">
                  {props.community?.supportive_sub_title}
                </h3>

                <p>{props.community?.supportive_paragraph}</p>

                {/* <span
                  onClick={handleOpenSignupModal}
                  className="joinBtn joinBtnWhite mt-30"
                >
                  {props.community?.supportive_button_title}{" "}
                  <img src={angleRight} alt="arrow"/>
                </span> */}
                <a
                  href={props.community?.supportive_button_link}
                  className="joinBtn joinBtnWhite mt-30"
                  onClick={handleClickTop}
                >
                  {props.community?.supportive_button_title}{" "}
                  <img src={angleRight} alt="arrow" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Element>

      <div className="communityFeaturesArea">
        <div className="mainContainer">
          <div className="communityFeaturesContainer communityContain">
            <ul className="communityFeaturesImages">
              {props.community?.feature_image !== undefined && (
                <Fragment>
                  <li>
                    <img
                      src={props.community?.feature_image[0]?.image}
                      alt="feature"
                    />
                    <img
                      src={props.community?.feature_image[1]?.image}
                      alt="feature"
                    />
                  </li>
                  <li>
                    <img
                      src={props.community?.feature_image[2]?.image}
                      alt="feature"
                    />
                  </li>
                </Fragment>
              )}
            </ul>
            <div className="communityFeaturesWrap">
              <div className="communityFeaturesWrapTop">
                <h4>{props.community?.feature_title}</h4>

                <span onClick={handleOpenSignupModal} className="joinBtn">
                  {props.community?.feature_button_title}{" "}
                  <img src={arrow} alt="arrow" />
                </span>
              </div>
              <ul className="communityFeaturesItems">
                {props.community?.features?.map((item, i) => (
                  <li key={i}>
                    <h4>{item.title}</h4>
                    <p>{item.paragraph}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  community: state.cms.community_data,
});

export default connect(mapStateToProps, {
  getCommunityDetailsAction,
})(withRouter(Community));
