import React, {Fragment, useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import successCardBg from "../../../assets/images/bg/account/premium.svg";
// images
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import Header from "../../../components/header";
import LeftSideMenu from "../../../components/leftmenu";
import MainMenu from "../../../components/mainMenu";
import menuBg from "../../../assets/images/bg/menu/account.svg";
import FooterBottom from "../../../components/footerBottom";
import Cookies from "universal-cookie";
import {connect} from "react-redux";
import {getAccountInformation} from "../../account/actions";
import {community_url} from "../../../utils/constants";
import "./style.scss";

const cookie = new Cookies();

const UpgradeBasicToPremium = (props) => {
  const user_token = cookie.get("user_token");
  const [openMenu, setOpenMenu] = useState(false);

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    if (!user_token) {
      props.history.push("/login");
    }

    props.getAccountInformation();
  }, []);

  useEffect(() => {
    const data = {
      is_complete: props?.user_info?.is_complete,
      role: props?.user_info?.role,
      subscription_type: props?.user_info?.subscription_type,
      email_verified_at: props?.user_info?.email_verified_at,
    };

    cookie.set("user_info", data, {
      path: "/",
      expires: new Date(Date.now() + 3600 * 1000 * 24),
    });
  }, [props.user_info]);

  return (
    <Fragment>
      <Helmet>
        <title>You did it - Clarity Cooperative</title>
      </Helmet>
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="YOU DID IT"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <div
        style={{
          background: `linear-gradient(134.91deg, #7ADBD1 15.27%, #54A7D9 84.44%)`,
        }}
        className="loginArea signupArea premium_container"
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
          <h2>THANKS FOR BECOMING A PREMIUM MEMBER.</h2>
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
      <FooterBottom/>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
});

export default connect(mapStateToProps, {
  getAccountInformation,
})(withRouter(UpgradeBasicToPremium));
