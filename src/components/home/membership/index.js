import React from "react";
// images
import arrow from "../../../assets/images/arrow.svg";
import { SEC_SIX } from "../../transition/constants";
import useAnimRef from "../../transition/useAnimRef";
import "./style.scss";

const Membership = (props) => {
  const { elRef } = useAnimRef({ section: SEC_SIX, id: 5 })

  return (
    <section ref={elRef} className="membershipArea">
      {/* commented by Rahad */}
      {/* <div className="membershipBg"></div> */}
      <div className="membarshipContainer">
        <div className="membarshipTitile">
          <h2>{props.data?.membership_title}</h2>
          <span onClick={props.openSignup} className="joinBtn">
            {props.data?.membership_button_title}{" "}
            <img src={arrow} alt="arrow" />
          </span>
        </div>
        <ul className="memberItems">
          {props.data?.membership?.map((item, i) => (
            <li key={i} className="memberItem">
              <div className="memberWrap">
                <img src={item.icon} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.paragraph}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
export default Membership;
