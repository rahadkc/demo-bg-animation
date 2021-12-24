import { Form, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
// images
import stepBg from "../../../assets/images/bg/account/step3.svg";
import angleLeft from "../../../assets/images/icons/arrow-left.svg";
import angleRight from "../../../assets/images/icons/arrow-right.svg";
import camera from "../../../assets/images/icons/camera.svg";
import { uploadProfilePictureAction } from "../actions";
import ThumbImg from "./uploadImg";

const validationSchema = Yup.object({
  photo: Yup.string().required("this cannot be left empty"),
});

const ProfilePhoto = (props) => {
  const [setImage] = useState("");

  const initialState = {
    photo: "",
  };

  const handlePrevStep = () => {
    props.activeStep(props.currentStep - 1);
    props.previousStep();
  };

  const handleSubmit = (values) => {
    props.uploadProfilePictureAction(values, props);
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
        {({ touched, errors, setFieldValue, values }) => {
          return (
            <Form className="loginForm">
              <h2 className="loginTitle text-center">Add A Profile Photo</h2>

              <div className="uploadProfilePhoto">
                <ThumbImg
                  file={values.photo}
                  setImage={setImage}
                  className={values.photo ? "uploadthumbImg" : "removeImage"}
                />
                <div
                  className={
                    values.photo
                      ? "uploadImageBtn imageRemove"
                      : "uploadImageBtn"
                  }
                >
                  <span>Click to Upload</span>
                  <label className="inputFile">
                    <img src={camera} alt="imagesss" />
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("photo", event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                </div>
                {touched.photo && errors.photo && (
                  <p className="errorMsg">{errors.photo}</p>
                )}
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
        style={{ width: props.getActiveStep === 3 ? `80%` : `60%` }}
        className="signupProgressBar"
      ></span>
    </div>
  );
};

export default connect(null, { uploadProfilePictureAction })(ProfilePhoto);
