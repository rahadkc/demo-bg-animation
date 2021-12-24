import {Field, Form, Formik} from "formik";
import React from "react";
import {connect} from "react-redux";
import * as Yup from "yup";
// images
import stepBg from "../../../assets/images/bg/account/step2.svg";
import location from "../../../assets/images/icons/account/map.svg";
import birthday from "../../../assets/images/icons/account/birthday.svg";
import angleLeft from "../../../assets/images/icons/arrow-left.svg";
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import crose from "../../../assets/images/icons/crose.svg";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import {profileSetupAction} from "../actions";
import BirthdayTextInput from "../../../components/formfields/BirthdayInputField";

const validationSchema = Yup.object({
  location: Yup.string().required("location can not be empty"),
  birthday: Yup.string().required("date can not be empty"),
  gender: Yup.string().required("gender can not be empty"),
});

const MemberProfile = (props) => {
  const initialState = {
    location: "",
    birthday: "",
    gender: "",
    is_see_other: true,
  };

  const handleNextStep = () => {
    console.log(props.activeStep);
    props.activeStep(props.currentStep + 1);
    props.nextStep();
  };

  const handlePrevStep = () => {
    console.log(props.activeStep);

    props.activeStep(props.currentStep - 1);
    props.previousStep();
  };

  const handleSubmit = (values) => {
    props.profileSetupAction(values, props);
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
        {({values, handleChange, handleBlur}) => {
          return (
            <Form className="loginForm">
              <h2 className="loginTitle">Setup Your Member Profile</h2>

              <div className="accountCard">
                <Field
                  id="location"
                  name="location"
                  component={TextInput}
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Location"
                  icons={location}
                />
                <div className="row">
                  <div className="col-sm-6">
                    <Field
                      id="Birthday"
                      label="Birthday"
                      name="birthday"
                      type="date"
                      component={BirthdayTextInput}
                      value={values.birthday}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder="Birthday"
                      icons={birthday}
                      iconHideOnDateSelect={values.birthday}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Field
                      label="Pronoun*"
                      id="gender"
                      name="gender"
                      component={SelectField}
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option>Select Your Pronoun</option>
                      <option value="he/him">He/Him</option>
                      <option value="she/her">She/Her</option>
                      <option value="they/them">They/Them</option>

                    </Field>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-between switchWrap mt-0">
                  <span className="switchLabel">
                    Do you want other members to see your profile?
                  </span>
                  <label className="switch mb-0 mt-0">
                    <Field name="is_see_other" type="checkbox"/>
                    <span className="slider">
                      <span className={`yes ${values.is_see_other && 'active'}`}>Yes</span>
                      <span className={`no ${!values.is_see_other && 'active'}`}>No</span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="prevBtn nextPrevBtn"
                  onClick={handlePrevStep}
                >
                  <img src={angleLeft} alt="angle"/>
                  Previous
                </button>
                <span></span>
                <button className="nextBtn nextPrevBtn" type="submit">
                  Next
                  <img src={angleRight} alt="angle"/>
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
        style={{width: props.getActiveStep === 2 ? `60%` : `40%`}}
        className="signupProgressBar"
      ></span>
      <span onClick={handleNextStep} className="skipBtn">
        Skip For Now <img src={crose} alt="crose"/>
      </span>
    </div>
  );
};

export default connect(null, {profileSetupAction})(MemberProfile);
