import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import * as Yup from "yup";
import menuBg from "../../assets/images/bg/menu/account.svg";
import img1 from "../../assets/images/contact/img1.jpg";
import img2 from "../../assets/images/contact/img2.jpg";
import img3 from "../../assets/images/contact/img3.jpg";
import img4 from "../../assets/images/contact/img4.jpg";
import plane from "../../assets/images/icons/plane-black.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SelectField from "../../components/formfields/SelectField";
import SubmitLoader from "../../components/SubmitLoader";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
// actions
import { contactUsAction } from "./actions";
import "./style.scss";

const contacts = [
  {
    id: 1,
    image: img1,
  },
  {
    id: 2,
    bg: "linear-gradient(94.46deg, #777DEF 30.99%, #A4ADFB 67.8%), #777DEF",
    text: "WE’RE.",
  },
  {
    id: 3,
    bg: "linear-gradient(94.46deg, #54A7D9 30.99%, #80C6F1 67.8%), #4989B7",
    text: "HERE.",
  },
  {
    id: 4,
    image: img2,
  },
  {
    id: 5,
    image: img3,
  },
  {
    id: 6,
    bg: "linear-gradient(94.46deg, #9BDCD5 30.99%, #7FD7F2 67.8%), #9BDCD5",
    text: "TO",
  },
  {
    id: 7,
    bg: "linear-gradient(94.46deg, #FFCA41 30.99%, #EEBA54 67.8%), #FFCA41",
    text: "HELP.",
  },
  {
    id: 8,
    image: img4,
  },
];

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("phone can not be empty")
    .matches(
      /1?[0-9]{10}((ext|x)[0-9]{1,4})?/i,
      "provide a valid phone number"
    ),
  first_name: Yup.string().required("First Name can not be empty"),
  last_name: Yup.string().required("Last Name can not be empty"),
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),
  message: Yup.string().required("message can not be empty"),
});

const ContactUs = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };
  const handleSubmit = (values, actions) => {
    props.contactUsAction(values, actions);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Contact Us - Clarity Cooperative</title>
      </Helmet>

      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="Contact us"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleBlack"
        blackLogo={true}
      />
      <div className="contactArea">
        <div className="mainContainer">
          <div className="contactContainer">
            <div className="contactContent">
              <h1>Do you need to talk something over?</h1>
              <p>Let’s have a chat!</p>

              <Formik
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <div className="usefulFeatureFormBG">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <Field
                              label="First Name*"
                              id="first_name"
                              name="first_name"
                              component={TextInput}
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="First Name"
                            />
                          </div>
                          <div className="col-md-6 col-12">
                            <Field
                              label="Last Name*"
                              id="last_name"
                              name="last_name"
                              component={TextInput}
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Last Name"
                            />
                          </div>
                          <div className="col-12">
                            <Field
                              label="E-mail*"
                              id="email"
                              name="email"
                              component={TextInput}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Email"
                            />
                          </div>
                          <div className="col-12">
                            <Field
                              label="Phone #"
                              id="phone"
                              name="phone"
                              component={TextInput}
                              value={values.phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="(123) 456-7890"
                            />
                          </div>
                          {/* 
                          <div className="col-12">
                            <Field
                              label="Subject*"
                              id="subject"
                              name="subject"
                              component={SelectField}
                              value={values.subject}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="0">Subject/Topic</option>
                              <option value="1">Subject</option>
                              <option value="2">Topic</option>
                            </Field>
                          </div> */}
                          <div className="col-12">
                            <Field
                              label="Message*"
                              id="message"
                              name="message"
                              component={TextInput}
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Message"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="sendbtn sendbtnBlack"
                        disabled={props.meta.isLoading}
                      >
                        {props.meta.isLoading ? (
                          <>
                            Sending... <SubmitLoader />
                          </>
                        ) : (
                          <>
                            Send It <img src={plane} alt="Send It" />
                          </>
                        )}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <ul className="contactInfoList">
              {contacts.map((item) => (
                <Fragment key={item.id}>
                  {item.image && (
                    <li
                      style={{
                        background: `url(${item.image}) no-repeat center center / cover`,
                      }}
                    ></li>
                  )}
                  {item.text && (
                    <li style={{ background: item.bg }}>{item.text}</li>
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <FooterBottom />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  meta: state.meta,
});

export default connect(mapStateToProps, { contactUsAction })(ContactUs);
