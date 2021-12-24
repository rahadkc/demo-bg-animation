import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import joinArrow from "../../assets/images/arrow-right.svg";
// images
import arrow from "../../assets/images/arrow.svg";
import footerBg from "../../assets/images/bg/footer.svg";
import angleRight from "../../assets/images/icons/arrow-right.svg";
import email from "../../assets/images/icons/email.svg";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";
import joinNow from "../../assets/images/join-now.svg";
import { getHomeDataAction } from "../../containers/home/actions";
import { signupAction } from "../../containers/signup/actions";
import TextInput from "../formfields/InputField";
import "./style.scss";
import useAnimRef from "../transition/useAnimRef";
import { SEC_NINE } from "../transition/constants";

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
const Footer = (props) => {
  const { elRef } = useAnimRef({ section: SEC_NINE, id: 8 })

  const [ipAddress, getIpAddress] = useState("");
  const cookie = new Cookies();
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
  useEffect(() => {
    props.getHomeDataAction();
  }, []);
  const handleClickTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section
      ref={elRef}
      // style={{ background: `url(${footerBg}) no-repeat center center / cover` }}
      className={
        !cookie.get("user_token") ? "footerArea" : "footerArea footerAreaMiddle"
      }
    >
      <div className="footerMainContainer">
        <div className="footerContainer">
          <div className="footerContent">
            <h2 className="footerTitle">
              {!cookie.get("user_token")
                ? props.home_data?.community_title
                : "Practice with peace of mind"}
            </h2>
            <p className="footerText">
              {!cookie.get("user_token")
                ? props.home_data?.community_sub_title
                : null}
            </p>
            {!cookie.get("user_token") ? null : (
              <Link
                onClick={handleClickTop}
                to="/resources"
                className="joinBtn joinBtnWhite mt-30"
              >
                Explore Resources <img src={angleRight} alt="arrow" />
              </Link>
            )}
            {!cookie.get("user_token") ? (
              <Formik
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form className="loginForm">
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
                        Join Now For Free <img src={arrow} alt="arrow" />
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            ) : null}
          </div>

          <div className="footerImg">
            {props.home_data?.is_video === "Yes" && (
              <video
                className="video"
                autoPlay
                loop
                src={props.home_data?.community_video}
              ></video>
            )}
            {props.home_data?.is_video === "No" && (
              <img
                className="image"
                src={props.home_data?.community_image}
                alt={props.home_data?.community_title}
              />
            )}

            <Link
              to="/signup"
              className="scrollBtn footerJoinNow d-block d-lg-none"
              onClick={handleClickTop}
            >
              <img className="scrollText" src={joinNow} alt="text" />
              <img className="angleText" src={joinArrow} alt="angle" />
            </Link>
          </div>
        </div>
      </div>
      <Link
        to="/signup"
        onClick={handleClickTop}
        className="scrollBtn footerJoinNow d-none d-lg-block"
      >
        <img className="scrollText" src={joinNow} alt="text" />
        <img className="angleText" src={joinArrow} alt="angle" />
      </Link>
    </section>
  );
};

const mapStateToProps = (state) => ({
  home_data: state.home.home_data,
});

export default connect(mapStateToProps, { signupAction, getHomeDataAction })(
  withRouter(Footer)
);
