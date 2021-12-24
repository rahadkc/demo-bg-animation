import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Link as RouterLink, withRouter, useHistory } from "react-router-dom";
import { Element, Link as ScrollLink } from "react-scroll";
import Cookies from "universal-cookie";
import * as Yup from "yup";

// images
import profile from "../../assets/images/avatar.svg";
import menuBg from "../../assets/images/bg/menu/account.svg";
import camera from "../../assets/images/icons/camera.svg";
import crose from "../../assets/images/icons/crose.svg";
import editColor from "../../assets/images/icons/edit-color.svg";
import edit from "../../assets/images/icons/edit.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SelectField from "../../components/formfields/SelectField";
import cancel from "../../assets/images/icons/cancel.svg";
// components
import ThumbImg from "../../components/formfields/uploadImage";
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import MainMenu from "../../components/mainMenu";
import AddTaskForm from "../../containers/accountComplete/components/todo";
import {
  getAccountInformation,
  getCustomerPaymentMethod,
  updateAccountInfoAction,
  updatePaymentMethod,
  updateProfileInfoAction,
  uploadProfilePictureAction,
  updateSubscriptionAutoRenewal,
} from "./actions";
import "./premium.scss";
import dayjs from "dayjs";
import PaymentHistory from "../../components/paymenthistory";
import { countrylist } from "./countrylist";
import PasswordModal from "../../components/passwordModal";
import { PhoneInput } from "../../components/formfields/PhoneInput";
import { normalizeInput } from "../../utils/commonFunctions";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import superagent from "superagent";
import { base_url } from "../../utils/constants";

const cookie = new Cookies();

const validationAccountSchema = Yup.object({
  first_name: Yup.string().required("First Name can not be empty"),
  last_name: Yup.string().required("Last Name can not be empty"),
  username: Yup.string().required("Username can not be empty"),
  email: Yup.string().required("Email can not be empty"),
  password: Yup.string().nullable(),
  phone: Yup.string().required("Phone can not be empty"),
  how_did_you_hear: Yup.string().nullable(),
});

const paymentMethodValidationSchema = Yup.object({
  number: Yup.string()
    .required("Card number can not be empty")
    .min(13, "The card number should be at least 13 digits")
    .max(19, "The card number can not be more than 19 digits"),
  exp_month: Yup.string().required("Expiration month should be valid"),
  exp_year: Yup.string().required("Expiration year should be valid"),
  cvc: Yup.string()
    .required("CVC can not be empty")
    .min(3, "The CVC code should be 3 or 4 characters")
    .max(4, "The CVC code should be 3 or 4 characters"),
  name: Yup.string().nullable(),
  country: Yup.string().nullable(),
  postal_code: Yup.string().nullable(),
});

const validationProfileSchema = Yup.object({
  location: Yup.string().required("location can not be empty"),
  birthday: Yup.string().required("birthday can not be empty"),
  gender: Yup.string().required("gender can not be empty"),
});

