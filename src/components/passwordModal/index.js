//TODO: old password vule hole manag korte hbe
import React, { Fragment, useState } from "react";
import { Modal } from "reactstrap";
import crose from "../../assets/images/icons/crose.svg";
import "./style.scss";
import TextInput from "../formfields/InputField";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { updatePassword } from "../../containers/account/actions";
import eye_visible from "../../assets/images/icons/eye_visible.svg";
import eye_Invisible from "../../assets/images/icons/eye_Invisible.svg";

const validationAccountSchema = Yup.object({
  old_password: Yup.string().required("Old Password can not be empty"),
  new_password: Yup.string().required("New Password can not be empty"),
  confirm_new_password: Yup.string().required(
    "Confirm Password can not be empty"
  ),
});

const PasswordModal = (props) => {
  const [state, setState] = useState({
    old_pass: false,
    show_pass: false,
    con_pass: false,
  });

  const initialAccountState = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  const handlePasswordUpdate = (values) => {

    props.updatePassword(values, props.onClosed);
  };

  return (
    <Fragment>
      <Modal
        isOpen={props.isOpen}
        centered
        fade={false}
        onClosed={props.onClosed}
        backdropClassName="signupModalWrapBackdrop"
        className="blackListModal blackListModal--premium"
      >
        <span className="signupCroseBtn">
          <img onClick={props.onClosed} src={crose} alt="crose" />
        </span>
        <div className="blackListModalWrap">
          <div className="password__modal">
              <Formik
                enableReinitialize
                initialValues={initialAccountState}
                onSubmit={handlePasswordUpdate}
                validationSchema={validationAccountSchema}
              >
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form>
                      <>
                        <div className="passwordAccountCard ">
                          <h4 className="mb-4">Update your account password</h4>
                          <div className="row">
                            <div className="col-12">
                              <Field
                                id="old_password*"
                                name="old_password"
                                component={TextInput}
                                value={values.old_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter Old Password*"
                                icons={
                                  !state.old_pass ? eye_visible : eye_Invisible
                                }
                                type={state.old_pass ? "text" : "password"}
                                showPassHandler={() =>
                                  setState({
                                    ...state,
                                    old_pass: !state.old_pass,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <Field
                                id="new_password*"
                                name="new_password"
                                component={TextInput}
                                value={values.new_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Enter New Password*"
                                icons={
                                  !state.show_pass ? eye_visible : eye_Invisible
                                }
                                type={state.show_pass ? "text" : "password"}
                                showPassHandler={() =>
                                  setState({
                                    ...state,
                                    show_pass: !state.show_pass,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12">
                              <Field
                                id="confirm_new_password"
                                name="confirm_new_password"
                                component={TextInput}
                                value={values.confirm_new_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Re-enter New Password*"
                                icons={
                                  !state.con_pass ? eye_visible : eye_Invisible
                                }
                                type={state.con_pass ? "text" : "password"}
                                showPassHandler={() =>
                                  setState({
                                    ...state,
                                    con_pass: !state.con_pass,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <button className="updatebutton">
                            Update Password
                          </button>
                        </div>
                      </>
                    </Form>
                  );
                }}
              </Formik>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default connect(null, {
  updatePassword,
})(withRouter(PasswordModal));
