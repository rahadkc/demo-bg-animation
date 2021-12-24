import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
// images
import arrow from "../../../assets/images/arrow.svg";
import shape1 from "../../../assets/images/shape1.svg";
import {
  NextArrow,
  PrevArrow,
} from "../../../components/uielements/sliderArrows";
import { SEC_SEVEN } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const Horizon = (props) => {
  const { elRef } = useAnimRef({ section: SEC_SEVEN, id: 6 })

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
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section ref={elRef} className="horizonArea">
      <img className="horizonShape1" src={shape1} alt="images" />
      <div className="horizonContainer">
        <div className="horizonContentWrap">
          <h2 className="horizonTitle">{props.data?.feature_title}</h2>
          <div className="horizonContent">
            <p>{props.data?.feature_paragraph}</p>
            <Link
              onClick={handleClickTop}
              className="joinBtn"
              to="/upcoming-features"
            >
              {props.data?.feature_button_title} <img src={arrow} alt="arrow" />
            </Link>
          </div>
        </div>

        <ul className="horizonImages">
          {props.feature_list?.data?.map((item, i) => (
            <li
              key={item.id}
              className={`feature-card ${`feature-card` + (i + 1)}`}
            >
              <h4>{item.name}</h4>
              <img src={item.image} alt={item.name} />
            </li>
          ))}
        </ul>

        <div className="d-desktop-none">
          <Slider {...settings}>
            {props.feature_list?.data?.slice(0, 3)?.map((item, i) => (
              <div
                key={item.id}
                className={`feature-card ${`feature-card` + (i + 1)}`}
              >
                <h4>{item.name}</h4>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
export default Horizon;
