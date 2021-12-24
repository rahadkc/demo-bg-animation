import { Field, Form, Formik } from "formik";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import { addNewUserAction } from "../../admin/dashboard/actions";
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
const AddNewUser = (props) => {
  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    role: "Admin",
    is_see_other: true,
  };

  const submitHandler = (values) => {
    props.addNewUserAction(values, props.history);
  };
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Add A User</h2>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
              >
                {({ values, handleChange, handleBlur }) => {
                  return (
                    <Form className="usefulFeatureForm">
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
                              className="editField"
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
                              className="editField"
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
                              className="editField"
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
                              className="editField"
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
                              className="editField"
                            >
                              <option value="Admin">Admin</option>
                              <option value="User">user</option>
                            </Field>
                          </div>
                          <div className="col-12">
                            <div className="inputStyle editField mb-0">
                              <label>
                                Do they want to recieve emails with important
                                company updates?
                              </label>
                              <label className="switch">
                                <Field name="is_see_other" type="checkbox" />
                                <span className="slider">
                                  <span className={`yes ${values.is_see_other && 'active'}`}>Yes</span>
                                  <span className={`no ${!values.is_see_other && 'active'}`}>No</span>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="saveBtn">
                        Save User
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  addNewUserAction,
})(withRouter(AddNewUser));
