import React, { Fragment } from "react";
import { Element } from "react-scroll";
import Slider from "react-slick";
import Typewriter from "typewriter-effect";
// images
import arrow from "../../../assets/images/arrow.svg";
import angleIcon from "../../../assets/images/icons/angle.svg";
import searchIcon from "../../../assets/images/icons/search.svg";
import threeDotsIcon from "../../../assets/images/icons/three-dots.svg";
import image1 from "../../../assets/images/perfect/img1.png";
import image2 from "../../../assets/images/perfect/img2.png";
import image3 from "../../../assets/images/perfect/img3.png";
import {
  NextArrow,
  PrevArrow,
} from "../../../components/uielements/sliderArrows";
import { SEC_FOUR } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const imagess = [image1, image2, image3];
const WhoPerfect = (props) => {
  const {ownRef, elRef} = useAnimRef({  section: SEC_FOUR, id: 3 })

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    centerMode: true,
    centerPadding: "40px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    className: "whoPerfectSlider responisveSlickTrigger",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Element name="serviceID">
      <section ref={elRef} className="whoPerfectArea">
        <div className="whoPerfectContent">
          <h2>{props.data?.who_title}</h2>
          <p>{props.data?.who_paragraph}</p>
          <span onClick={props.openSignup} className="joinBtn">
            {props.data?.who_button_title} <img src={arrow} alt="arrow" />
          </span>
        </div>
        {window.innerWidth > 767 ? (
          <ul className="whoVideoItems">
            {props.data?.who_items?.map((item, i) => (
              <li className="whoVideoWrap" key={i}>
                <video autoPlay loop muted>
                  <source src={item.video} type="video/mp4" />
                </video>
                <span
                  className="videoBg"
                  style={{
                    background:
                      (i === 0 &&
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 14.19%, rgba(37, 72, 68, 0) 35.48%, #6ED5CA 100%)") ||
                      (i === 1 &&
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 12.9%, rgba(0, 0, 0, 0) 40.32%, #EEBA54 100%)") ||
                      (i === 2 &&
                        "linear-gradient(180deg, rgba(0, 0, 0, 0.4) 13.54%, rgba(0, 0, 0, 0) 38.02%, #54A7D9 100%)"),
                  }}
                ></span>
                <span
                  className="videobarBg"
                  style={{
                    background:
                      (i === 0 &&
                        "linear-gradient(180deg, #98F8ED 0%, #6ED5CA 100%), #6DCBE8") ||
                      (i === 1 &&
                        "linear-gradient(180deg, #FF731B 0%, rgba(255, 115, 27, 0) 100%), #EEBA54") ||
                      (i === 2 &&
                        "linear-gradient(180deg, #54A7D9 0%, #BAE5FF 100%), #BAE5FF"),
                  }}
                ></span>
                <div className="whoVideoContnet">
                  <h4>{item.title}</h4>
                  <Typewriter
                    options={{
                      strings: item.animated_text,
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Fragment>
            <Slider {...settings}>
              {props.data?.who_items?.map((item, i) => (
                <div className="whoVideoWrap" key={i}>
                  <img src={imagess[i]} alt={item.title} loading='lazy' />
                  <div className="whoVideoContnet">
                    <h4>{item.title}</h4>
                    <span
                      className={
                        (i === 0 && "icon1 icon") ||
                        (i === 1 && "icon2 icon") ||
                        (i === 2 && "icon3 icon")
                      }
                    >
                      <img
                        src={
                          (i === 0 && angleIcon) ||
                          (i === 1 && searchIcon) ||
                          (i === 2 && threeDotsIcon)
                        }
                        alt=""
                      />
                      <Typewriter
                        options={{
                          strings: item.animated_text,
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </Slider>
          </Fragment>
        )}
      </section>
    </Element>
  );
};
export default WhoPerfect;
