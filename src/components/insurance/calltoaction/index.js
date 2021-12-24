import React from "react";
import "./calltoaction.scss";
import {Link} from "react-router-dom";
import {Link as ScrollLink} from "react-scroll";
import angleDown from "../../../assets/images/angle-white.svg";
import scrollText from "../../../assets/images/scroll-white.svg";
import parse from "html-react-parser";

const CallToAction = ({data}) => {
  return (
    <div className="calltoaction">
      <div className="calltoaction__container">
        <div className="calltoaction__image">
          <div>
            {data?.section2_client_image !== undefined && (
              <img
                src={data?.section2_client_image}
                className="callimage"
                alt={data?.section2_client_title}
              />)}
          </div>

          <div className="calltoaction__image_text">
            <h1>{parse(data?.section2_title || "")}</h1>
          </div>

          <ScrollLink
            to="why"
            spy={true}
            smooth={true}
            duration={500}
            className="calltoaction__scrollbtn"
          >
            <img className="scrollText" src={scrollText} alt="text"/>
            <img className="angleText" src={angleDown} alt="angle"/>
          </ScrollLink>
        </div>

        <div className="calltoaction__content">
          <div className="calltoaction__contentinside">
            <b>{data?.section2_client_title}</b>

            <div className="termsContent">
              {parse(data?.section2_client_description || "")}
            </div>

            <Link to={data?.section2_button_link}>
              {parse(data?.section2_button_title || "")}
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
      </div>
    </div>
  );
};

export default CallToAction;
