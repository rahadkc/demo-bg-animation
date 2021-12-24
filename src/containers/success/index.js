import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NotfoundShape from "../../assets/images/404-shape.svg";
import successCardBg from "../../assets/images/bg/success-bg.svg";
// images
import successBg from "../../assets/images/bg/success.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
// compoennst
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import "./style.scss";

const Success = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Success - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu  className="sidebarShadowChange" title="SUCCESS" />
      <Header className="headerStyleWhite" logoWhite={true} />
      <div
        style={{
          background: `url(${successBg}) no-repeat center center / cover`,
        }}
        className="successArea"
      >
        <div
          style={{
            background: `url(${successCardBg}) no-repeat center center / cover`,
          }}
          className="successWrapper"
        >
          <img className="confirmShape" src={NotfoundShape} alt="shape" />

          <h1 style={{fontSize: '145px'}}>SUCCESS</h1>
          <div className="successContent">
            <p>Now don’t let it happen again... Just kidding!</p>
            <Link to="/login" className="loginBtn">
              Log In Now <img src={angleRight} alt="angle" />
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Success;
