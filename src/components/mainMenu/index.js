import React, { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import responsiveMenuBg from "../../assets/images/bg/responsive.svg";

import { logoutAction } from "../../containers/login/actions";
import "./style.scss";
import useLockBodyScroll from "../../utils/useLookBodyScroll";
import { community_url } from "../../utils/constants";
const cookie = new Cookies();

const MainMenu = ({
  title,
  className = "",
  bgImage,
  closeMenu,
  history,
  logoutAction,
}) => {
  const user_token = cookie.get("user_token");
  const handleClickLogout = () => {
    logoutAction(history);
  };

  useLockBodyScroll(className)

  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };

  return (

    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${window.innerWidth > 767 ? bgImage : responsiveMenuBg}) ,linear-gradient(160deg, rgba(119,125,239,1) 0%, rgb(162,204,216) 100%)`,
      }}
      className={`mainmenuArea ${className}`}
    >
    
        <svg onClick={closeMenu} width="30" height="30" fill="white" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      
      <ul className="menuItems">
        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/"
            exact
          >
            <span className="activeLine">01</span>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/resources"
            exact
          >
            <span className="activeLine">02</span>
            Resources
          </NavLink>
        </li>
        <li>
          {user_token ? (
            <a
              href={community_url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="activeLine">03</span>
              Community
            </a>
          ) : (
            <NavLink
              onClick={handleClickTop}
              activeClassName="active"
              to="/community"
            >
              <span className="activeLine">03</span>
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
            <span className="activeLine">04</span>
            Insurance
          </NavLink>
        </li>
        {cookie.get("user_info")?.subscription_type !== "PREMIUM" ? (
          <li>
            <NavLink
              onClick={handleClickTop}
              activeClassName="active"
              to="/membership"
            >
              <span className="activeLine">05</span>
              Membership
            </NavLink>
          </li>
        ) : null}
        <li>
          {window.innerWidth > 767 ? (
            <Fragment>
              {!cookie.get("user_token") ? (
                <NavLink
                  onClick={handleClickTop}
                  activeClassName="active"
                  to="/login"
                  exact
                >
                  <span className="activeLine">06</span>
                  MY ACCOUNT
                </NavLink>
              ) : (
                <Fragment>
                  {cookie.get("user_info")?.role === "Admin" ? (
                    <NavLink
                      onClick={handleClickTop}
                      activeClassName="active"
                      to="/admin/users"
                      exact
                    >
                      <span className="activeLine">05</span>
                      MY ACCOUNT
                    </NavLink>
                  ) : (
                    <NavLink
                      onClick={handleClickTop}
                      activeClassName="active"
                      to="/my-account"
                      exact
                    >
                      <span className="activeLine">05</span>
                      MY ACCOUNT
                    </NavLink>
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <NavLink
              onClick={handleClickTop}
              activeClassName="active"
              to="/upcoming-features"
            >
              Upcoming Features
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            onClick={handleClickTop}
            activeClassName="active"
            to="/contact-us"
            exact
          >
            <span className="activeLine">06</span>
            CONTACT US
          </NavLink>
        </li>
        <li>
          {cookie.get("user_token") ? (
            <ul className="mt-4 menuJoinNow d-inline-flex d-md-none">
              <li>
                {cookie.get("user_info")?.role === "Admin" ? (
                  <NavLink
                    onClick={handleClickTop}
                    className="signup"
                    to="/admin/users"
                    exact
                  >
                    My Account
                  </NavLink>
                ) : (
                  <Fragment>
                    {cookie.get("user_info")?.role === "Admin" ? (
                      <NavLink
                        onClick={handleClickTop}
                        className="signup"
                        to="/admin/users"
                        exact
                      >
                        My Account
                      </NavLink>
                    ) : (
                      <NavLink
                        onClick={handleClickTop}
                        className="signup"
                        to="/my-account"
                        exact
                      >
                        My Account
                      </NavLink>
                    )}
                  </Fragment>
                )}
              </li>
              <li>
                <span className="login" onClick={handleClickLogout}>
                  Log Out
                </span>
              </li>
            </ul>
          ) : (
            <ul className="mt-4 menuJoinNow d-inline-flex d-md-none">
              <li>
                <NavLink onClick={handleClickTop} className="signup" to="/signup">
                  Join For Free
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleClickTop} className="login" to="/login">
                  Log In
                </NavLink>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>

  );
};

export default connect(null, {
  logoutAction,
})(withRouter(MainMenu));
