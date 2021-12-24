import React from "react";
import { Link } from "react-router-dom";
// images
import cradit from "../../assets/images/icons/cradit.svg";
import "./style.scss";

const FooterBottom = () => {
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="footerBottomArea">
      <div className="footerBottomContainer">
        <div className="d-flex flex-wrap justify-content-between footerBottomMenu">
          <ul className="footerMenu">
            <li>
              <Link onClick={handleClickTop} to="/request-a-feature">
                Request Feature
              </Link>
            </li>
            <li>
              <Link onClick={handleClickTop} to="/report-a-problem">
                Report Problem
              </Link>
            </li>
            <li>
              <Link onClick={handleClickTop} to="/contact-us">
                Contact Us
              </Link>
            </li>
            <li>
              <Link onClick={handleClickTop} to="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link onClick={handleClickTop} to="/terms-of-service">
                Terms of Use
              </Link>
            </li>
          </ul>
          <p className="copyright">© All Rights Reserved</p>
        </div>
        <p className="cradit">
          Designed and developed by{" "}
          <a
            href="https://www.brethren.co"
            target="_blank"
            className="credit-link"
            rel="noreferrer"
          >
            <img src={cradit} alt="Brethren" />
          </a>
        </p>
      </div>
    </footer>
  );
};
export default FooterBottom;
