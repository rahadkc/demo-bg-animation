import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { useLocation, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import menuBg from "../../assets/images/bg/menu/home.svg";
// images
import loginBg from "../../assets/images/bg/reset-password.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import TextInput from "../../components/formfields/InputField";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { resetPasswordAction } from "../forgetPassword/actions";
import "./style.scss";
import email from "../../assets/images/icons/email2.svg";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
  password: Yup.string().required("password can not be empty").min(8),
  reEnter_password: Yup.string()
    .required("confirm password can not be empty")
    .oneOf([Yup.ref("password"), null], "password dose not match"),
});
const cookie = new Cookies();

const ResetPassword = (props) => {
  const get_reset_email = cookie.get("forget_email");
  const [state, setState] = useState({
    show_pass: false,
    con_pass: false,
  });
  const { search } = useLocation();
  let query = new URLSearchParams(search);
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  const initialState = {
    email: "",
    password: "",
    reEnter_password: "",
  };
  const handleSubmit = (values, actions) => {
    const data = {
      password: values.password,
      email: values.email ?? get_reset_email?.email,
      token: query.get("token"),
    };
    props.resetPasswordAction(data, actions, props.history);
  };
  useEffect(() => {
    const token = query.get("token");
    if (!token) {
      props.history.push("/");
    }
  }, [query]);
  return (
    <Fragment>
      <Helmet>
        <title>Reset Password - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="SET A NEW PASSWORD"
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
                <h1 className="loginTitle mb-40">Reset Password</h1>

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
                    id="new_password*"
                    name="password"
                    component={TextInput}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter New Password*"
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
                    placeholder="Re-enter New Password*"
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
                  <button type="submit" className="loginBtn">
                    Change Password <img src={angleRight} alt="angle" />
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Fragment>
  );
};

export default connect(null, { resetPasswordAction })(
  withRouter(ResetPassword)
);