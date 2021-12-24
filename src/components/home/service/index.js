import React, { forwardRef } from "react";
import { Link } from "react-scroll";
import angleDown from "../../../assets/images/angle-down.svg";
// images
import arrow from "../../../assets/images/arrow.svg";
import serviceBg from "../../../assets/images/bg/service.svg";
import scrollText from "../../../assets/images/scroll.svg";
import { SEC_THREE } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const Service = forwardRef((props, ref) => {
  const {elRef} = useAnimRef({  section: SEC_THREE, id: 2 })

  return (
    <section ref={elRef} className="serviceArea">
      <div ref={ref}  className="serviceBg">
        {/* commented by Rahad */}
        {/* <img src={serviceBg} alt="bg" loading='lazy'/>  */}
      </div>
      <Link
        to="serviceID"
        spy={true}
        smooth={true}
        duration={500}
        className="scrollBtn serviceScroll"
      >
        <img className="scrollText" src={scrollText} alt="text" />
        <img className="angleText" src={angleDown} alt="angle" />
      </Link>
      <div className="serviceMainContainer">
        <div className="serviceContent">
          <h2>{props.data?.help_title}</h2>
          <h3 className="serviceSub">{props.data?.help_sub_title}</h3>
          <h4 className="text">{props.data?.help_paragraph}</h4>
          <span onClick={props.openSignup} className="joinBtn">
            {props.data?.help_button_title} <img src={arrow} alt="arrow" />
          </span>
        </div>
        <div className="serviceItemsWrap">
          <ul className="serviceItem">
            {props.data?.help?.map((item, i) => (
              <li key={i}>
                <h4 className="all-caps">{item.title}</h4>
                <p>{item.paragraph}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});
export default Service;
