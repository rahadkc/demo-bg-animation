import React from "react";
import { Link } from "react-router-dom";
// import arrow from "../../assets/images/arrow.svg";
import heroBg from "../../assets/images/bg/community.svg";
import hero from "./hero.jpg";
import angleDown from "../../assets/images/angle-down.svg";
import scrollText from "../../assets/images/scroll.svg";
import "./style.scss";

const HeroSection = () => {
  return (
    <div className="insurancePricingHeroArea">
      <img className="insurancePricingShape" src={heroBg} alt="shape" />
      <div className="mainContainer">
        <div className="insurancePricingHeroContainer">
          <div className="insurancePricingHeroContent">
            <span className="category">INSURANCE</span>
            <h1>Join The Group.</h1>
            <h1>Get Insured.</h1>
            <p>Quality insurance for healthcare and wellness practitioners</p>
          </div>
          <ul className="insurancePricingHeroImages">
            <li>
              <img src={hero} alt="hero img" />
            </li>
          </ul>
        </div>
      </div>

      <Link
        to="test1"
        spy={true}
        smooth={true}
        duration={500}
        className="scrollBtn"
      >
        <img className="scrollText" src={scrollText} alt="text" />
        <img className="angleText" src={angleDown} alt="angle" />
      </Link>
    </div>
  );
};

export default HeroSection;
