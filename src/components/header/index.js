import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import logo from "../../assets/images/big-logo.svg";
import blackLogo from "../../assets/images/black-logo.svg";
import menuBar from "../../assets/images/icons/there-dots-black.svg";
import logo2 from "../../assets/images/logo-2.svg";
import { getAccountInformation } from "../../containers/account/actions";
import { logoutAction } from "../../containers/login/actions";
import { community_url } from "../../utils/constants";
import "./style.scss";

const cookie = new Cookies();

const Header = (props) => {
  const user_token = cookie.get("user_token");

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClickLogout = () => {
    cookie.remove("user_token", {
      path: "/",
      expires: new Date(Date.now() + 3600 * 1000 * 24),
    });
    cookie.remove("user_info", {
      path: "/",
      expires: new Date(Date.now() + 3600 * 1000 * 24),
    });
    props.history.push("/");
  };

  useEffect(() => {
    if (cookie.get("user_token")) {
      props.getAccountInformation();
    }
  }, []);

  return (
    <header className={`${props.className} header-area`}>
      {props.logoWhite ? (
        <Link
          onClick={handleClickTop}
          className="d-md-none d-lg-block logo"
          to="/"
        >
          <img src={logo2} alt="logo" />
        </Link>
      ) : (
        <span className="blankDiv"></span>
      )}
      {props.blackLogo ? (
        <Link
          onClick={handleClickTop}
          className="d-md-none d-lg-block logo"
          to="/"
        >
          <img src={blackLogo} alt="logo" />
        </Link>
      ) : (
        <span className="blankDiv"></span>
      )}

      <Link onClick={handleClickTop} className="mobileLogo" to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul className={`mainmenu d-flex flex-wrap align-items-center`}>
        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/resources"
          >
            Resources
          </NavLink>
        </li>
        <li>
          {user_token ? (
            <a href={community_url} target="_blank" rel="noreferrer">
              Community
            </a>
          ) : (
            <NavLink
              onClick={handleClickTop}
              activeClassName="active"
              to="/community"
            >
              Community
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/insurance"
          >
            Insurance
          </NavLink>
        </li>

        {cookie.get("user_info")?.subscription_type === "BASIC" ||
        cookie.get("user_info")?.subscription_type === null||
        cookie.get('user_info')==null ? (
          <li>
            <NavLink
              onClick={handleClickTop}
              activeClassName="active"
              to="/membership"
            >
              Membership
            </NavLink>
          </li>
        ) : null}

        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/upcoming-features"
          >
            Upcoming Features
          </NavLink>
        </li>
      </ul>
      {user_token ? (
        <ul className="loginSignupMenu">
          <li>
            <span onClick={handleClickLogout} className="logout">
              Log Out
            </span>
          </li>
          <li>
            {cookie.get("user_info")?.role === "Admin" ? (
              <Link
                onClick={handleClickTop}
                className="myAccount"
                to="/admin/users"
                exact
              >
                My Account
              </Link>
            ) : (
              <Fragment>
                {cookie.get("user_info")?.role === "Admin" ? (
                  <NavLink
                    onClick={handleClickTop}
                    className="myAccount"
                    to="/admin/users"
                    exact
                  >
                    My Account
                  </NavLink>
                ) : (
                  <NavLink
                    onClick={handleClickTop}
                    className="myAccount"
                    to={`${props.isLoading ? "#" : "/my-account"}`}
                    exact
                  >
                    My Account
                  </NavLink>
                )}
              </Fragment>
            )}
          </li>
        </ul>
      ) : (
        <ul className="loginSignupMenu">
          <li>
            <Link onClick={handleClickTop} className="loginBtn" to="/login">
              Log In
            </Link>
          </li>
          <li>
            <Link onClick={handleClickTop} className="signupBtn" to="/signup">
              Join For Free
            </Link>
          </li>
        </ul>
      )}

      <div onClick={props.openMenu} className="responsive-trigger">
        <img src={menuBar} alt="menu" />
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
  isLoading: state.meta.isLoading,
});

export default connect(mapStateToProps, {
  logoutAction,
  getAccountInformation,
})(withRouter(Header));
