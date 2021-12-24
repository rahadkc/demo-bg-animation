import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import useResizeObserver from "use-resize-observer";
import angleDown from "../../../assets/images/angle-down.svg";
import arrow from "../../../assets/images/arrow.svg";
// images
import logo from "../../../assets/images/big-logo.svg";
import image1 from "../../../assets/images/hero/img1.jpg";
import image2 from "../../../assets/images/hero/img2.jpg";
import image3 from "../../../assets/images/hero/img3.jpg";
import scrollText from "../../../assets/images/scroll.svg";
import { SEC_ONE } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const images_arr = [image1, image2, image3];
const Hero = (props) => {


  
  const { elRef } = useAnimRef({  section: SEC_ONE, id: 0 })

  return (
    <section ref={elRef} className="heroArea">
      {/* commented by Rahad */}
      {/* <div className="heroBg"></div> */}
      <div className="heroMainContainer">
        <div className="heroContainer">
          <div className="heroContent">
            <NavLink className="heroLogo" to="/">
              <img src={logo} alt="logo" />
            </NavLink>
            <h1>{props.data?.hero_title}</h1>
            <p>{props.data?.hero_sub_title}</p>
            <span onClick={props.openSignup} className="joinBtn">
              {props.data?.hero_button_title} <img src={arrow} alt="arrow" />
            </span>
          </div>

          {window.innerWidth > 767 ? (
            <ul className="heroVideos">
              {props.data?.hero_video?.slice(0, 1).map((item, i) => (
                <li key={i}>
                  <div className="herovideo">
                    <video autoPlay loop muted>
                      <source src={item.video} type="video/mp4" />
                    </video>
                    <span
                      className="videoBg"
                      style={{
                        background:
                          i === 0 &&
                          "linear-gradient(180deg, rgba(238, 186, 84, 0) 0%, #EEBA54 100%)",
                      }}
                    ></span>
                    <span
                      className="videobarBg"
                      style={{
                        background:
                          i === 0 &&
                          "linear-gradient(180deg, #FF731B 0%, rgba(255, 115, 27, 0) 100%), #EEBA54",
                      }}
                    ></span>
                  </div>
                </li>
              ))}
              <li>
                {props.data?.hero_video?.slice(1, 3).map((item, i) => (
                  <div key={i} className="herovideo">
                    <video autoPlay loop muted>
                      <source src={item.video} type="video/mp4" />
                    </video>

                    <span
                      className="videoBg"
                      style={{
                        background:
                          (i === 0 &&
                            "linear-gradient(180deg, rgba(246, 114, 194, 0) 0%, #F672C2 100%)") ||
                          (i === 1 &&
                            "linear-gradient(180deg, rgba(132, 218, 218, 0) 0%, #84DADA 100%)"),
                      }}
                    ></span>
                    <span
                      className="videobarBg"
                      style={{
                        background:
                          (i === 0 &&
                            "linear-gradient(180deg, #F672C2 0%, #F672C2 0%, #FFD9EB 100%), #FFD9EB") ||
                          (i === 1 &&
                            "linear-gradient(180deg, #98F8ED 0%, #6ED5CA 100%), #6DCBE8"),
                      }}
                    ></span>
                  </div>
                ))}
              </li>
            </ul>
          ) : (
            <ul className="heroVideos">
              {images_arr?.slice(0, 1).map((item, i) => (
                <li key={i}>
                  <div className="herovideo">
                    <img src={item} alt="imagesss" loading="lazy" />
                    <span
                      className="videoBg"
                      style={{
                        background:
                          i === 0 &&
                          "linear-gradient(180deg, rgba(238, 186, 84, 0) 0%, #EEBA54 100%)",
                      }}
                    ></span>
                    <span
                      className="videobarBg"
                      style={{
                        background:
                          i === 0 &&
                          "linear-gradient(180deg, #FF731B 0%, rgba(255, 115, 27, 0) 100%), #EEBA54",
                      }}
                    ></span>
                  </div>
                </li>
              ))}
              <li>
                {images_arr?.slice(1, 3).map((item, i) => (
                  <div key={i} className="herovideo">
                    <img src={item} alt="imagess" />

                    <span
                      className="videoBg"
                      style={{
                        background:
                          (i === 0 &&
                            "linear-gradient(180deg, rgba(246, 114, 194, 0) 0%, #F672C2 100%)") ||
                          (i === 1 &&
                            "linear-gradient(180deg, rgba(132, 218, 218, 0) 0%, #84DADA 100%)"),
                      }}
                    ></span>
                    <span
                      className="videobarBg"
                      style={{
                        background:
                          (i === 0 &&
                            "linear-gradient(180deg, #F672C2 0%, #F672C2 0%, #FFD9EB 100%), #FFD9EB") ||
                          (i === 1 &&
                            "linear-gradient(180deg, #98F8ED 0%, #6ED5CA 100%), #6DCBE8"),
                      }}
                    ></span>
                  </div>
                ))}
              </li>
            </ul>
          )}

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
      </div>
    </section>
  );
};
export default Hero;
