import { Field, Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
// images
import stepBg from "../../../assets/images/bg/account/step1.svg";
import angleLeft from "../../../assets/images/icons/arrow-left.svg";
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import crose from "../../../assets/images/icons/crose.svg";
import TextInput from "../../../components/formfields/InputField";
import { memberProfileAction } from "../actions";
import AddTaskForm from "./todo";

const validationSchema = Yup.object({
  credentials: Yup.string(),
});

const MemberProfile2 = (props) => {
  const initialState = {
    credentials: "",
    is_referral: true,
  };

  const [areasExpertise, setAreasExpertise] = useState([]);
  const [featuredLinks, setFeaturedLinks] = useState([]);

  const handleNextStep = () => {
    props.setShowBasic(true);
    setTimeout(() => {
      props.activeStep(props.currentStep + 1);
      props.nextStep();
    }, 500);
  };

  // useEffect(() => {
  //   console.log("hehe");

  // }, [props.showBasic]);

  const handlePrevStep = () => {
    props.activeStep(props.getActiveStep - 1);
    props.previousStep();
  };

  const addExpertise = (text) => {
    setAreasExpertise((areasExpertise) => [...areasExpertise, text]);
  };
  const addFeaturedLinks = (text) => setFeaturedLinks([...featuredLinks, text]);

  const removeExpertise = (index) => {
    const newTasks = [...areasExpertise];

    newTasks.splice(index, 1);
    setAreasExpertise(newTasks);
  };

  const removeFeaturedLinks = (index) => {
    const newTasks = [...featuredLinks];

    newTasks.splice(index, 1);
    setFeaturedLinks(newTasks);
  };

  const handleSubmit = (values) => {
    const data = {
      credentials: values.credentials,
      is_referral: values.is_referral,
      expertise: areasExpertise,
      feature: featuredLinks,
    };

    props.memberProfileAction(data, props);
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
              <h2 className="loginTitle">Setup Your Member Profile</h2>
              <div className="accountCard">
                <Field
                  id="credentials"
                  name="credentials"
                  component={TextInput}
                  value={values.credentials}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Credentials"
                />
                <div className="inputStyle">
                  <AddTaskForm
                    addTask={addExpertise}
                    placeholder="Areas of Expertise (Separate by using commas)"
                  />
                  <ul className="todo-list">
                    {areasExpertise.map((task, index) => (
                      <li key={index} className="todo">
                        <span className="label">{task}</span>
                        <span
                          className="delete"
                          onClick={() => removeExpertise(index)}
                        >
                          <img src={crose} alt="delete" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="inputStyle">
                  <AddTaskForm
                    addTask={addFeaturedLinks}
                    placeholder="Featured Links (Separate by using commas)"
                  />
                  <ul className="todo-list">
                    {featuredLinks.map((task, index) => (
                      <li key={index} className="todo">
                        <span className="label">{task}</span>
                        <span
                          className="delete"
                          onClick={() => removeFeaturedLinks(index)}
                        >
                          <img src={crose} alt="delete" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex flex-wrap justify-content-between switchWrap mt-0">
                  <span className="switchLabel">
                    Are you accepting referrals at this time?
                  </span>
                  <label className="switch mb-0 mt-0">
                    <Field name="is_referral" type="checkbox" />
                    <span className="slider">
                      <span className={`yes ${values.is_referral && "active"}`}>
                        Yes
                      </span>
                      <span className={`no ${!values.is_referral && "active"}`}>
                        No
                      </span>
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
                  <img src={angleLeft} alt="angle" />
                  Previous
                </button>
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
        style={{ width: props.getActiveStep === 4 ? `100%` : `80%` }}
        className="signupProgressBar"
      ></span>
      <span onClick={handleNextStep} className="skipBtn">
        Skip For Now <img src={crose} alt="crose" />
      </span>
    </div>
  );
};

export default connect(null, { memberProfileAction })(MemberProfile2);
