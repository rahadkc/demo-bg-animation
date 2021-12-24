import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import crose from "../../../../assets/images/icons/crose.svg";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../../assets/images/icons/list/delete-white.svg";
import deleteBlackIcon from "../../../../assets/images/icons/list/delete.svg";
import TextInput from "../../../../components/formfields/InputField";
import AddTaskForm from "../../../accountComplete/components/todo";
import { getCommunityDetailsAction } from "../../../App/actions";
import { uploadFileAction } from "../editHome/actions";
import { addCommunityDataAction } from "./actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  hero_title: Yup.string().required("Title can not be empty"),
  hero_sub_title: Yup.string().required("Sub-title can not be empty"),
  hero_button_title: Yup.string().required("Button title can not be empty"),
  supportive_title: Yup.string().required("Title can not be empty"),
  supportive_sub_title: Yup.string().required("Sub-title can not be empty"),
  supportive_paragraph: Yup.string().required("Paragraph can not be empty"),
  supportive_button_title: Yup.string().required("Button title can not be empty"),
  supportive_button_link: Yup.string().required("Button title can not be empty"),
  feature_title: Yup.string().required("Title can not be empty"),
  feature_button_title: Yup.string().required("Button title can not be empty"),
  features: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("title can not be empty"),
        paragraph: Yup.string().required("paragraph can not be empty"),
      })
    )
    .required("Features can not be empty")
    .min(1, "please add minimum 1 Features"),
  feature_image: Yup.array()
    .of(
      Yup.object().shape({
        image: Yup.string().required("title can not be empty"),
      })
    )
    .required("Features Image can not be empty")
    .min(3, "please add minimum 3 Feature image")
    .max(3, "please add maximum 3 Feature image"),
});