const FounderMyAccount = (props) => {
  const history = useHistory();

  const [autoRenewStatus, setAutoRenewStatus] = useState(null);
  const [image, setImage] = useState("");
  const [accountEdit, setAccountEdit] = useState(false);
  const [myProfileEdit, setMyProfileEdit] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [myPaymentEdit, setMyPaymentEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showFullData, setShowFullData] = useState(false);
  const [yearList] = useState([]);
  const [showCardMessage, setShowCardMessage] = useState(false);
  const [showCVCMessage, setShowCVCMessage] = useState(false);
  const user_token = cookie.get("user_token");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expertise, setExpertise] = useState(
    props.user_info?.expertise ? props.user_info?.expertise : []
  );
  const [feature, setFeature] = useState(
    props.user_info?.feature ? props.user_info?.feature : []
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const addExpertise = (text) => setExpertise([...expertise, text]);
  const addFeature = (text) => setFeature([...feature, text]);

  const handleChangeImage = (e) => {
    setImage(e.currentTarget.files[0]);
    props.uploadProfilePictureAction(e.currentTarget.files[0]);
  };

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handlePhone = ({ target: { value } }) => {
    setPhoneNumber((phoneNumber) => normalizeInput(value, phoneNumber));
  };

  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    props.getAccountInformation();
    props.getCustomerPaymentMethod();

    if (!user_token) {
      props.history.push("/login");
    } else if (!cookie.get("user_info")?.email_verified_at) {
      props.history.push("/confirm-email");
    } else if (cookie.get("user_info")?.is_complete === 0) {
      props.history.push("/account-complete");
    }
  }, []);

  const initialAccountState = {
    first_name: props.user_info?.first_name ? props.user_info?.first_name : "",
    last_name: props.user_info?.last_name ? props.user_info?.last_name : "",
    email: props.user_info?.email ? props.user_info?.email : "",
    password: "",
    phone: props.user_info?.phone ? props.user_info?.phone : "",
    username: props.user_info?.username ? props.user_info?.username : "",
    is_subscribe: props.user_info?.is_subscribe === "Yes",
    how_did_you_hear: props.user_info?.how_did_you_hear
      ? props.user_info?.how_did_you_hear
      : "",
  };

  const initialProfileState = {
    location: props.user_info?.location ? props.user_info?.location : "",
    birthday: props.user_info?.birthday ? props.user_info?.birthday : "",
    gender: props.user_info?.gender ? props.user_info?.gender : "",
    credentials: props.user_info?.credentials
      ? props.user_info?.credentials
      : "",
    biography: props.user_info?.biography ? props.user_info?.biography : "",
    expertise: expertise,
    feature: feature,
    is_see_other: props.user_info?.is_see_other === "Yes",
    is_referral: props.user_info?.is_referral === "Yes",
  };

  const initialPaymentState = {
    number:
      showFullData === true
        ? props?.customer_payment_method?.number
        : "*** *** *** " + props?.customer_payment_method?.number,
    exp_month:
      showFullData === true
        ? props?.customer_payment_method?.exp_month
        : "**/**",
    exp_year:
      showFullData === true
        ? props?.customer_payment_method?.exp_year
        : "**/**",
    cvc: showFullData === true ? "" : "***",
    name:
      showFullData === true ? props?.customer_payment_method?.name : "*****",
    country:
      showFullData === true ? props?.customer_payment_method?.country : "*****",
    postal_code:
      showFullData === true
        ? props?.customer_payment_method?.postal_code
        : "*****",
  };

  const handleAccountSubmit = (values) => {
    props.updateAccountInfoAction(values, setAccountEdit);
  };

  const handleProfileSubmit = (values) => {
    props.updateProfileInfoAction(values, setMyProfileEdit);
  };

  const changeAutoRenewStatus = (e) => {
    setAutoRenewStatus(e.target.checked);
    props.updateSubscriptionAutoRenewal();
  };

  const handleUpdatePaymentMethod = (values) => {
    props.updatePaymentMethod(values, setMyPaymentEdit);
    setShowFullData(false);
    setMyPaymentEdit(false);
  };

  useEffect(() => {
    for (let i = 2021; i < 2041; i++) {
      yearList.push(i);
    }
  }, []);

  const handleDeleteAccount = () => {
    superagent
      .post(`${base_url}delete-profile`)
      .set("accept", "application/json")
      .set("Authorization", cookie.get("user_token"))
      .end(() => {
        cookie.remove("user_token", {
          path: "/",
          expires: new Date(Date.now() + 3600 * 1000 * 24),
        });
        cookie.remove("user_info", {
          path: "/",
          expires: new Date(Date.now() + 3600 * 1000 * 24),
        });

        history.push("/cancel-account");
      });
  };

  const removeExpertise = (index) => {
    const newTasks = [...expertise];
    newTasks.splice(index, 1);
    setExpertise(newTasks);
  };

  const removeFeature = (index) => {
    const newTasks = [...feature];
    newTasks.splice(index, 1);
    setFeature(newTasks);
  };

  const handleAccountEdit = () => {
    setAccountEdit(true);
  };

  useEffect(() => {
    setPhoneNumber(normalizeInput(props.user_info?.phone, phoneNumber));
    setAutoRenewStatus(props.user_info?.subscription_auto_renewal);
  }, [props.user_info?.phone]);

  return (
    <Fragment>
      <Helmet>
        <title>My Account - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="My Account"
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
      <div className="myPremiumAccountArea">
        <div className="myPremiumAccountMainContainer">
          <div className="myPremiumAccountContainer">
            <div className="myAccount_sidebar">
              <ul>
                <li>
                  <ScrollLink
                    offset={-150}
                    spy={true}
                    activeClass="activeItem"
                    to="accountinfo"
                    smooth={true}
                    duration={1000}
                  >
                    Account Information
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    spy={true}
                    activeClass="activeItem"
                    to="profile"
                    smooth={true}
                    duration={1000}
                  >
                    My Profile
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    spy={true}
                    activeClass="activeItem"
                    to="subscription"
                    smooth={true}
                    duration={1000}
                  >
                    My Subscription
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    spy={true}
                    activeClass="activeItem"
                    to="paymentinfo"
                    smooth={true}
                    duration={1000}
                  >
                    Payment Method
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    spy={true}
                    activeClass="activeItem"
                    to="history"
                    smooth={true}
                    duration={1000}
                  >
                    Payment History
                  </ScrollLink>
                </li>
              </ul>
            </div>
            <div className="myAccount_content_wrapper">
              <Element name="accountinfo">
                <h1>My Account</h1>
                <div>
                  <Formik
                    enableReinitialize
                    initialValues={initialAccountState}
                    onSubmit={handleAccountSubmit}
                    validationSchema={validationAccountSchema}
                  >
                    {({ values, handleChange, handleBlur }) => {
                      return (
                        <Form>
                          <p className="accountSubTitle">
                            Account Information{" "}
                            {accountEdit ? (
                              <button className="savebtn" type="submit">
                                Save <img src={editColor} alt="" />
                              </button>
                            ) : (
                              <span
                                onClick={handleAccountEdit}
                                className="editbtn"
                              >
                                <span>Edit</span> <img src={edit} alt="edit" />
                              </span>
                            )}
                          </p>
                          <div className="accountCard mb-50">
                            <div className="row">
                              <div className="col-md-6 col-12">
                                <Field
                                  label="First Name"
                                  id="first_name"
                                  name="first_name"
                                  component={TextInput}
                                  value={values.first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                />
                              </div>

                              <div className="col-md-6 col-12">
                                <Field
                                  label="Last Name"
                                  id="last_name"
                                  name="last_name"
                                  component={TextInput}
                                  value={values.last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                />
                              </div>

                              <div className="col-12">
                                <Field
                                  label="Username"
                                  id="username"
                                  name="username"
                                  component={TextInput}
                                  value={values.username}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                />
                              </div>
                              <div className="col-12">
                                <Field
                                  label="E-mail"
                                  id="email"
                                  name="email"
                                  component={TextInput}
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                />
                              </div>
                              {!accountEdit ? (
                                <div className="col-12">
                                  <div className="inputStyle">
                                    <label htmlFor="password">Password</label>
                                    <input
                                      type="text"
                                      name="password"
                                      id="password"
                                      value="****"
                                      disabled
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="col-12">
                                  <div className="myaccount__password">
                                    <label htmlFor="password">Password</label>
                                    <div>
                                      <input
                                        type="text"
                                        readOnly={true}
                                        placeholder="****"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => setUpdatePassword(true)}
                                      >
                                        Update Password
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className="col-12">
                                <PhoneInput
                                  name="phone"
                                  handlePhone={handlePhone}
                                  value={phoneNumber}
                                  icons={false}
                                  readOnly={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                  label="Phone #"
                                />
                              </div>
                              <div className="col-12">
                                <Field
                                  label="How did you hear about us?"
                                  id="howdidyouhear"
                                  name="howdidyouhear"
                                  component={SelectField}
                                  value={values.how_did_you_hear}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!accountEdit}
                                  disabled={!accountEdit}
                                  className={accountEdit ? "editField" : ""}
                                >
                                  <option value="Facebook">Facebook</option>
                                  <option value="Others">Others</option>
                                </Field>
                              </div>
                              <div className="col-12">
                                <div
                                  className={
                                    accountEdit
                                      ? "inputStyle editField mb-4"
                                      : "inputStyle mb-4"
                                  }
                                >
                                  <label>
                                    Do you want to receive emails with important
                                    company updates?
                                  </label>
                                  <label className="switch">
                                    <Field
                                      name="is_subscribe"
                                      readOnly={!accountEdit}
                                      type="checkbox"
                                      disabled={!accountEdit}
                                    />
                                    <span className="slider">
                                      <span
                                        className={`yes ${
                                          values.is_subscribe && "active"
                                        }`}
                                      >
                                        Yes
                                      </span>
                                      <span
                                        className={`no ${
                                          !values.is_subscribe && "active"
                                        }`}
                                      >
                                        No
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </Element>

              <div id="profile">
                <Formik
                  enableReinitialize
                  initialValues={initialProfileState}
                  onSubmit={handleProfileSubmit}
                  validationSchema={validationProfileSchema}
                >
                  {({ handleChange, handleBlur, values }) => {
                    return (
                      <>
                        <Form>
                          <p className="accountSubTitle">
                            My Profile
                            {myProfileEdit ? (
                              <button className="savebtn" type="submit">
                                Save <img src={editColor} alt="" />
                              </button>
                            ) : (
                              <span
                                onClick={() => setMyProfileEdit(true)}
                                className="editbtn"
                              >
                                <span>Edit</span> <img src={edit} alt="edit" />
                              </span>
                            )}
                          </p>

                          <div className="accountCard mb-50">
                            <div className="row">
                              <div className="col-xl-4 col-12">
                                <div className="profileImg">
                                  <ThumbImg
                                    file={image}
                                    image={
                                      props.user_info?.photo
                                        ? props.user_info?.photo
                                        : profile
                                    }
                                  />
                                  {myProfileEdit ? (
                                    <label className="inputFile">
                                      <img src={camera} alt="" />
                                      <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleChangeImage}
                                      />
                                    </label>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-xl-8 col-12">
                                <Field
                                  label="Location"
                                  id="location"
                                  name="location"
                                  component={TextInput}
                                  value={values.location}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!myProfileEdit}
                                  className={myProfileEdit ? "editField" : ""}
                                />

                                <div className="row">
                                  <div className="col-md-6 col-12">
                                    <Field
                                      label="Birthday"
                                      id="birthday"
                                      name="birthday"
                                      component={TextInput}
                                      value={values.birthday}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      type="date"
                                      readOnly={!myProfileEdit}
                                      className={
                                        myProfileEdit ? "editField" : ""
                                      }
                                    />
                                  </div>
                                  <div className="col-md-6 col-12">
                                    <Field
                                      label="Select Your Pronoun*"
                                      id="gender"
                                      name="gender"
                                      component={SelectField}
                                      value={values.gender}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      readOnly={!myProfileEdit}
                                      disabled={!myProfileEdit}
                                      className={
                                        myProfileEdit ? "editField" : ""
                                      }
                                    >
                                      <option value="he/him">He/Him</option>
                                      <option value="she/her">She/Her</option>
                                      <option value="they/them">
                                        They/Them
                                      </option>
                                    </Field>
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <Field
                                  label="Credentials"
                                  id="credentials"
                                  name="credentials"
                                  component={TextInput}
                                  value={values.credentials}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!myProfileEdit}
                                  className={myProfileEdit ? "editField" : ""}
                                />
                              </div>
                              <div className="col-12">
                                <div className="multilineForm">
                                  <label
                                    className={
                                      !myProfileEdit ? " editLabel" : ""
                                    }
                                  >
                                    Biography
                                    {myProfileEdit ? (
                                      <span>
                                        {" "}
                                        {values.biography
                                          ? values.biography.length
                                          : 0}
                                        /1000
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </label>
                                  <Field
                                    name="biography"
                                    component={TextInput}
                                    value={values.biography}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Biography"
                                    readOnly={!myProfileEdit}
                                    className={myProfileEdit ? "editField" : ""}
                                    multiline
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <div
                                  className={`inputStyle ${
                                    myProfileEdit ? "editField" : ""
                                  }`}
                                >
                                  <label>Areas of Expertise</label>
                                  {myProfileEdit ? (
                                    <AddTaskForm
                                      addTask={addExpertise}
                                      placeholder="Add areas of Expertise"
                                    />
                                  ) : null}

                                  <ul className="todo-list">
                                    {expertise.map((task, index) => (
                                      <li key={index} className="todo">
                                        <span className="label">{task}</span>
                                        {myProfileEdit ? (
                                          <span
                                            className="delete"
                                            onClick={() =>
                                              removeExpertise(index)
                                            }
                                          >
                                            <img src={crose} alt="delete" />
                                          </span>
                                        ) : null}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12">
                                <div
                                  className={`inputStyle ${
                                    myProfileEdit ? "editField" : ""
                                  }`}
                                >
                                  <label>Featured Links</label>
                                  {myProfileEdit ? (
                                    <AddTaskForm
                                      addTask={addFeature}
                                      placeholder="Add featured Links"
                                    />
                                  ) : null}

                                  <ul className="todo-list">
                                    {feature.map((task, index) => (
                                      <li key={index} className="todo">
                                        <span className="label links">
                                          {task}
                                        </span>
                                        {myProfileEdit ? (
                                          <span
                                            className="delete"
                                            onClick={() => removeFeature(index)}
                                          >
                                            <img src={crose} alt="delete" />
                                          </span>
                                        ) : null}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12">
                                <div
                                  className={`inputStyle ${
                                    myProfileEdit ? "editField" : ""
                                  }`}
                                >
                                  <label>
                                    Do you want other members to see your
                                    profile?
                                  </label>
                                  <label className="switch switchBlack">
                                    <Field
                                      readOnly={!myProfileEdit}
                                      type="checkbox"
                                      disabled={!myProfileEdit}
                                      name="is_see_other"
                                    />
                                    <span className="slider">
                                      <span
                                        className={`yes ${
                                          values.is_see_other && "active"
                                        }`}
                                      >
                                        Yes
                                      </span>
                                      <span
                                        className={`no ${
                                          !values.is_see_other && "active"
                                        }`}
                                      >
                                        No
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <div className="col-12">
                                <div
                                  className={`inputStyle mb-0 ${
                                    myProfileEdit ? "editField" : ""
                                  }`}
                                >
                                  <label>Are you accepting referrals?</label>
                                  <label className="switch">
                                    <Field
                                      readOnly={!myProfileEdit}
                                      type="checkbox"
                                      disabled={!myProfileEdit}
                                      name="is_referral"
                                    />
                                    <span className="slider">
                                      <span
                                        className={`yes ${
                                          values.is_referral && "active"
                                        }`}
                                      >
                                        Yes
                                      </span>
                                      <span
                                        className={`no ${
                                          !values.is_referral && "active"
                                        }`}
                                      >
                                        No
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </div>
              <div id="subscription">
                <div className="mysubscription">
                  <div className="mysubscription_header">
                    <p className="accountSubTitle">My Subscription</p>
                    <RouterLink to="/membership" className="editbtn">
                      Edit <img src={edit} alt="edit" />
                    </RouterLink>
                  </div>
                  <div className="mysubscription__card">
                    <div className="mysubscription__top">
                      <div>
                        <h1 className="subscription__title">Founder</h1>
                        <p className="renew">
                          Renewing on{" "}
                          {dayjs(
                            props?.user_info?.subscription_expire_at
                          ).format("DD MMM YYYY")}
                        </p>
                      </div>
                      <div>
                        <h3>
                          $197 <span>/year</span>
                        </h3>
                      </div>
                    </div>
                    <div className="mysubscription__bottom">
                      <ul>
                        <li>Enroll in reduced rate health insurance plans</li>
                        <li>Participate in forum</li>
                        <li>
                          Access to all higher impact downloadable resources
                        </li>
                      </ul>
                    </div>

                    <div className="inputStyle auto-renew">
                      <label>Auto renew your subscription every year?</label>
                      <label className="switch">
                        <input
                          name="auto_renew"
                          type="checkbox"
                          onChange={changeAutoRenewStatus}
                          checked={autoRenewStatus}
                        />
                        <span className="slider">
                          <span
                            className={`yes ${!autoRenewStatus && "active"}`}
                          >
                            Yes
                          </span>
                          <span className={`no ${autoRenewStatus && "active"}`}>
                            No
                          </span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div id="paymentinfo">
                <Formik
                  enableReinitialize
                  initialValues={initialPaymentState}
                  onSubmit={handleUpdatePaymentMethod}
                  validationSchema={paymentMethodValidationSchema}
                >
                  {({ handleChange, handleBlur, touched, values, errors }) => {
                    return (
                      <>
                        <Form className="paymentmethod">
                          <p className="accountSubTitle">
                            Payment Method
                            {myPaymentEdit ? (
                              <button className="savebtn" type="submit">
                                <span>Save</span> <img src={editColor} alt="" />
                              </button>
                            ) : (
                              <span
                                onClick={() => {
                                  setMyPaymentEdit(true);
                                  setShowFullData(true);
                                  setShowCardMessage(true);
                                  setShowCVCMessage(true);
                                }}
                                className="editbtn"
                              >
                                Edit <img src={edit} alt="edit" />
                              </span>
                            )}
                          </p>

                          <div className="accountCard paymentmethod__card">
                            <div className="row">
                              <div className="col-md-12 noticemessage">
                                <Field
                                  label="Card Number"
                                  id="number"
                                  name="number"
                                  component={TextInput}
                                  value={values.number}
                                  onChange={(event) => {
                                    handleChange(event);
                                    setShowCardMessage(false);
                                  }}
                                  onBlur={handleBlur}
                                  readOnly={!myPaymentEdit}
                                  className={
                                    myPaymentEdit
                                      ? "editField paymentmethod__input"
                                      : ""
                                  }
                                />
                                {showCardMessage === true ? (
                                  <small>
                                    Please fill your full card number
                                  </small>
                                ) : null}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-6">
                                    <Field
                                      label="Expiration Month"
                                      id="expiration"
                                      name="exp_month"
                                      component={SelectField}
                                      value={values.exp_month}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      readOnly={!myPaymentEdit}
                                      disabled={!myPaymentEdit}
                                      className={
                                        myPaymentEdit
                                          ? "editField paymentmethod__input"
                                          : ""
                                      }
                                    >
                                      {!myPaymentEdit ? (
                                        <option value="">***</option>
                                      ) : null}
                                      <option value="1">Jan</option>
                                      <option value="2">Feb</option>
                                      <option value="3">Mar</option>
                                      <option value="4">Apr</option>
                                      <option value="5">May</option>
                                      <option value="6">Jun</option>
                                      <option value="7">Jul</option>
                                      <option value="8">Aug</option>
                                      <option value="9">Sep</option>
                                      <option value="10">Oct</option>
                                      <option value="11">Nov</option>
                                      <option value="12">Dec</option>
                                    </Field>
                                    {touched.exp_month && errors.exp_month && (
                                      <p className="errorMsg mb-0">
                                        {errors.exp_month}
                                      </p>
                                    )}
                                  </div>
                                  <div className="col-6">
                                    <Field
                                      label="Expiration Year"
                                      id="exp_year"
                                      name="exp_year"
                                      component={SelectField}
                                      value={values.exp_year}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      readOnly={!myPaymentEdit}
                                      disabled={!myPaymentEdit}
                                      className={
                                        myPaymentEdit
                                          ? "editField paymentmethod__input"
                                          : ""
                                      }
                                    >
                                      {!myPaymentEdit ? (
                                        <option value="">****</option>
                                      ) : null}
                                      {yearList.map((item) => (
                                        <option key={item}>{item}</option>
                                      ))}
                                    </Field>
                                    {touched.exp_year && errors.exp_year && (
                                      <p className="errorMsg mb-0">
                                        {errors.exp_year}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 noticemessage">
                                <Field
                                  label="CVC"
                                  id="cvc"
                                  name="cvc"
                                  component={TextInput}
                                  value={values.cvc}
                                  onChange={(event) => {
                                    handleChange(event);
                                  }}
                                  onClick={() => setShowCVCMessage(false)}
                                  onBlur={handleBlur}
                                  readOnly={!myPaymentEdit}
                                  className={
                                    myPaymentEdit
                                      ? "editField paymentmethod__input"
                                      : ""
                                  }
                                />
                                {showCVCMessage === true ? (
                                  <small>Please input your card CVC code</small>
                                ) : null}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-12">
                                <Field
                                  label="Name On Card"
                                  id="name"
                                  name="name"
                                  component={TextInput}
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!myPaymentEdit}
                                  className={
                                    myPaymentEdit
                                      ? "editField paymentmethod__input"
                                      : ""
                                  }
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6">
                                <Field
                                  label="Country"
                                  id="country"
                                  name="country"
                                  component={SelectField}
                                  value={values.country}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!myPaymentEdit}
                                  disabled={!myPaymentEdit}
                                  className={
                                    myPaymentEdit
                                      ? "editField paymentmethod__input"
                                      : ""
                                  }
                                >
                                  {!myPaymentEdit ? (
                                    <option value="">*****</option>
                                  ) : null}
                                  {countrylist.map((item) => (
                                    <option key={item.key} value={item.code}>
                                      {item.name}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                              <div className="col-md-6">
                                <Field
                                  label="Postal Code"
                                  id="postal_code"
                                  name="postal_code"
                                  component={TextInput}
                                  value={values.postal_code}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  readOnly={!myPaymentEdit}
                                  className={
                                    myPaymentEdit
                                      ? "editField paymentmethod__input"
                                      : ""
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </Form>
                      </>
                    );
                  }}
                </Formik>
              </div>
              <Element name="history">
                <PaymentHistory />
              </Element>
              <div className="delete_section">
                <p className="delete_qsn">Need To Delete Your Account?</p>
                <p className="delete_btn" onClick={() => setDeleteModal(true)}>
                  Delete My Account
                  <img src={cancel} alt="cancel" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
      <DeleteAccountModal
        submit={handleDeleteAccount}
        isOpen={deleteModal}
        onClosed={() => setDeleteModal(false)}
      />
      {updatePassword && (
        <PasswordModal
          isOpen={updatePassword}
          onClosed={() => setUpdatePassword(false)}
          planTitle="Premium"
          planSubTitle="Yearly Membership"
          planBackground="linear-gradient(134.91deg, #7ADBD1 15.27%, #54A7D9 84.44%), linear-gradient(134.91deg, #777DEF 15.27%, #AC99FA 50.57%, #A4ADFB 84.44%)"
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
  customer_payment_method: state.my_account.customer_payment_method,
});

export default connect(mapStateToProps, {
  getAccountInformation,
  uploadProfilePictureAction,
  updateAccountInfoAction,
  updateProfileInfoAction,
  getCustomerPaymentMethod,
  updatePaymentMethod,
  updateSubscriptionAutoRenewal,
})(withRouter(FounderMyAccount));
