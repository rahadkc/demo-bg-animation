import React, {useState} from "react";
import {connect} from "react-redux";
import {Link, NavLink, withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import responsiveMenuBg from "../../../assets/images/bg/responsive.svg";
import dots from "../../../assets/images/close-btn.svg";
import menuBar from "../../../assets/images/icons/there-dots-black.svg";
import logo from "../../../assets/images/logo-white.svg";
import blackLogo from "../../../assets/images/logo.svg";
import whiteBigLogo from "../../../assets/images/white-big-logo.svg";
import {logoutAction} from "../../../containers/login/actions";
import "./style.scss";
import {community_url} from "../../../utils/constants";

const AdminHeader = (props) => {
  const cookie = new Cookies();
  const [responsive, setResponsive] = useState(false);

  const handleClickLogout = () => {
    cookie.remove("user_token", {
      path: "/",
      expires: new Date(Date.now() + (3600 * 1000 * 24)),
    });
    cookie.remove("user_info", {
      path: "/",
      expires: new Date(Date.now() + (3600 * 1000 * 24)),
    });
    props.history.push("/");
  };

  return (
    <header className="adminHeaderArea">
      <div className="mainContainer">
        <div className="adminHeaderContainer">
          <Link className="logo" to="/">
            <img src={blackLogo} alt="logo"/>
          </Link>

          <ul className="adminMainmenu d-none d-md-flex">
            <li>
              <NavLink activeClassName="active" to="/admin/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/pages">
                Pages
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/resources">
                Resources
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/insurances">
                Insurances
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/upcoming-features">
                Upcoming Features
              </NavLink>
            </li>
            <li>
              <a
                target="_blank"
                href={community_url}
                rel="noreferrer"
              >
                Forum
              </a>
            </li>
            <li>
              <NavLink activeClassName="active" to="/admin/blacklist">
                Blacklist
              </NavLink>
            </li>
          </ul>
          <div
            onClick={() => setResponsive(!responsive)}
            className="responsive-trigger d-block d-md-none"
          >
            <img src={menuBar} alt="menu"/>
          </div>
          <span onClick={handleClickLogout} className="logout d-none d-md-flex">
            Sign Out
          </span>
        </div>
      </div>
      <div
        style={{
          background: `url(${responsiveMenuBg}) no-repeat center center / cover`,
        }}
        className={`mainmenuArea ${responsive ? "active" : ""}`}
      >
        <div className="mainmenuLeft">
          <NavLink className="logo" to="/">
            <img className="normalLogo" src={logo} alt="logo"/>
            <img className="responsiveLogo" src={whiteBigLogo} alt="logo"/>
          </NavLink>
          <span
            onClick={() => setResponsive(!responsive)}
            className="closeMenu"
          >
            <img src={dots} alt="dot"/>
          </span>
        </div>
        <ul className="menuItems">
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to="/admin/users"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to="/admin/pages"
            >
              Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to="/admin/resources"
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to="/admin/upcoming-features"
            >
              Upcoming Features
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to={community_url}
            >
              Forum
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setResponsive(!responsive)}
              activeClassName="active"
              to="/admin/blacklist"
            >
              Blacklist
            </NavLink>
          </li>
        </ul>
        <span
          onClick={handleClickLogout}
          className="mt-4 logoutAdmin menuJoinNow d-inline-flex d-md-none"
        >
          Log Out
        </span>
      </div>
    </header>
  );
};

export default connect(null, {
  logoutAction
})(withRouter(AdminHeader));
