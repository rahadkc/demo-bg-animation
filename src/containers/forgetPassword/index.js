import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
// images
import loginBg from "../../assets/images/bg/login.svg";
import menuBg from "../../assets/images/bg/menu/account.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import email from "../../assets/images/icons/email2.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SubmitLoader from "../../components/SubmitLoader";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { forgetPasswordAction } from "./actions";
import "./style.scss";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
});
const cookie = new Cookies();

const ForgetPassword = (props) => {
  const initialState = {
    email: "",
  };
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  const handleSubmit = (values, actions) => {
    props.forgetPasswordAction(values, actions, props.history);
  };
  useEffect(() => {
    cookie.remove("forget_email");
    if (cookie.get("user_token")) {
      props.history.goBack();
    }
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>Forgot Your Password - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu  isOpen={openMenu}  className="sidebarShadowChange" title="FORGOT PASSWORD?" />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <div
        style={{
          background: `url(${loginBg}) no-repeat center center / cover`,
        }}
        className="loginArea"
      >
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form className="loginForm">
                <h1 className="loginTitle">
                  Forgot Your <br /> Password?
                </h1>
                <p className="loginContent">
                  If you need help finding your password, don’t worry! It <br />{" "}
                  happens. Just fill out the form below and we’ll help.
                </p>
                <div className="accountCard">
                  <Field
                    id="email"
                    name="email"
                    component={TextInput}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="E-mail*"
                    icons={email}
                    className="mb-0"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="submit"
                    className="loginBtn"
                    disabled={props.meta.isLoading}
                  >
                    {props.meta.isLoading ? (
                      <>
                        Sending... <SubmitLoader />
                      </>
                    ) : (
                      <>
                        Next <img src={angleRight} alt="angle" />
                      </>
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <FooterBottom />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  meta: state.meta,
});

export default connect(mapStateToProps, { forgetPasswordAction })(withRouter(ForgetPassword));
