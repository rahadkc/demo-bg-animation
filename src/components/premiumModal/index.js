import React, {Fragment} from "react";
import {Modal} from "reactstrap";
import cancel from "../../assets/images/icons/cancel.svg";
import crose from "../../assets/images/icons/crose.svg";
import submit from "../../assets/images/icons/submit.svg";
import logo from "../../assets/images/logo.svg";
import "./style.scss";
import whitelogo from "../../assets/images/404-shape.svg";

const PremiumModal = (props) => {
  return (
    <Fragment>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        fade={false}
        onClosed={props.onClosed}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal blackListModal--premium"
      >
        <span onClick={props.onClosed} className="signupCroseBtn">
          <img src={crose} alt="crose"/>
        </span>
        <div className="blackListModalWrap">
          <div className="confirm__modal">
            <div className="confirm__left">
              <div className="confirm__top">
                <img src={logo} className="toplogo" alt=""/>
                <h3>{props.title}</h3>
                {props.content && <p>{props.content}</p>}

                <p className="confirm__price">{props.price}<span>/year</span></p>
              </div>

              <div className="confirm__bottom">
                <ul>
                  <li>Enroll in reduced rate health insurance plans</li>
                  <li>Participate in forum</li>
                  <li>Access to all higher impact downloadable resources</li>
                </ul>
              </div>


              <ul className="modalBtns">
                <li>
                  {props.submitBtn ? (
                    <button
                      type="submit"
                      onClick={() =>
                        props.submit(
                          props.values,
                        )
                      }
                      className="success"
                    >
                      Upgrade to Premium{" "}
                      <img src={submit} alt="submit"/>
                    </button>
                  ) : (
                    <button
                      onClick={props.submit}
                      className="success"
                    >
                      Upgrade to Premium{" "}
                      <img src={submit} alt="submit"/>
                    </button>
                  )}
                </li>
                <li>
                  <button
                    onClick={props.onClosed}
                    type="button"
                    className="error"
                  >
                    Maybe Later{" "}
                    <img src={cancel} alt="submit"/>
                  </button>
                </li>
              </ul>
            </div>
            <div className="confirm__right">
              <img src={whitelogo} alt=""/>
              <p>Premium</p>
              <span>Yearly Membership</span>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
export default PremiumModal;
