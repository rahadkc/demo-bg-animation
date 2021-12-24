import React from "react";
import {Link} from "react-router-dom";
import {Link as ScrollLink} from "react-scroll"
import heroBg from "../../assets/images/bg/community.svg";
import angleDown from "../../assets/images/angle-down.svg";
import scrollText from "../../assets/images/scroll.svg";
import "./style.scss";
import parse from "html-react-parser";

const HeroSection = ({data}) => {
  return (
    <div className="insuranceHeroArea">
      <img className="insuranceShape" src={heroBg} alt="shape"/>
      <div className="mainContainer">
        <div className="insuranceHeroContainer_wrapper">
          <div className="insuranceHeroContent_titles_wrapper">
            <div className="insuranceHeroContent">
              <span className="category">
                {parse(data?.hero_title_small || "")}
              </span>

              <h1>{parse(data?.hero_title || "")}</h1>
              {data?.hero_sub_title ? (
                <p>{parse(data?.hero_sub_title || "")}</p>
              ) : null}

              <Link to="/how-it-works" className="insurance__viewplan">
                {data?.hero_button_title}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className="insuranceHeroImages">
            <div className="insuranceHeroImages_wrapper">
              {data?.hero_image1 !== undefined && (
                <div>
                  <img src={data?.hero_image1} alt="hero img"/>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ScrollLink
        to="calltoaction"
        spy={true}
        smooth={true}
        duration={500}
        className="scrollBtn"
      >
        <img className="scrollText" src={scrollText} alt="text"/>
        <img className="angleText" src={angleDown} alt="angle"/>
      </ScrollLink>
    </div>
  );
};

export default HeroSection;
