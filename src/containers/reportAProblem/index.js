import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import menuBg from "../../assets/images/bg/menu/home.svg";
import upcomingBg from "../../assets/images/bg/problem.svg";
import plane from "../../assets/images/icons/plane.svg";
import FooterBottom from "../../components/footerBottom";
import TextInput from "../../components/formfields/InputField";
import SubmitLoader from "../../components/SubmitLoader";
// components
import Header from "../../components/header";
import LeftSideMenu from "../../components/leftmenu";
import LoginModal from "../../components/loginModal";
import MainMenu from "../../components/mainMenu";
import SuccessModal from "../../components/successModal";
import { requestProblemAction } from "./actions";
import "./style.scss";

const cookie = new Cookies();

const validationSchema = Yup.object({
  title: Yup.string().required("title can not be empty"),
  description: Yup.string().required("description can not be empty"),
});
const ReportAProblem = (props) => {
  const user_token = cookie.get("user_token");
  const [openMenu, setOpenMenu] = useState(false);
  const [isModalLogin, setIsModalLogin] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleCloseMenuMenu = () => {
    setOpenMenu(false);
  };

  const initialState = {
    title: "",
    description: "",
    featureIdea: true,
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <li key={file.name}>
      <img src={file.preview} alt={file.name} />
    </li>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  useEffect(() => {
    if (!cookie.get("user_token")) {
      props.history.push("/login");
    }
  }, []);
  const handleSubmit = (values, actions) => {
    const data = {
      idea: values.featureIdea,
      title: values.title,
      description: values.description,
      image: files,
    };
    if (user_token) {
      if (!props.user_info?.email_verified_at) {
        props.history.push("/confirm-email");
      } else if (props.user_info?.is_complete === "0") {
        props.history.push("/account-complete");
      } else {
        props.requestProblemAction(data, actions, setFiles, setSuccess);
      }
    } else {
      setIsModalLogin(true);
    }
  };
  return (
    <Fragment>
      <Helmet>
        <title>Report A Problem - Clarity Cooperative</title>
      </Helmet>
      <LeftSideMenu
        isOpen={openMenu}
        openMenu={handleOpenMenu}
        className="sidebarShadowChange"
        title="REPORT A PROBLEM"
      />
      <MainMenu
        closeMenu={handleCloseMenuMenu}
        title="NAVIGATE"
        bgImage={menuBg}
        className={openMenu ? "active" : ""}
      />
      <Header
        openMenu={handleOpenMenu}
        className="headerStyleWhite"
        logoWhite={true}
      />

      <section
        className={`usefulFeatureArea2Style usefulFeatureArea`}
        style={{
          background: `url(${upcomingBg}) no-repeat center center / cover`,
        }}
      >
        <div className="usefulFeatureTitle">
          <h2>Experiencing a technical problem?</h2>
          <p>We definitely want to fix it!</p>
        </div>

        <Formik
          initialValues={initialState}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, handleBlur }) => {
            return (
              <Form className="usefulFeatureForm">
                <div className="usefulFeatureFormBG">
                  <Field
                    label="Name of Technical Problem*"
                    id="title"
                    name="title"
                    component={TextInput}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Title"
                  />
                  <Field
                    label="Description Of Technical Problem*"
                    id="description"
                    name="description"
                    component={TextInput}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe your idea in as much detail as you can"
                  />
                  <div className="inputStyle">
                    <label>Send us a screenshot!</label>
                    <div {...getRootProps({ className: "dropzoneStyle" })}>
                      <input {...getInputProps()} />
                      <p>Drag & Drop files here to upload.</p>
                      <button type="button">Browse</button>
                    </div>
                    <ul className="thumbImages">{thumbs}</ul>
                  </div>
                  <div className="inputStyle mb-0">
                    <label>
                      Can we call you about the problem you’re experiencing?*
                    </label>
                    <label className="switch">
                      <Field name="featureIdea" type="checkbox" />
                      <span className="slider">
                        <span className={`yes ${values.featureIdea && 'active'}`}>Yes</span>
                        <span className={`no ${!values.featureIdea && 'active'}`}>No</span>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="sendbtn"
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
                </div>
              </Form>
            );
          }}
        </Formik>
      </section>
      <FooterBottom />
      <LoginModal
        isOpen={isModalLogin}
        onClosed={() => setIsModalLogin(false)}
        modal={setIsModalLogin}
      />
      <SuccessModal
        isOpen={success}
        onClosed={() => setSuccess(false)}
        title="Your issue has been submitted."
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user_info: state.my_account.user_info,
  meta: state.meta,
});

export default connect(mapStateToProps, { requestProblemAction })(withRouter(ReportAProblem));
