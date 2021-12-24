import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
// images
import loginBg from "../../assets/images/bg/login.svg";
import menuBg from "../../assets/images/bg/menu/resources.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import email from "../../assets/images/icons/email.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SubmitLoader from "../../components/SubmitLoader";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
// actions
import { signupAction } from "./actions";
import "./style.scss";

const cookie = new Cookies();
const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
  password: Yup.string().required("password can not be empty").min(8),
  reEnter_password: Yup.string()
    .required("confirm password can not be empty")
    .oneOf([Yup.ref("password"), null], "password dose not match"),
});

const Signup = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [ipAddress, getIpAddress] = useState("");
  const [state, setState] = useState({
    show_pass: false,
    con_pass: false,
  });
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  useEffect(() => {
    cookie.remove("verify_email");
    if (cookie.get("user_token")) {
      props.history.goBack();
    }
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        getIpAddress(res.ip);
      })
      .catch((err) => console.error("Problem fetching my IP", err));
  }, []);
  const initialState = {
    email: "",
    password: "",
    reEnter_password: "",
  };

  const handleSubmit = (values, actions) => {
    const data = {
      email: values.email,
      password: values.password,
      ip: ipAddress,
    };
    props.signupAction(data, actions, props.history);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Sign Up For Free - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
       isOpen={openMenu} 
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="SIGN UP"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />
      <div
        style={{
          background: `url(${loginBg}) no-repeat center center / cover`,
        }}
        className="loginArea signupArea"
      >
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form className="loginForm">
                <h1 className="loginTitle">Sign Up For Free</h1>
                <p className="loginContent">
                  You take care of others all day. Let us take care of you.
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
                  />
                  <Field
                    id="password"
                    name="password"
                    component={TextInput}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Choose Password*"
                    icons={!state.show_pass ? eye_visible : eye_Invisible}
                    type={state.show_pass ? "text" : "password"}
                    showPassHandler={() =>
                      setState({
                        ...state,
                        show_pass: !state.show_pass,
                      })
                    }
                  />
                  <Field
                    id="reEnter_password"
                    name="reEnter_password"
                    component={TextInput}
                    value={values.reEnter_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Re-enter Password*"
                    icons={!state.con_pass ? eye_visible : eye_Invisible}
                    type={state.con_pass ? "text" : "password"}
                    showPassHandler={() =>
                      setState({
                        ...state,
                        con_pass: !state.con_pass,
                      })
                    }
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
                        Create Account <img src={angleRight} alt="angle" />
                      </>
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
        <h5 className="accountHelperText">JOIN THE FAMILY</h5>
        <span style={{ width: `20%` }} className="signupProgressBar"></span>
      </div>
      <FooterBottom />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  meta: state.meta,
});

export default connect(mapStateToProps, { signupAction })(withRouter(Signup));
