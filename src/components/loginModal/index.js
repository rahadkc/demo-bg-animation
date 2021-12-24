import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import crose from "../../assets/images/icons/crose.svg";
import email from "../../assets/images/icons/email2.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import { loginModalAction } from "../../containers/login/actions";
import TextInput from "../formfields/InputField";
const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
  password: Yup.string().required("password can not be empty").min(8),
});

const LoginModal = (props) => {
  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState({
    show_pass: false,
  });
  const handleSubmit = (values, actions) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    props.loginModalAction(data, actions, props.history, props.modal);
  };

  return (
    <Fragment>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        fade={false}
        onClosed={props.onClosed}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span onClick={props.onClosed} className="signupCroseBtn">
          <img src={crose} alt="crose" />
        </span>
        <div className="blackListModalWrap">
          <Formik
            initialValues={initialState}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ values, handleChange, handleBlur }) => {
              return (
                <Form className="loginForm">
                  <h1>Log In</h1>
                  <p>
                    Login and begin learning. We’re excited to be with you on
                    this journey.
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
                    <button type="submit" className="joinBtn">
                      Log In Now <img src={angleRight} alt="angle" />
                    </button>
                    <Link className="forgotPassword" to="/forget-password">
                      Forget your password?
                    </Link>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Modal>
    </Fragment>
  );
};
export default connect(null, { loginModalAction })(withRouter(LoginModal));
