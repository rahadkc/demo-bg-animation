import React, { forwardRef } from "react";
import Marquee from "react-fast-marquee";
import { Element } from "react-scroll";
import Slider from "react-slick";
import arrow from "../../../assets/images/arrow.svg";
import aboutBg from "../../../assets/images/bg/about-bg.svg";
import { SEC_TWO } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const About = forwardRef((props, ref) => {
  const {elRef} = useAnimRef({  section: SEC_TWO, id: 1 })

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Element name="test1">
      <section ref={elRef}
        style={{
          // background: `url(${aboutBg}) no-repeat center center / cover`,
        }}
        className="aboutArea"
      >
        {/* <div className="aboutBg">
        <img src={aboutBg} alt="bg" />
      </div> */}
        <div className="AboutContainer">
          <div className="aboutImg">
            <Slider {...settings}>
              {props.data?.what_image?.map((item, i) => (
                <img key={i} src={item.image} alt="about" loading='lazy' />
              ))}
            </Slider>
          </div>
          <div className="aboutContent">
            <div>
              <h2>{props.data?.what_title} </h2>
              <h3 className="aboutSub">{props.data?.what_sub_title}</h3>
              <h4 className="text">{props.data?.what_paragraph}</h4>
              <span className="joinBtn" onClick={props.openSignup}>
                {props.data?.what_button_title} <img src={arrow} alt="arrow" />
              </span>
            </div>
          </div>
        </div>
        <Marquee speed={50} className="aboutTitle">
          {props.data?.parallax_title}
        </Marquee>
      </section>
    </Element>
  );
});
export default About;
