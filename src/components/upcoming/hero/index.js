import React from "react";
import { Link } from "react-scroll";
import angleDown from "../../../assets/images/angle-white.svg";
// images
import upcomingBg from "../../../assets/images/bg/upcoming.svg";
import scrollText from "../../../assets/images/scroll-white.svg";
import "./style.scss";

const UpcomingHero = (props) => {
  return (
    <section
      className="upcomingHeroArea"
      style={{
        background: `url(${upcomingBg}) no-repeat center center / cover`,
      }}
    >
      <div className="mainContainer">
        <div className="upcomingHeroContainer">
          <div className="upcomingHeroContent">
            <h2>{props.data?.hero_title}</h2>
            <p>{props.data?.hero_paragraph} </p>
          </div>
          <ul className="upcomingHeroImages">
            {props.data?.hero_image?.map((item, i) => (
              <li key={i}>
                <img src={item.image} alt="imagess" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to="test1"
        spy={true}
        smooth={true}
        duration={500}
        className="scrollBtn upcomingHeroScroll"
      >
        <img className="scrollText" src={scrollText} alt="text" />
        <img className="angleText" src={angleDown} alt="angle" />
      </Link>
    </section>
  );
};
export default UpcomingHero;
