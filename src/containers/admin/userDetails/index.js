import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import * as Yup from "yup";
import editColor from "../../../assets/images/icons/edit-color.svg";
import edit from "../../../assets/images/icons/edit.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import {
  addBlockListSingleUser,
  deleteSingleUserAction,
  getDetailsAction,
  updateSingleUser,
} from "../../admin/dashboard/actions";
import { forgetPasswordAction } from "../../forgetPassword/actions";
import "./style.scss";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("email Can not be empty")
    .email("email must be a valid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "email must be a valid email address"
    ),

  first_name: Yup.string().required("First Name Can not be empty"),
  last_name: Yup.string().required("First Name Can not be empty"),
  username: Yup.string().required("username Can not be empty"),
  role: Yup.string().required("role Can not be empty"),
});
const UserDetails = (props) => {
  const { id } = useParams();
  const [addBlacklistIP, setAddBlacklistIP] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [saveChange, setSaveChange] = useState(false);
  const [editView, setEditView] = useState(false);
  const handleOpenBlacklistModal = () => {
    setAddBlacklistIP(true);
  };

  const handleOpenRestModal = () => {
    setResetModal(true);
  };

  const initialState = {
    email: props.user_details?.email,
    first_name: props.user_details?.first_name,
    last_name: props.user_details?.last_name,
    username: props.user_details?.username,
    role: props.user_details?.role,
    is_subscribe: props.user_details?.is_subscribe === "Yes" ? true : false,
  };
  const handleEdit = () => {
    setEditView(true);
  };
  const handleSubmit = (values) => {
    props.updateSingleUser(values, id, setSaveChange);
  };

  const handleSubmitModal = () => {
    setSaveChange(true);
  };
  useEffect(() => {
    props.getDetailsAction(id);
  }, [id]);

  const handleDeleteUser = () => {
    props.deleteSingleUserAction(id, props.history);
  };
  const handleOpenDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleBlocklistSubmit = () => {
    const data = {
      ip: props.user_details?.ip,
    };
    props.addBlockListSingleUser(data, props.history, setAddBlacklistIP);
  };

  const handleResetSubmit = () => {
    const data = {
      email: props.user_details?.email,
    };
    props.forgetPasswordAction(data, null, null, setResetModal);
  };
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">
                  {props.user_details?.first_name}{" "}
                  {props.user_details?.last_name}
                </h2>
                <button
                  onClick={handleOpenRestModal}
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
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <div className="d-flex flex-wrap align-items-center justify-content-between IPaddress">
                        <span className="address">
                          IP: {props.user_details?.ip}
                        </span>
                        {editView ? (
                          <button
                            onClick={handleSubmitModal}
                            className="savebtn"
                            type="button"
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span onClick={handleEdit} className="edit">
                            Edit <img src={edit} alt="edit" />
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
                              disabled={!editView}
                              className={editView ? "editField" : ""}
                            >
                              <option value="Admin">Admin</option>
                              <option value="User">user</option>
                            </Field>
                          </div>
                          <div className="col-12">
                            <div
                              className={`inputStyle mb-0 ${
                                editView ? "editField" : ""
                              }`}
                            >
                              <label>
                                Do they want to recieve emails with important
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
                      <ConfirmModal
                        isOpen={saveChange}
                        onClosed={() => setSaveChange(false)}
                        title="Do you wish to save your changes?"
                        submit={() => handleSubmit(values)}
                      />
                    </Form>
                  );
                }}
              </Formik>
              <ul className="actionsBtns">
                <li>
                  <button onClick={handleOpenDeleteModal} className="delete">
                    Delete Account
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenBlacklistModal}
                    className="blacklist"
                  >
                    Blacklist IP Address
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={resetModal}
        onClosed={() => setResetModal(false)}
        title="Would you like to trigger a password reset for this user?"
        content="If so, we will send them an e-mail with password reset instructions."
        submit={handleResetSubmit}
      />
      <ConfirmModal
        isOpen={addBlacklistIP}
        onClosed={() => setAddBlacklistIP(false)}
        title="Are you sure that you want to backlist this user’s account?"
        content="If you blacklist this user, this person will no longer be able to access your app."
        submit={handleBlocklistSubmit}
      />
      <ConfirmModal
        isOpen={deleteModal}
        onClosed={() => setDeleteModal(false)}
        title="Are you sure that you want to delete this user’s account?"
        content="Deleting this account will also delete the data associated with this user."
        submit={handleDeleteUser}
      />
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  user_details: state.admin.user_details,
});
export default connect(mapStateToProps, {
  getDetailsAction,
  updateSingleUser,
  deleteSingleUserAction,
  forgetPasswordAction,
  addBlockListSingleUser,
})(withRouter(UserDetails));
