import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
// images
import loginBg from "../../assets/images/bg/login.svg";
import menuBg from "../../assets/images/bg/menu/request.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import email from "../../assets/images/icons/email2.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import { adminLoginAction } from "./actions";
import "./style.scss";

const cookie = new Cookies();

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
  password: Yup.string().required("password can not be empty").min(8),
});

const AdminLogin = (props) => {
  const initialState = {
    email: "",
    password: "",
  };

  const [state, setState] = useState({
    show_pass: false,
  });

  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const handleSubmit = (values, actions) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    props.adminLoginAction(data, actions, props.history);
  };

  useEffect(() => {
    if (cookie.get("user_token")) {
      if (cookie.get("user_info").role === "User") {
        props.history.push('/my-account');
      } else {
        props.history.goBack();
      }
    }
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>Admin Login - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="ADMIN LOGIN"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        className="headerStyleWhite"
        openMenu={handleOpenMenu}
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
                <div className="text-center mb-5">
                  <h1 className="loginTitle">Admin Log In</h1>
                </div>

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
                    placeholder="Password*"
                    icons={!state.show_pass ? eye_visible : eye_Invisible}
                    type={state.show_pass ? "text" : "password"}
                    showPassHandler={() =>
                      setState({
                        ...state,
                        show_pass: !state.show_pass,
                      })
                    }
                    className="mb-0"
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="loginBtn">
                    Log In Now <img src={angleRight} alt="angle" />
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
export default connect(null, { adminLoginAction })(withRouter(AdminLogin));
