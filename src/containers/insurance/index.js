import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./insurance.scss";

// images
import menuBg from "../../assets/images/bg/menu/home.svg";
import Disclaimer from "../../components/disclaimer";
import FooterBottom from "../../components/footerBottom";

// components
import Header from "../../components/header";
import HeroSection from "../../components/insurance/HeroSection";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import SignupModal from "../../components/signupModal";
import Why from "../../components/insurance/Why";
import CallToAction from "../../components/insurance/calltoaction";
import Faq from "../../components/insurance/faq";
import {
  getInsuranceListAction,
  getInsuranceCMSData,
} from "../admin/dashboard/actions";
import { Element } from "react-scroll";
import parse from 'html-react-parser';
import { connect } from "react-redux";
import SatisfactionGuaranteed from "./SatisfactionGuaranteed";

const Index = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    props.getInsuranceListAction();
    props.getInsuranceCMSData();
  }, []);

  const data = props?.insurance_cms;

  return (
    <Fragment>
      <Helmet>
        <title>Insurance - Clarity Cooperative</title>
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

      <HeroSection data={data} />
      <Element name="calltoaction">
        <CallToAction data={data} />
      </Element>

      <Element name="why">
        <Why data={data} />
      </Element>

      <div className="insurancetype">
        <div className="insurancetype__container">
          <div className="insurancetype_title_wrapper">
            <h1>{parse(data?.plan_title || '') || ""}</h1>

            <b>{data?.plan_sub_title || ""}</b>

            <p>
              {data?.plan_details || ""}
            </p>
          </div>


          <Link to={data?.plan_button_link} className="insurancetype__viewplan">
            {data?.plan_button_title || ""}
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

          <div className="insurancetype__info">
            {props?.insurances?.insurances?.map((item) => (
              <Link to={`/how-it-works`}>
                <div className="allinsurance__info_box">
                  <img src={item.icon} alt="" />
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <SatisfactionGuaranteed data={data} />
      <Faq />

      <Disclaimer data={data} />

      {/* <Footer /> */}
      <FooterBottom />
      <SignupModal isOpen={isModal} onClosed={() => setIsModal(false)} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  insurances: state.admin.insurances,
  insurance_cms: state.admin.insurance_cms,
});

export default connect(mapStateToProps, {
  getInsuranceListAction,
  getInsuranceCMSData,
})(Index);