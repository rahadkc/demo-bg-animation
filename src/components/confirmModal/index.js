import React, { Fragment } from "react";
import { Modal } from "reactstrap";
import cancel from "../../assets/images/icons/cancel.svg";
import crose from "../../assets/images/icons/crose.svg";
import submit from "../../assets/images/icons/submit.svg";

const ConfirmModal = (props) => {
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
          <h2>{props.title}</h2>
          {props.content && <p>{props.content}</p>}
          <ul className="modalBtns">
            <li>
              {props.submitBtn ? (
                <button
                  type="submit"
                  onClick={() => props.submit(props.values, props.dirty)}
                  className="success"
                >
                  Yes, Do It <img src={submit} alt="submit" />
                </button>
              ) : (
                <button onClick={props.submit} className="success">
                  Yes, Do It <img src={submit} alt="submit" />
                </button>
              )}
            </li>
            <li>
              <button onClick={props.onClosed} type="button" className="error">
                No, Don’t Do It <img src={cancel} alt="submit" />
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
};
export default ConfirmModal;
