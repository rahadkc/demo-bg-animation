import {Field, Form, Formik} from "formik";
import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Modal} from "reactstrap";
import * as Yup from "yup";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import editColor from "../../../assets/images/icons/edit-color.svg";
import edit from "../../../assets/images/icons/edit.svg";
import submit from "../../../assets/images/icons/submit.svg";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import "./style.scss";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),

  first_name: Yup.string().required("First Name Can not be empty"),
  last_name: Yup.string().required("First Name Can not be empty"),
  username: Yup.string().required("username Can not be empty"),
  role: Yup.string().required("role Can not be empty"),
});

const BlackListDetails = () => {
  const [addBlacklistIP, setAddBlacklistIP] = useState(false);
  const [editView, setEditView] = useState(false);
  const handleOprnBlacklistModal = () => {
    setAddBlacklistIP(true);
  };

  const initialState = {
    email: "hasib.me1995@gmail.com",
    first_name: "Kaji Hasib",
    last_name: "Rahman",
    username: "kajihasib",
    role: "admin",
    is_subscribe: true,
  };

  const handleEdit = () => {
    setEditView(true);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">John Smith</h2>
                <button
                  onClick={handleOprnBlacklistModal}
                  type="button"
                  className="adminBtn adminBtn2"
                >
                  Reset Password
                </button>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
              >
                {({values, handleChange, handleBlur}) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <div className="d-flex flex-wrap align-items-center justify-content-between IPaddress">
                        <span className="address">IP: 24.165.112.41</span>
                        {editView ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt=""/>
                          </button>
                        ) : (
                          <span onClick={handleEdit} className="edit">
                            Edit <img src={edit} alt="edit"/>
                          </span>
                        )}
                      </div>
                      <div className="usefulFeatureFormBG">
                        <div className="row">
                          <div className="col-md-6 col-12">
                            <Field
                              label="First Name"
                              name="first_name"
                              component={TextInput}
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="First Name"
                              readOnly={!editView}
                              className={editView ? "editField" : ""}
                            />
                          </div>

                          <div className="col-md-6 col-12">
                            <Field
                              label="Last Name"
                              name="last_name"
                              component={TextInput}
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Last Name"
                              readOnly={!editView}
                              className={editView ? "editField" : ""}
                            />
                          </div>
                          <div className="col-12">
                            <Field
                              label="Username"
                              name="username"
                              component={TextInput}
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="username"
                              readOnly={!editView}
                              className={editView ? "editField" : ""}
                            />
                          </div>

                          <div className="col-12">
                            <Field
                              label="E-mail"
                              name="email"
                              component={TextInput}
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="email"
                              readOnly={!editView}
                              className={editView ? "editField" : ""}
                            />
                          </div>

                          <div className="col-12">
                            <Field
                              label="User Role"
                              id="role"
                              name="role"
                              component={SelectField}
                              value={values.role}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              readOnly={!editView}
                              className={editView ? "editField" : ""}
                            >
                              <option value="admin">Admin</option>
                              <option value="user">user</option>
                            </Field>
                          </div>
                          <div className="col-12">
                            <div
                              className={`inputStyle mb-0 ${
                                editView ? "editField" : ""
                              }`}
                            >
                              <label>
                                Do they want to receive emails with important
                                company updates?
                              </label>
                              <label className="switch">
                                <Field
                                  readOnly={!editView}
                                  disabled={!editView}
                                  name="is_subscribe"
                                  type="checkbox"
                                />
                                <span className="slider">
                                  <span className={`yes ${values.is_subscribe && 'active'}`}>Yes</span>
                                  <span className={`no ${!values.is_subscribe && 'active'}`}>No</span>
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
              <ul className="actionsBtns">
                <li>
                  <button className="delete">Delete Account</button>
                </li>
                <li>
                  <button className="blacklist">Blacklist IP Address</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={addBlacklistIP}
        toggle={handleOprnBlacklistModal}
        centered
        fade={false}
        onClosed={() => setAddBlacklistIP(false)}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal"
      >
        <span
          onClick={() => setAddBlacklistIP(false)}
          className="signupCroseBtn"
        >
          <img src={crose} alt="crose"/>
        </span>
        <div className="blackListModalWrap">
          <h2>Enter the IP address that you wish to blacklist.</h2>
          <ul className="modalBtns">
            <li>
              <button className="success">
                Yes, Do It <img src={submit} alt="submit"/>
              </button>
            </li>
            <li>
              <button
                onClick={() => setAddBlacklistIP(false)}
                className="error"
              >
                No, Don’t Do It <img src={cancel} alt="submit"/>
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
};

export default connect(null, {})(withRouter(BlackListDetails));
