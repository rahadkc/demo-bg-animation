import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import NotfoundShape from "../../assets/images/404-shape.svg";
import confirmBg2 from "../../assets/images/bg/confirm.jpg";
// images
import confirmBg from "../../assets/images/bg/upcoming.svg";
import reload from "../../assets/images/icons/reload.svg";
// compoennst
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import { forgetPasswordAction } from "../forgetPassword/actions";
import "./style.scss";
const cookie = new Cookies();

const ForgetPasswordConfirmEmail = (props) => {
  const get_reset_email = cookie.get("forget_email");
  const handleResetEmail = () => {
    props.forgetPasswordAction(get_reset_email);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Confirm E-mail - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu  className="sidebarShadowChange" title="CONFIRM E-MAIL" />
      <Header className="headerStyleWhite" logoWhite={true} />
      <div
        style={{
          background: `url(${confirmBg}) no-repeat center center / cover`,
        }}
        className="confirmEmailArea"
      >
        <div
          style={{
            background: `url(${confirmBg2}) no-repeat center center / cover`,
          }}
          className="confirmEmailWrap"
        >
          <img className="confirmShape" src={NotfoundShape} alt="shape" />

          <h1>CHECK YOUR E-MAIL</h1>
          <p>
            Please, check your E-mail! We’ve sent you an e-mail with a
            confirmation link.
          </p>
          <div className="resendEmail">
            Can’t find the e-mail?
            <strong onClick={handleResetEmail}>
              Resend It <img src={reload} alt="reload" />
            </strong>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default connect(null, { forgetPasswordAction })(
  ForgetPasswordConfirmEmail
);
