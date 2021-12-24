import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import crose from "../../../../assets/images/icons/crose.svg";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import TextInput from "../../../../components/formfields/InputField";
import AddTaskForm from "../../../accountComplete/components/todo";
import { getHowItWorksCMSDetails } from "../../../App/actions";
import { updateHowItWorksCMSCMSData } from "./actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  title: Yup.string().required("Title can not be empty"),
  subtitle: Yup.string().nullable(),
  body: Yup.string().nullable(),
  button_title: Yup.string().nullable(),
  button_link: Yup.string().nullable(),
});

const EditHowItWorks = (props) => {
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [bodyEdit, setBodyEdit] = useState(false);
  const [inputList, setInputList] = useState([
    { key: "", title: "title", body: "body" },
  ]);

  useEffect(() => {
    props.getHowItWorksCMSDetails();
  }, []);

  useEffect(() => {
    if (Object.keys(props?.howitworks_cms).length > 0) {
      if (props?.howitworks_cms.body.length !== 0) {
        setInputList(props?.howitworks_cms.body);
      }
    }
  }, [props?.howitworks_cms?.body]);

  const [keywords, setKeywords] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };
  const initialState = {
    name: props?.howitworks_cms?.name ? props?.howitworks_cms?.name : "",
    url: props?.howitworks_cms?.url
      ? props?.howitworks_cms?.url
      : "/how-it-works",
    excerpt: props?.howitworks_cms?.excerpt
      ? props?.howitworks_cms?.excerpt
      : "",
    title: props?.howitworks_cms?.title ? props?.howitworks_cms?.title : "",
    subtitle: props?.howitworks_cms?.subtitle
      ? props?.howitworks_cms?.subtitle
      : "",
    button_title: props?.howitworks_cms?.button_title
      ? props?.howitworks_cms?.button_title
      : "",
    button_link: props?.howitworks_cms?.button_link
      ? props?.howitworks_cms?.button_link
      : "",
  };

  const removeItem = (id) => {
    setInputList(inputList.filter((_, index) => index !== id));
  };

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addNewItem = () => {
    setInputList([...inputList, { key: "", title: "", body: "" }]);
  };

  const handleSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("title", values.title);
    form_data.append("subtitle", values.subtitle);
    form_data.append("button_title", values.button_title);
    form_data.append("button_link", values.button_link);
    form_data.append("body", JSON.stringify(inputList));

    props.updateHowItWorksCMSCMSData(form_data, setGeneralEdit);
    setHeroEdit(false);
  };

  useEffect(() => {
    setKeywords(props.howitworks_cms?.keywords ? props.howitworks_cms?.keywords : []);
  }, [props.howitworks_cms?.keywords]);

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap mb-25">
                <h2 className="adminSectionTitle">How It Works Page</h2>
                <span className="edit">
                  <img src={edit} alt="edit" />
                </span>
              </div>

              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <h3
                        className={`resourceAddTitle ${
                          generalEdit ? "editTitle" : ""
                        }`}
                      >
                        General Info
                        {generalEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              handleSubmit(values);
                              setGeneralEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setGeneralEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Name"
                          name="name"
                          component={TextInput}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Name"
                          readOnly={!generalEdit}
                          disabled={!generalEdit}
                          className={generalEdit ? "editField" : ""}
                        />

                        <div
                          className={
                            generalEdit ? "editField inputStyle" : "inputStyle"
                          }
                        >
                          <label htmlFor="url">URL</label>
                          <Field
                            name="url"
                            type="text"
                            id="url"
                            value={values.url}
                            placeholder="URL"
                            readOnly
                            disabled
                          />
                        </div>
                        <div className="multilineForm">
                          <label className={!generalEdit ? " editLabel" : ""}>
                            Excerpt
                          </label>
                          <Field
                            name="excerpt"
                            component={TextInput}
                            value={values.excerpt}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Excerpt"
                            readOnly={!generalEdit}
                            className={generalEdit ? "editField" : ""}
                            multiline
                            disabled={!generalEdit}
                          />
                        </div>
                        <div
                          className={`inputStyle ${
                            generalEdit ? "editField" : ""
                          }`}
                        >
                          <label>Keywords</label>
                          {generalEdit ? (
                            <AddTaskForm
                              addTask={addKeywords}
                              placeholder="Keywords"
                            />
                          ) : (
                            ""
                          )}
                          <ul className="todo-list">
                            {keywords?.map((task, index) => (
                              <li key={index} className="todo">
                                <span className="label">{task}</span>
                                {generalEdit ? (
                                  <span
                                    className="delete"
                                    onClick={() => removeExpertise(index)}
                                  >
                                    <img src={crose} alt="delete" />
                                  </span>
                                ) : (
                                  ""
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          heroEdit ? "editTitle" : ""
                        }`}
                      >
                        Hero Section
                        {heroEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              handleSubmit(values);
                              setHeroEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setHeroEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG">
                        <Field
                          label="Title"
                          name="title"
                          component={TextInput}
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!heroEdit ? " editLabel" : ""}>
                            Subtitle
                          </label>
                          <Field
                            name="subtitle"
                            component={TextInput}
                            value={values.subtitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Subtitle"
                            readOnly={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                            multiline
                          />
                        </div>

                        <div className="multilineForm">
                          <label className={!heroEdit ? " editLabel" : ""}>
                            Button Title
                          </label>
                          <Field
                            name="button_title"
                            component={TextInput}
                            value={values.button_title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Button Title"
                            readOnly={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                            multiline
                          />
                        </div>

                        <div className="multilineForm">
                          <label className={!heroEdit ? " editLabel" : ""}>
                            Button Link
                          </label>
                          <Field
                            name="button_link"
                            component={TextInput}
                            value={values.button_link}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Button Link"
                            readOnly={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle mt-5 ${
                          heroEdit ? "editTitle" : ""
                        }`}
                      >
                        Body
                        {bodyEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              handleSubmit(values);
                              setBodyEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setBodyEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <div className="row align-center">
                          {inputList?.map((item, index) => (
                            <>
                              <div className="col-2 inputStyle  ">
                                <label
                                  className={bodyEdit ? " editLabel" : ""}
                                  htmlFor=""
                                >
                                  Key
                                </label>
                                <input
                                  name="key"
                                  value={item.key}
                                  onChange={(event) =>
                                    handleItemChange(event, index)
                                  }
                                  onBlur={handleBlur}
                                  placeholder="Key"
                                  readOnly={!bodyEdit}
                                  className={bodyEdit ? "editField" : ""}
                                />
                              </div>
                              <div className="col-4 inputStyle  ">
                                <label
                                  className={bodyEdit ? " editLabel" : ""}
                                  htmlFor=""
                                >
                                  Title
                                </label>
                                <input
                                  name="title"
                                  value={item.title}
                                  onChange={(event) =>
                                    handleItemChange(event, index)
                                  }
                                  onBlur={handleBlur}
                                  placeholder="Title"
                                  readOnly={!bodyEdit}
                                  className={bodyEdit ? "editField" : ""}
                                />
                              </div>
                              <div className="col-5 inputStyle  ">
                                <label
                                  className={bodyEdit ? " editLabel" : ""}
                                  htmlFor=""
                                >
                                  Body
                                </label>
                                <input
                                  name="body"
                                  value={item.body}
                                  onChange={(event) =>
                                    handleItemChange(event, index)
                                  }
                                  onBlur={handleBlur}
                                  placeholder="Body"
                                  readOnly={!bodyEdit}
                                  className={bodyEdit ? "editField" : ""}
                                />
                              </div>
                              <div className="col-1">
                                <svg
                                  className="subscription__removeitem"
                                  onClick={() =>
                                    bodyEdit ? removeItem(index) : ""
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-9h10v2H7v-2z" />
                                </svg>
                              </div>
                            </>
                          ))}

                          <div className="subscription__addanother">
                            <button
                              type="button"
                              onClick={(e) => (bodyEdit ? addNewItem(e) : null)}
                            >
                              Add another
                            </button>
                          </div>
                        </div>
                      </div>
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

const mapStateToProps = (state) => ({
  howitworks_cms: state.cms.howitworks,
});

export default connect(mapStateToProps, {
  getHowItWorksCMSDetails,
  updateHowItWorksCMSCMSData,
})(withRouter(EditHowItWorks));