const EditCommunityCMS = (props) => {
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [supportiveCommunityEdit, setSupportiveCommunityEdit] = useState(false);
  const [featuresEdit, setFeaturesEdit] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };
  const initialState = {
    name: props.community?.name ? props.community?.name : "",
    url: props.community?.url ? props.community?.url : "/community",
    excerpt: props.community?.excerpt ? props.community?.excerpt : "",
    thumbnail: props.community?.thumbnail ? props.community?.thumbnail : "",

    hero_title: props.community?.hero_title ? props.community?.hero_title : "",
    hero_sub_title: props.community?.hero_sub_title
      ? props.community?.hero_sub_title
      : "",
    label: props.community?.label ? props.community?.label : "",
    hero_button_title: props.community?.hero_button_title
      ? props.community?.hero_button_title
      : "",
    hero_button_link: props.community?.hero_button_link
      ? props.community?.hero_button_link
      : "/signup",
    hero_image: props.community?.hero_image
      ? props.community?.hero_image
      : [
          {
            image: "",
          },
        ],

    supportive_title: props.community?.supportive_title
      ? props.community?.supportive_title
      : "",
    supportive_sub_title: props.community?.supportive_sub_title
      ? props.community?.supportive_sub_title
      : "",
    supportive_paragraph: props.community?.supportive_paragraph
      ? props.community?.supportive_paragraph
      : "",
    supportive_button_title: props.community?.supportive_button_title
      ? props.community?.supportive_button_title
      : "",
    supportive_button_link: props.community?.supportive_button_link
      ? props.community?.supportive_button_link
      : "/signup",
    supportive_image: props.community?.supportive_image
      ? props.community?.supportive_image
      : "",
    feature_title: props.community?.feature_title
      ? props.community?.feature_title
      : "",
    feature_button_title: props.community?.feature_button_title
      ? props.community?.feature_button_title
      : "",
    feature_button_link: props.community?.feature_button_link
      ? props.community?.feature_button_link
      : "/signup",
    feature_image: props.community?.feature_image
      ? props.community?.feature_image
      : [
          {
            image: "",
          },
        ],
    features: props.community?.features
      ? props.community?.features
      : [
          {
            title: "",
            paragraph: "",
          },
        ],
  };

  const handleSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keyword", keywords);
    form_data.append("thumbnail", values.thumbnail);
    form_data.append("hero_title", values.hero_title);
    form_data.append("hero_sub_title", values.hero_sub_title);
    form_data.append("label", values.label);
    form_data.append("hero_button_title", values.hero_button_title);
    form_data.append("hero_button_link", values.hero_button_link);
    form_data.append("hero_image", JSON.stringify(values.hero_image));
    form_data.append("feature_image", JSON.stringify(values.feature_image));
    form_data.append("features", JSON.stringify(values.features));
    form_data.append("supportive_title", values.supportive_title);
    form_data.append("supportive_sub_title", values.supportive_sub_title);
    form_data.append("supportive_paragraph", values.supportive_paragraph);
    form_data.append("supportive_button_title", values.supportive_button_title);
    form_data.append("supportive_button_link", values.supportive_button_link);
    form_data.append("supportive_image", values.supportive_image);
    form_data.append("feature_title", values.feature_title);
    form_data.append("feature_button_title", values.feature_button_title);
    form_data.append("feature_button_link", values.feature_button_link);

    props.addCommunityDataAction(form_data, setGeneralEdit);
    setHeroEdit(false);
    setSupportiveCommunityEdit(false);
    setFeaturesEdit(false);
  };

  useEffect(() => {
    props.getCommunityDetailsAction();
  }, []);
  useEffect(() => {
    setKeywords(props.community?.keyword ? props.community?.keyword : []);
  }, [props.community?.keyword]);
  const handleUpload = (event, fieldValue, name) => {
    const data = {
      file: event.currentTarget.files[0],
    };
    props.uploadFileAction(data, fieldValue, name);
  };
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap mb-25">
                <h2 className="adminSectionTitle">Community Page</h2>
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
                  setFieldValue,
                  errors,
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
                          <button className="savebtn" type="submit">
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
                        <label
                          className={
                            !generalEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Thumbnail
                        </label>
                        <div className="uploadImage">
                          {values.thumbnail ? (
                            <div className="fileImage">
                              <img src={values.thumbnail} alt="imagesss" />
                              {generalEdit ? (
                                <button
                                  onClick={() => setFieldValue("thumbnail", "")}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteIcon} alt="delete" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <button
                              component="label"
                              className="inputFileBtn"
                              type="button"
                            >
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                onChange={(e) => {
                                  setFieldValue(
                                    "thumbnail_preview",
                                    e.currentTarget.files[0]
                                  );
                                  handleUpload(e, setFieldValue, `thumbnail`);
                                }}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          heroEdit ? "editTitle" : ""
                        }`}
                      >
                        Hero Section
                        {heroEdit ? (
                          <button className="savebtn" type="submit">
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
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="hero_title"
                          component={TextInput}
                          value={values.hero_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />
                        <Field
                          label="Label"
                          name="label"
                          component={TextInput}
                          value={values.label}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Label"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub-title"
                          name="hero_sub_title"
                          component={TextInput}
                          value={values.hero_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub-title"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Title"
                          name="hero_button_title"
                          component={TextInput}
                          value={values.hero_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="hero_button_link"
                          component={TextInput}
                          value={values.hero_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />
                        <label
                          className={
                            !heroEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Images
                        </label>
                        <FieldArray
                          name="hero_image"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.hero_image.map((exp, index) => (
                                <div
                                  className="faqQuestionsWrap faqQuestionsWrapNew"
                                  key={index}
                                >
                                  {values.hero_image[index].image ? (
                                    <div className="videoCountStyle">
                                      <div className="videoCountWrap">
                                        <span className="labelCount">
                                          0{index + 1}
                                        </span>
                                        {heroEdit ? (
                                          <Fragment>
                                            {values.hero_image.length > 1 && (
                                              <button
                                                type="button"
                                                className="deleteIcon"
                                                onClick={() => {
                                                  arrayHelpers.remove(index);
                                                }}
                                              >
                                                <img
                                                  src={deleteBlackIcon}
                                                  alt="delete"
                                                />
                                              </button>
                                            )}
                                          </Fragment>
                                        ) : null}
                                      </div>
                                      <img
                                        src={values.hero_image[index].image}
                                        alt="imagessss"
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      className="inputFileBtn inputFileBtnSmall"
                                      type="button"
                                    >
                                      <h5>Upload Image</h5>
                                      <span className="fileText">
                                        (jpg, png, gif)
                                      </span>
                                      <span className="fileBtn">Add Item</span>

                                      <input
                                        id="file"
                                        name={`hero_image[${index}].image`}
                                        type="file"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) =>
                                          handleUpload(
                                            e,
                                            setFieldValue,
                                            `hero_image[${index}].image`
                                          )
                                        }
                                      />
                                    </button>
                                  )}

                                  <ErrorMessage
                                    name={`hero_image[${index}].image`}
                                    className="errorMessage"
                                    component="div"
                                  />
                                </div>
                              ))}
                              {typeof errors.hero_image === "string" ? (
                                <p className="errorMsg">{errors.hero_image}</p>
                              ) : null}
                              {heroEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      image: "",
                                    })
                                  }
                                >
                                  Add Item
                                </button>
                              ) : null}
                            </Fragment>
                          )}
                        />
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          supportiveCommunityEdit ? "editTitle" : ""
                        }`}
                      >
                        supportive community
                        {supportiveCommunityEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setSupportiveCommunityEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="supportive_title"
                          component={TextInput}
                          value={values.supportive_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!supportiveCommunityEdit}
                          className={supportiveCommunityEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub-title"
                          name="supportive_sub_title"
                          component={TextInput}
                          value={values.supportive_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub-title"
                          readOnly={!supportiveCommunityEdit}
                          className={supportiveCommunityEdit ? "editField" : ""}
                        />
                        <div className="multilineForm">
                          <label
                            className={
                              !supportiveCommunityEdit ? " editLabel" : ""
                            }
                          >
                            Paragraph
                          </label>
                          <Field
                            name="supportive_paragraph"
                            component={TextInput}
                            value={values.supportive_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            readOnly={!supportiveCommunityEdit}
                            className={
                              supportiveCommunityEdit ? "editField" : ""
                            }
                            multiline
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="supportive_button_title"
                          component={TextInput}
                          value={values.supportive_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!supportiveCommunityEdit}
                          className={supportiveCommunityEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="supportive_button_link"
                          component={TextInput}
                          value={values.supportive_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!supportiveCommunityEdit}
                          className={supportiveCommunityEdit ? "editField" : ""}
                        />
                        <label
                          className={
                            !supportiveCommunityEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Images
                        </label>

                        <div className="uploadImage">
                          {values.supportive_image ? (
                            <div className="fileImage">
                              <img
                                src={values.supportive_image}
                                alt="imagesss"
                              />
                              {supportiveCommunityEdit ? (
                                <button
                                  onClick={() =>
                                    setFieldValue("supportive_image", "")
                                  }
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteIcon} alt="delete" />
                                </button>
                              ) : null}
                            </div>
                          ) : (
                            <button
                              component="label"
                              className="inputFileBtn"
                              type="button"
                            >
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="supportive_image"
                                name="supportive_image"
                                type="file"
                                onChange={(e) => {
                                  handleUpload(
                                    e,
                                    setFieldValue,
                                    `supportive_image`
                                  );
                                }}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          featuresEdit ? "editTitle" : ""
                        }`}
                      >
                        Features
                        {featuresEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setFeaturesEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG">
                        <Field
                          label="Title"
                          name="feature_title"
                          component={TextInput}
                          value={values.feature_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!featuresEdit}
                          className={featuresEdit ? "editField" : ""}
                        />

                        <Field
                          label="Button Title"
                          name="feature_button_title"
                          component={TextInput}
                          value={values.feature_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!featuresEdit}
                          className={featuresEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="feature_button_link"
                          component={TextInput}
                          value={values.feature_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!featuresEdit}
                          className={featuresEdit ? "editField" : ""}
                        />
                        <label
                          className={
                            !featuresEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Images
                        </label>
                        <FieldArray
                          name="feature_image"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.feature_image.map((exp, index) => (
                                <div
                                  className="faqQuestionsWrap faqQuestionsWrapNew"
                                  key={index}
                                >
                                  {values.feature_image[index].image ? (
                                    <div className="videoCountStyle">
                                      <div className="videoCountWrap">
                                        <span className="labelCount">
                                          0{index + 1}
                                        </span>
                                        {featuresEdit ? (
                                          <Fragment>
                                            {values.feature_image.length >
                                              1 && (
                                              <button
                                                type="button"
                                                className="deleteIcon"
                                                onClick={() => {
                                                  arrayHelpers.remove(index);
                                                }}
                                              >
                                                <img
                                                  src={deleteBlackIcon}
                                                  alt="delete"
                                                />
                                              </button>
                                            )}
                                          </Fragment>
                                        ) : null}
                                      </div>
                                      <img
                                        src={values.feature_image[index].image}
                                        alt="imagessss"
                                      />
                                    </div>
                                  ) : (
                                    <button
                                      className="inputFileBtn inputFileBtnSmall"
                                      type="button"
                                    >
                                      <h5>Upload Image</h5>
                                      <span className="fileText">
                                        (jpg, png, gif)
                                      </span>
                                      <span className="fileBtn">Add Item</span>

                                      <input
                                        id="file"
                                        name={`feature_image[${index}].image`}
                                        type="file"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) =>
                                          handleUpload(
                                            e,
                                            setFieldValue,
                                            `feature_image[${index}].image`
                                          )
                                        }
                                      />
                                    </button>
                                  )}

                                  <ErrorMessage
                                    name={`feature_image[${index}].image`}
                                    className="errorMessage"
                                    component="div"
                                  />
                                </div>
                              ))}
                              {typeof errors.feature_image === "string" ? (
                                <p className="errorMsg">
                                  {errors.feature_image}
                                </p>
                              ) : null}
                              {featuresEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      image: "",
                                    })
                                  }
                                >
                                  Add Item
                                </button>
                              ) : null}
                            </Fragment>
                          )}
                        />
                        {typeof errors.feature_image === "string" ? (
                          <p className="errorMsg">{errors.feature_image}</p>
                        ) : null}
                        <div className="divider"></div>
                        <label
                          className={
                            !featuresEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Features
                        </label>
                        <FieldArray
                          name="features"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.features.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {featuresEdit ? (
                                      <Fragment>
                                        {" "}
                                        {values.features.length > 1 && (
                                          <button
                                            type="button"
                                            className="deleteIcon"
                                            onClick={() => {
                                              arrayHelpers.remove(index);
                                            }}
                                          >
                                            <img
                                              src={deleteBlackIcon}
                                              alt="delete"
                                            />
                                          </button>
                                        )}
                                      </Fragment>
                                    ) : null}
                                  </div>
                                  <div
                                    className={
                                      featuresEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  >
                                    <label htmlFor={`features${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`features[${index}].title`}
                                      placeholder="question"
                                      id={`features${index + 1}`}
                                      readOnly={!featuresEdit}
                                      disabled={!featuresEdit}
                                    />
                                    <ErrorMessage
                                      name={`features[${index}].title`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label
                                      className={
                                        !featuresEdit ? " editLabel" : ""
                                      }
                                    >
                                      Paragraph
                                    </label>
                                    <div className="editField inputStyle mb-0">
                                      <Field
                                        name={`features[${index}].paragraph`}
                                        component="textarea"
                                        readOnly={!featuresEdit}
                                        disabled={!featuresEdit}
                                      />
                                      <ErrorMessage
                                        name={`features[${index}].paragraph`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {featuresEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      title: "",
                                      paragraph: "",
                                    })
                                  }
                                >
                                  Add Item
                                </button>
                              ) : null}
                            </Fragment>
                          )}
                        />
                        {typeof errors.features === "string" ? (
                          <p className="errorMsg">{errors.features}</p>
                        ) : null}
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
  community: state.cms.community_data,
});

export default connect(mapStateToProps, {
  addCommunityDataAction,
  uploadFileAction,
  getCommunityDetailsAction,
})(withRouter(EditCommunityCMS));
