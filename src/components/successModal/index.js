import React, { Fragment } from "react";
import { Modal } from "reactstrap";
import crose from "../../assets/images/icons/crose.svg";
import submit from "../../assets/images/icons/submit.svg";

const SuccessModal = (props) => {
  return (
    <Fragment>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        fade={false}
        onClosed={props.onClosed}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span onClick={props.onClosed} className="signupCroseBtn">
          <img src={crose} alt="crose" />
        </span>
        <div className="blackListModalWrap">
          <h2>
            <span>Big Success!</span> {props.title}
          </h2>
          {props.content && <p>{props.content}</p>}
          <ul className="modalBtns">
            <li>
              <button
                type="submit"
                onClick={props.onClosed}
                className="success"
              >
                Continue
                <img src={submit} alt="submit" />
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
};
export default SuccessModal;
