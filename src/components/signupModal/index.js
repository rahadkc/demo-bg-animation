import {Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Modal} from "reactstrap";
import * as Yup from "yup";
import angleDownBlack from "../../assets/images/angle-down.svg";
import arrowWhite from "../../assets/images/arrow-white.svg";
import arrow from "../../assets/images/arrow.svg";
import signup from "../../assets/images/bg/signup.jpg";
import crose from "../../assets/images/icons/crose.svg";
import email from "../../assets/images/icons/email2.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import scrollTextBlack from "../../assets/images/join-now.svg";
import joinNow from "../../assets/images/join-white.svg";
import {signupAction} from "../../containers/signup/actions";
import TextInput from "../formfields/InputField";
import "./style.scss";

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

const SignupModal = (props) => {
  const [ipAddress, getIpAddress] = useState("");
  const [state, setState] = useState({
    show_pass: false,
    con_pass: false,
  });
  const initialState = {
    email: "",
    password: "",
    reEnter_password: "",
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        getIpAddress(res.ip);
      })
      .catch((err) => console.error("Problem fetching my IP", err));
  }, []);

  const handleSubmit = (values, actions) => {
    const data = {
      email: values.email,
      password: values.password,
      ip: ipAddress,
    };
    props.signupAction(data, actions, props.history);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      className="signupModalWrap"
      centered
      fade={false}
      onClosed={props.onClosed}
      backdropClassName="signupModalWrapBackdrop"
    >
      <span onClick={props.onClosed} className="signupCroseBtn">
        <img src={crose} alt="crose"/>
      </span>
      <div className="signupModalForm">
        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({values, handleChange, handleBlur}) => {
            return (
              <Form className="loginForm">
                <h2>Sign Up For Free</h2>
                <p className="modalContent">
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
                    className="mb-0"
                    showPassHandler={() =>
                      setState({
                        ...state,
                        con_pass: !state.con_pass,
                      })
                    }
                  />
                </div>

                <button className="joinBtn">
                  Join The Cooperative <img src={arrow} alt="arrow"/>
                </button>
              </Form>
            );
          }}
        </Formik>
        <div className="signupModalImg">
          <h4>JOIN THE FAMILY</h4>
          <img className="image" src={signup} alt=""/>
          <div className="scrollBtn d-none d-md-block">
            <img className="scrollText" src={joinNow} alt="text"/>
            <img className="angleText" src={arrowWhite} alt="angle"/>
          </div>
          <div className="scrollBtn d-block d-md-none">
            <img className="scrollText" src={scrollTextBlack} alt="text"/>
            <img className="angleText" src={angleDownBlack} alt="angle"/>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default connect(null, {signupAction})(withRouter(SignupModal));
