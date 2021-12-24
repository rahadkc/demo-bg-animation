import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
// images
import stepBg from "../../../assets/images/bg/account/step1.svg";
import name from "../../../assets/images/icons/account/name.svg";
import username from "../../../assets/images/icons/account/user.svg";
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import { finishSetupAction } from "../actions";
import { normalizeInput } from "../../../utils/commonFunctions";
import { PhoneInput } from "../../../components/formfields/PhoneInput";
import phone from "../../../assets/images/icons/account/phone.svg";

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone can not be empty")
    .matches(
      /1?[0-9]{10}((ext|x)[0-9]{1,4})?/i,
      "Provide a valid phone number"
    ),
  first_name: Yup.string().required("First Name can not be empty"),
  last_name: Yup.string().required("Last Name can not be empty"),
  username: Yup.string().required("Username can not be empty"),
  how_did_you_hear: Yup.string().nullable(),
});

const FinishSetup = (props) => {
  const initialState = {
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    how_did_you_hear: "",
    is_subscribe: true,
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhone = ({ target: { value } }) => {
    setPhoneNumber((phoneNumber) => normalizeInput(value, phoneNumber));
  };

  const handleSubmit = (values, actions) => {
    props.finishSetupAction(values, props, actions);
  };

  return (
    <div
      style={{
        background: `url(${stepBg}) no-repeat center center / cover`,
      }}
      className="loginArea signupArea"
    >
      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleBlur }) => {
          return (
            <Form className="loginForm">
              <h2 className="loginTitle">Create Your Account</h2>

              <div className="accountCard">
                <Field
                  id="username"
                  name="username"
                  component={TextInput}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username*"
                  icons={username}
                />
                <Field
                  id="first_name"
                  name="first_name"
                  component={TextInput}
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name*"
                  icons={name}
                />
                <Field
                  id="last_name"
                  name="last_name"
                  component={TextInput}
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Last Name*"
                  icons={name}
                />

                <PhoneInput
                  name="phone"
                  handlePhone={handlePhone}
                  value={phoneNumber}
                  readOnly={false}
                  icons={phone}
                  placeholder="Phone#*"
                />

                <label
                  htmlFor="how_did_you_hear"
                  style={{ fontSize: "21px", fontWeight: "500" }}
                >
                  How did you hear about us?
                </label>

                <Field
                  id="how_did_you_hear"
                  name="how_did_you_hear"
                  component={SelectField}
                  value={values.how_did_you_hear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Others">Others</option>
                </Field>

                <div className="d-flex flex-wrap justify-content-between switchWrap mt-0">
                  <span className="switchLabel">
                    Would you like to subscribe for updates?
                  </span>
                  <label className="switch mb-0 mt-0">
                    <Field name="is_subscribe" type="checkbox" />
                    <span className="slider">
                      <span
                        className={`yes ${values.is_subscribe && "active"}`}
                      >
                        Yes
                      </span>
                      <span
                        className={`no ${!values.is_subscribe && "active"}`}
                      >
                        No
                      </span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span></span>
                <button className="nextBtn nextPrevBtn" type="submit">
                  Next
                  <img src={angleRight} alt="angle" />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      <h5 className="accountHelperText">
        Step {props.currentStep + 1} of {props.totalSteps + 1}
      </h5>
      <span
        style={{ width: props.getActiveStep === 1 ? `40%` : `20%` }}
        className="signupProgressBar"
      ></span>
    </div>
  );
};

export default connect(null, { finishSetupAction })(FinishSetup);
