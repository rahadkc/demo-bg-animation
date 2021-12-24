import React, {Fragment, useEffect} from "react";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import successCardBg from "../../../assets/images/bg/account/founder.svg";
// images
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import Cookies from "universal-cookie";
import {connect} from "react-redux";
import {getAccountInformation} from "../../account/actions";
import {community_url} from "../../../utils/constants";
import "./style.scss";

const cookie = new Cookies();

const AccountCompleteFounder = (props) => {
  const user_token = cookie.get("user_token");

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!user_token) {
      props.history.push("/login");
    }

    props.getAccountInformation();
  }, []);

  return (
    <Fragment>
      <div
        style={{
          background: `linear-gradient(90deg, #29298E 0%, #114BCE 100%)`,
        }}
        className="loginArea signupArea ac_founder_container"
      >
        <div
          style={{
            backgroundImage: `url(${successCardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="successWrapper"
        >
          <h2>THANKS FOR BECOMING A FOUNDER MEMBER.</h2>
          <div className="didContent">
            <p>You’re about to gain a whole new level of clarity.</p>
            <Link
              onClick={handleClickTop}
              to="/resources"
              className="joinBtnWhite joinBtn"
            >
              Start Exploring <img src={angleRight} alt="angle"/>
            </Link>
            <a
              onClick={handleClickTop}
              href={community_url}
              target="_blank"
              className="joinBtnWhite joinBtn ml-4"
              rel="noreferrer"
            >
              Go To Forum <img src={angleRight} alt="angle"/>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation,
})(withRouter(AccountCompleteFounder));
