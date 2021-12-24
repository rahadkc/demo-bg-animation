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
import { getHomeDataAction } from "../../../home/actions";
import {
  addGeneralHomeDataAction,
  addHeroHomeDataAction,
  addHomeThreeDataAction,
  addWhatHomeDataAction,
  uploadFileAction,
} from "./actions";
import "./style.scss";

const generalSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
});

const heroSchema = Yup.object({
  hero_title: Yup.string().required("Title can not be empty"),
  hero_sub_title: Yup.string().required("Sub-title can not be empty"),
  hero_button_title: Yup.string().required("Button title can not be empty"),
});
const whatSchema = Yup.object({
  what_title: Yup.string().required("Title can not be empty"),
  what_sub_title: Yup.string().required("Sub-title can not be empty"),
  what_paragraph: Yup.string().required("Paragraph can not be empty"),
  what_button_title: Yup.string().required("Button title can not be empty"),
  what_image: Yup.array()
    .of(
      Yup.object().shape({
        image: Yup.string().required("images can not be empty"),
      })
    )
    .required("what image can not be empty"),
  help_title: Yup.string().required("Title can not be empty"),
  help_sub_title: Yup.string().required("Sub-title can not be empty"),
  help_paragraph: Yup.string().required("Paragraph can not be empty"),
  help_button_title: Yup.string().required("Button title can not be empty"),
  help: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("title can not be empty"),
        paragraph: Yup.string().required("paragraph can not be empty"),
      })
    )
    .required("help Questions can not be empty")
    .min(1, "please add minimum 1 help Questions"),
});

const whoSchema = Yup.object({
  // who_title: Yup.string().required("Title can not be empty"),
  // who_paragraph: Yup.string().required("Paragraph can not be empty"),
  // who_button_title: Yup.string().required("Button title can not be empty"),
  // who_items: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       title: Yup.string().required("title can not be empty"),
  //       color: Yup.string().required("color can not be empty"),
  //       video: Yup.string().required("video can not be empty"),
  //       bottom_text: Yup.string().required("animation text can not be empty"),
  //     })
  //   )
  //   .required("items can not be empty")
  //   .min(3, "please add minimum 3 items")
  //   .max(3, "you can add max 3 items"),
  // membership_title: Yup.string().required("Title can not be empty"),
  // membership_button_title: Yup.string().required(
  //   "Button title can not be empty"
  // ),
  // membership: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       title: Yup.string().required("title can not be empty"),
  //       paragraph: Yup.string().required("paragraph can not be empty"),
  //       icon: Yup.string().required("icon can not be empty"),
  //     })
  //   )
  //   .required("items can not be empty")
  //   .min(6, "please add minimum 6 items")
  //   .max(6, "you can add max 6 items"),
  // feature_title: Yup.string().required("Title can not be empty"),
  // feature_paragraph: Yup.string().required("Paragraph can not be empty"),
  // feature_button_title: Yup.string().required("Button title can not be empty"),
  // testimonial_title: Yup.string().required("Title can not be empty"),
  // testimonial_paragraph: Yup.string().required("Title can not be empty"),
  // testimonial_button_title: Yup.string().required(
  //   "Button title can not be empty"
  // ),
  // testimonial: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       title: Yup.string().required("title can not be empty"),
  //       paragraph: Yup.string().required("paragraph can not be empty"),
  //       icon: Yup.string().required("icon can not be empty"),
  //     })
  //   )
  //   .required("items can not be empty")
  //   .min(5, "please add minimum 5 items")
  //   .max(5, "you can add max 5 items"),
  // community_title: Yup.string().required("Title can not be empty"),
  // community_sub_title: Yup.string().required("Sub-title can not be empty"),
  // community_image: Yup.string().required("Image can not be empty"),
});

const EditHome = (props) => {
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [whatEdit, setWhatEdit] = useState(false);
  const [helpEdit, setHelpEdit] = useState(false);
  const [whoEdit, setWhoEdit] = useState(false);
  const [membershipEdit, setMembershipEdit] = useState(false);
  const [featureEdit, setFeatureEdit] = useState(false);
  const [testimonialEdit, setTestimonialEdit] = useState(false);
  const [communityEdit, setCommunityEdit] = useState(false);
  const [setCommunityImage] = useState(false);

  const [keywords, setKeywords] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };
  const generalState = {
    name: props.home_data?.name ? props.home_data?.name : "",
    url: props.home_data?.url ? props.home_data?.url : "/",
    excerpt: props.home_data?.excerpt ? props.home_data?.excerpt : "",
    thumbnail: props.home_data?.thumbnail ? props.home_data?.thumbnail : "",
  };
  const heroState = {
    hero_title: props.home_data?.hero_title ? props.home_data?.hero_title : "",
    hero_sub_title: props.home_data?.hero_sub_title
      ? props.home_data?.hero_sub_title
      : "",
    hero_button_title: props.home_data?.hero_button_title
      ? props.home_data?.hero_button_title
      : "",
    hero_button_link: props.home_data?.hero_button_link
      ? props.home_data?.hero_button_link
      : "/signup",
    hero_image: props.home_data?.hero_image ? props.home_data?.hero_image : "",
    hero_video: props.home_data?.hero_video
      ? props.home_data?.hero_video
      : [
          {
            video: "",
          },
        ],
  };
  const whatState = {
    what_title: props.home_data?.what_title ? props.home_data?.what_title : "",
    what_sub_title: props.home_data?.what_sub_title
      ? props.home_data?.what_sub_title
      : "",
    what_paragraph: props.home_data?.what_paragraph
      ? props.home_data?.what_paragraph
      : "",
    what_button_title: props.home_data?.what_button_title
      ? props.home_data?.what_button_title
      : "",
    what_button_link: props.home_data?.what_button_link
      ? props.home_data?.what_button_link
      : "/signup",
    what_image: props.home_data?.what_image
      ? props.home_data?.what_image
      : [
          {
            image: "",
          },
        ],
    parallax_title: props.home_data?.parallax_title
      ? props.home_data?.parallax_title
      : "",
    help_title: props.home_data?.help_title ? props.home_data?.help_title : "",
    help_sub_title: props.home_data?.help_sub_title
      ? props.home_data?.help_sub_title
      : "",
    help_paragraph: props.home_data?.help_paragraph
      ? props.home_data?.help_paragraph
      : "",
    help_button_title: props.home_data?.help_button_title
      ? props.home_data?.help_button_title
      : "",
    help_button_link: props.home_data?.help_button_title
      ? props.home_data?.help_button_title
      : "/signup",
    help: props.home_data?.help
      ? props.home_data?.help
      : [
          {
            title: "",
            paragraph: "",
          },
        ],
  };

  const whoState = {
    who_title: props.home_data?.who_title ? props.home_data?.who_title : "",
    who_paragraph: props.home_data?.who_paragraph
      ? props.home_data?.who_paragraph
      : "",
    who_button_title: props.home_data?.who_button_title
      ? props.home_data?.who_button_title
      : "",
    who_button_link: props.home_data?.who_button_link
      ? props.home_data?.who_button_link
      : "/signup",
    who_items: props.home_data?.who_items
      ? props.home_data?.who_items
      : [
          {
            title: "",
            color: "",
            video: "",
            animated_text: [""],
          },
        ],
    membership_title: props.home_data?.membership_title
      ? props.home_data?.membership_title
      : "",
    membership_button_title: props.home_data?.membership_button_title
      ? props.home_data?.membership_button_title
      : "",
    membership_button_link: props.home_data?.membership_button_link
      ? props.home_data?.membership_button_link
      : "/signup",
    membership: props.home_data?.membership
      ? props.home_data?.membership
      : [
          {
            title: "",
            paragraph: "",
            icon: "",
          },
        ],
    feature_title: props.home_data?.feature_title
      ? props.home_data?.feature_title
      : "",
    feature_paragraph: props.home_data?.feature_paragraph
      ? props.home_data?.feature_paragraph
      : "",
    feature_button_title: props.home_data?.feature_button_title
      ? props.home_data?.feature_button_title
      : "",
    feature_button_link: props.home_data?.feature_button_link
      ? props.home_data?.feature_button_link
      : "/signup",
    testimonial_title: props.home_data?.testimonial_title
      ? props.home_data?.testimonial_title
      : "",
    testimonial_paragraph: props.home_data?.testimonial_paragraph
      ? props.home_data?.testimonial_paragraph
      : "",
    testimonial_button_title: props.home_data?.testimonial_button_title
      ? props.home_data?.testimonial_button_title
      : "",
    testimonial_button_link: props.home_data?.testimonial_button_link
      ? props.home_data?.testimonial_button_link
      : "/signup",
    testimonial: props.home_data?.testimonial
      ? props.home_data?.testimonial
      : [
          {
            title: "",
            paragraph: "",
            icon: "",
            color: "",
          },
        ],
    community_title: props.home_data?.community_title
      ? props.home_data?.community_title
      : "",
    community_sub_title: props.home_data?.community_sub_title
      ? props.home_data?.community_sub_title
      : "",
    community_image: props.home_data?.community_image
      ? props.home_data?.community_image
      : "",
    community_video: props.home_data?.community_video
      ? props.home_data?.community_video
      : "",
      is_video: props.home_data?.is_video === "Yes",
  };

  const handleGeneralSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("thumbnail", values.thumbnail);
    props.addGeneralHomeDataAction(form_data, setGeneralEdit);
  };

  const handleHeroSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("hero_title", values.hero_title);
    form_data.append("hero_sub_title", values.hero_sub_title);
    form_data.append("hero_button_title", values.hero_button_title);
    form_data.append("hero_button_link", values.hero_button_link);
    form_data.append("hero_image", values.hero_image);
    form_data.append("hero_video", JSON.stringify(values.hero_video));
    props.addHeroHomeDataAction(form_data, setHeroEdit);
  };
  const handleWhatSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("what_title", values.what_title);
    form_data.append("what_sub_title", values.what_sub_title);
    form_data.append("what_paragraph", values.what_paragraph);
    form_data.append("what_button_title", values.what_button_title);
    form_data.append("what_button_link", values.what_button_link);
    form_data.append("parallax_title", values.parallax_title);
    form_data.append("what_image", JSON.stringify(values.what_image));
    form_data.append("help_title", values.help_title);
    form_data.append("help_sub_title", values.help_sub_title);
    form_data.append("help_paragraph", values.help_paragraph);
    form_data.append("help_button_title", values.help_button_title);
    form_data.append("help_button_link", values.help_button_link);
    form_data.append("help", JSON.stringify(values.help));
    props.addWhatHomeDataAction(form_data, setWhatEdit);
    setHelpEdit(false);
  };

  const handleWhoSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("who_title", values.who_title);
    form_data.append("who_paragraph", values.who_paragraph);
    form_data.append("who_button_title", values.who_button_title);
    form_data.append("who_button_link", values.who_button_link);
    form_data.append("who_items", JSON.stringify(values.who_items));
    form_data.append("membership_title", values.membership_title);
    form_data.append("membership_button_title", values.membership_button_title);
    form_data.append("membership_button_link", values.membership_button_link);
    form_data.append("membership", JSON.stringify(values.membership));
    form_data.append("feature_title", values.feature_title);
    form_data.append("feature_paragraph", values.feature_paragraph);
    form_data.append("feature_button_title", values.feature_button_title);
    form_data.append("feature_button_link", values.feature_button_link);
    form_data.append("testimonial_title", values.testimonial_title);
    form_data.append("testimonial_paragraph", values.testimonial_paragraph);
    form_data.append(
      "testimonial_button_title",
      values.testimonial_button_title
    );
    form_data.append("testimonial", JSON.stringify(values.testimonial));
    form_data.append("community_title", values.community_title);
    form_data.append("community_sub_title", values.community_sub_title);
    form_data.append("community_image", values.community_image);
    form_data.append("community_video", values.community_video);
    form_data.append("is_video", values.is_video);
    props.addHomeThreeDataAction(form_data);
    setWhoEdit(false);
    setMembershipEdit(false);
    setFeatureEdit(false);
    setTestimonialEdit(false);
    setCommunityEdit(false);
    setCommunityImage(false);
  };

  useEffect(() => {
    props.getHomeDataAction();
  }, []);
  useEffect(() => {
    setKeywords(props.home_data?.keywords ? props.home_data?.keywords : []);
  }, [props.home_data?.keywords]);
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
                <h2 className="adminSectionTitle">Home Page</h2>
                <span className="edit">
                  <img src={edit} alt="edit" />
                </span>
              </div>

              <Formik
                enableReinitialize
                initialValues={generalState}
                validationSchema={generalSchema}
                onSubmit={handleGeneralSubmit}
              >
                {({ values, handleChange, handleBlur, setFieldValue }) => {
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
                                  handleUpload(e, setFieldValue, `thumbnail`);
                                }}
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <Formik
                enableReinitialize
                initialValues={heroState}
                validationSchema={heroSchema}
                onSubmit={handleHeroSubmit}
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
                          Image
                        </label>
                        <div className="uploadImage mb-30">
                          {values.hero_image ? (
                            <div className="fileImage">
                              <img src={values.hero_image} alt="" />
                              {heroEdit ? (
                                <button
                                  onClick={() =>
                                    setFieldValue("hero_image", "")
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
                              <span className="fileText"> (jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="hero_image"
                                name="hero_image"
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={(e) =>
                                  handleUpload(e, setFieldValue, "hero_image")
                                }
                              />
                            </button>
                          )}
                        </div>
                        <label
                          className={
                            !heroEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Videos
                        </label>
                        <FieldArray
                          name="hero_video"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.hero_video.map((exp, index) => (
                                <div
                                  className="faqQuestionsWrap faqQuestionsWrapNew"
                                  key={index}
                                >
                                  {values.hero_video[index].video ? (
                                    <div className="videoCountStyle">
                                      <div className="videoCountWrap">
                                        <span className="labelCount">
                                          0{index + 1}
                                        </span>
                                        {heroEdit ? (
                                          <Fragment>
                                            {values.hero_video.length > 1 && (
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
                                      <div className="videoView">
                                        <video
                                          controls
                                          autoPlay
                                          src={values.hero_video[index].video}
                                        ></video>
                                      </div>
                                    </div>
                                  ) : (
                                    <button
                                      className="inputFileBtn inputFileBtnSmall"
                                      type="button"
                                    >
                                      <h5>Upload Video</h5>
                                      <span className="fileText">
                                        (mp4, m4v)
                                      </span>
                                      <span className="fileBtn">Add Item</span>

                                      <input
                                        id="file"
                                        name={`hero_video[${index}].video`}
                                        type="file"
                                        accept="video/mp4,video/x-m4v,video/*"
                                        onChange={(e) =>
                                          handleUpload(
                                            e,
                                            setFieldValue,
                                            `hero_video[${index}].video`
                                          )
                                        }
                                      />
                                    </button>
                                  )}

                                  <ErrorMessage
                                    name={`hero_video[${index}].video`}
                                    className="errorMessage"
                                    component="div"
                                  />
                                </div>
                              ))}
                              {typeof errors.hero_video === "string" ? (
                                <p className="errorMsg">{errors.hero_video}</p>
                              ) : null}
                              {values.hero_video.length < 3 ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Add Item
                                </button>
                              ) : null}
                            </Fragment>
                          )}
                        />
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <Formik
                enableReinitialize
                initialValues={whatState}
                validationSchema={whatSchema}
                onSubmit={handleWhatSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <h3
                        className={`resourceAddTitle ${
                          whatEdit ? "editTitle" : ""
                        }`}
                      >
                        What is the Clarity Cooperative?
                        {whatEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setWhatEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="what_title"
                          component={TextInput}
                          value={values.what_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!whatEdit}
                          className={whatEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub-title"
                          name="what_sub_title"
                          component={TextInput}
                          value={values.what_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub-title"
                          readOnly={!whatEdit}
                          className={whatEdit ? "editField" : ""}
                        />
                        <div className="multilineForm">
                          <label className={!whatEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="what_paragraph"
                            component={TextInput}
                            value={values.what_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            readOnly={!whatEdit}
                            className={whatEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="what_button_title"
                          component={TextInput}
                          value={values.what_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!whatEdit}
                          className={whatEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="what_button_link"
                          component={TextInput}
                          value={values.what_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!whatEdit}
                          className={whatEdit ? "editField" : ""}
                        />
                        <label
                          className={
                            !whatEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Images
                        </label>
                        <FieldArray
                          name="what_image"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.what_image.map((exp, index) => (
                                <div
                                  className="faqQuestionsWrap faqQuestionsWrapNew"
                                  key={index}
                                >
                                  {values.what_image[index].image ? (
                                    <div className="videoCountStyle">
                                      <div className="videoCountWrap">
                                        <span className="labelCount">
                                          0{index + 1}
                                        </span>
                                        {whatEdit ? (
                                          <>
                                            {values.what_image.length > 1 && (
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
                                          </>
                                        ) : null}
                                      </div>
                                      <img
                                        src={values.what_image[index].image}
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
                                        name={`what_image[${index}].image`}
                                        type="file"
                                        accept="image/x-png,image/gif,image/jpeg"
                                        onChange={(e) =>
                                          handleUpload(
                                            e,
                                            setFieldValue,
                                            `what_image[${index}].image`
                                          )
                                        }
                                      />
                                    </button>
                                  )}

                                  <ErrorMessage
                                    name={`what_image[${index}].image`}
                                    className="errorMessage"
                                    component="div"
                                  />
                                </div>
                              ))}
                              {typeof errors.what_image === "string" ? (
                                <p className="errorMsg">{errors.what_image}</p>
                              ) : null}
                              {whatEdit ? (
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
                          whatEdit ? "editTitle" : ""
                        }`}
                      >
                        Parallax Line
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Parallax Title"
                          name="parallax_title"
                          component={TextInput}
                          value={values.parallax_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Parallax Title"
                          readOnly={!whatEdit}
                          className={whatEdit ? "editField mb-0" : "mb-0"}
                        />
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          helpEdit ? "editTitle" : ""
                        }`}
                      >
                        How We Help
                        {helpEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setHelpEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="help_title"
                          component={TextInput}
                          value={values.help_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!helpEdit}
                          className={helpEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub-title"
                          name="help_sub_title"
                          component={TextInput}
                          value={values.help_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub-title"
                          readOnly={!helpEdit}
                          className={helpEdit ? "editField" : ""}
                        />
                        <div className="multilineForm">
                          <label className={!helpEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="help_paragraph"
                            component={TextInput}
                            value={values.help_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            readOnly={!helpEdit}
                            className={helpEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="help_button_title"
                          component={TextInput}
                          value={values.help_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!helpEdit}
                          className={helpEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="help_button_link"
                          component={TextInput}
                          value={values.help_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!helpEdit}
                          className={helpEdit ? "editField" : ""}
                        />

                        <div className="divider"></div>
                        <label
                          className={
                            !helpEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Helps
                        </label>
                        <FieldArray
                          name="help"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.help.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {helpEdit ? (
                                      <Fragment>
                                        {" "}
                                        {values.help.length > 1 && (
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
                                      helpEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  >
                                    <label htmlFor={`help${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`help[${index}].title`}
                                      placeholder="question"
                                      id={`help${index + 1}`}
                                      readOnly={!helpEdit}
                                      disabled={!helpEdit}
                                    />
                                    <ErrorMessage
                                      name={`help[${index}].title`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label
                                      className={!helpEdit ? " editLabel" : ""}
                                    >
                                      Paragraph
                                    </label>
                                    <div className="editField inputStyle mb-0">
                                      <Field
                                        name={`help[${index}].paragraph`}
                                        component="textarea"
                                        readOnly={!helpEdit}
                                        disabled={!helpEdit}
                                      />
                                      <ErrorMessage
                                        name={`help[${index}].paragraph`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {helpEdit ? (
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
                        {typeof errors.help === "string" ? (
                          <p className="errorMsg">{errors.help}</p>
                        ) : null}
                      </div>
                    </Form>
                  );
                }}
              </Formik>

              <Formik
                enableReinitialize
                initialValues={whoState}
                validationSchema={whoSchema}
                onSubmit={handleWhoSubmit}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <h3
                        className={`resourceAddTitle ${
                          whoEdit ? "editTitle" : ""
                        }`}
                      >
                        Who Is It For?
                        {whoEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setWhoEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="who_title"
                          component={TextInput}
                          value={values.who_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!whoEdit}
                          className={whoEdit ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!whoEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="who_paragraph"
                            component={TextInput}
                            value={values.who_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            readOnly={!whoEdit}
                            disabled={!whoEdit}
                            className={whoEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="who_button_title"
                          component={TextInput}
                          value={values.who_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!whoEdit}
                          className={whoEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="who_button_link"
                          component={TextInput}
                          value={values.who_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!whoEdit}
                          className={whoEdit ? "editField" : ""}
                        />

                        <div className="divider"></div>
                        <label
                          className={
                            !whoEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="helps"
                        >
                          Helps
                        </label>
                        <FieldArray
                          name="who_items"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.who_items.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {whoEdit ? (
                                      <Fragment>
                                        {" "}
                                        {values.who_items.length > 1 && (
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
                                      whoEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  >
                                    <label htmlFor={`who_items${index + 1}`}>
                                      Title
                                    </label>

                                    <Field
                                      name={`who_items[${index}].title`}
                                      placeholder="Title"
                                      id={`who_items${index + 1}`}
                                      readOnly={!whoEdit}
                                      disabled={!whoEdit}
                                    />
                                    <ErrorMessage
                                      name={`who_items[${index}].title`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div
                                    className={
                                      whoEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  ></div>
                                  <div
                                    className={
                                      whoEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  >
                                    <label htmlFor={`who_items${index + 1}`}>
                                      Animated Text
                                    </label>
                                    <FieldArray
                                      name={`who_items[${index}].animated_text`}
                                      render={(arrayHelpers) => (
                                        <Fragment>
                                          {values.who_items[
                                            index
                                          ].animated_text.map((exp, ind) => (
                                            <div
                                              className="animatedTextWrap"
                                              key={ind}
                                            >
                                              {whoEdit ? (
                                                <Fragment>
                                                  {" "}
                                                  {values.who_items[index]
                                                    .animated_text.length >
                                                    1 && (
                                                    <button
                                                      type="button"
                                                      className="deleteIcon"
                                                      onClick={() => {
                                                        arrayHelpers.remove(
                                                          ind
                                                        );
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
                                              <Field
                                                name={`who_items[${index}].animated_text[${ind}]`}
                                                placeholder={`animated text ${
                                                  ind + 1
                                                }`}
                                                readOnly={!whoEdit}
                                                disabled={!whoEdit}
                                              />
                                            </div>
                                          ))}
                                          {whoEdit ? (
                                            <button
                                              type="button"
                                              className="addmoreBtn"
                                              onClick={() =>
                                                arrayHelpers.push("")
                                              }
                                            >
                                              Add More
                                            </button>
                                          ) : null}
                                        </Fragment>
                                      )}
                                    />
                                  </div>
                                  <label
                                    className={
                                      !whoEdit
                                        ? "imageLabel editImageLabel"
                                        : "imageLabel"
                                    }
                                    htmlFor="image"
                                  >
                                    Video
                                  </label>
                                  {values.who_items[index].video ? (
                                    <div className="videoView">
                                      {whoEdit ? (
                                        <button
                                          type="button"
                                          className="deleteIcon"
                                          onClick={() => {
                                            setFieldValue(
                                              `who_items[${index}].video`,
                                              ""
                                            );
                                          }}
                                        >
                                          <img
                                            src={deleteBlackIcon}
                                            alt="delete"
                                          />
                                        </button>
                                      ) : null}
                                      <video
                                        controls
                                        autoPlay
                                        src={values.who_items[index].video}
                                      ></video>
                                    </div>
                                  ) : (
                                    <button
                                      className="inputFileBtn inputFileBtnSmall"
                                      type="button"
                                    >
                                      <h5>Upload Video</h5>
                                      <span className="fileText">
                                        (mp4,x-m4v)
                                      </span>
                                      <span className="fileBtn">Add Item</span>

                                      <input
                                        id="file"
                                        name={`who_items[${index}].video`}
                                        type="file"
                                        accept="video/mp4,video/x-m4v,video/*"
                                        onChange={(e) =>
                                          handleUpload(
                                            e,
                                            setFieldValue,
                                            `who_items[${index}].video`
                                          )
                                        }
                                      />
                                    </button>
                                  )}

                                  <ErrorMessage
                                    name={`who_items[${index}].video`}
                                    className="errorMessage"
                                    component="div"
                                  />
                                </div>
                              ))}
                              {whoEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      title: "",
                                      color: "",
                                      video: "",
                                      animated_text: [""],
                                    })
                                  }
                                >
                                  Add Item
                                </button>
                              ) : null}
                            </Fragment>
                          )}
                        />
                        {typeof errors.help === "string" ? (
                          <p className="errorMsg">{errors.help}</p>
                        ) : null}
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          membershipEdit ? "editTitle" : ""
                        }`}
                      >
                        The Benefits of Membership
                        {membershipEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setMembershipEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="membership_title"
                          component={TextInput}
                          value={values.membership_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!membershipEdit}
                          className={membershipEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Title"
                          name="membership_button_title"
                          component={TextInput}
                          value={values.membership_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!membershipEdit}
                          className={membershipEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="membership_button_link"
                          component={TextInput}
                          value={values.membership_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!membershipEdit}
                          className={membershipEdit ? "editField" : ""}
                        />

                        <div className="divider"></div>
                        <label
                          className={
                            !membershipEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Items
                        </label>
                        <FieldArray
                          name="membership"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.membership.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {membershipEdit ? (
                                      <Fragment>
                                        {values.membership.length > 1 && (
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
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <label
                                    className={
                                      !membershipEdit
                                        ? "imageLabel editImageLabel"
                                        : "imageLabel"
                                    }
                                    htmlFor="image"
                                  >
                                    Icon
                                  </label>
                                  <div className="mb-30">
                                    {values.membership[index].icon ? (
                                      <div className="videoView">
                                        {membershipEdit ? (
                                          <button
                                            type="button"
                                            className="deleteIcon"
                                            onClick={() => {
                                              setFieldValue(
                                                `membership[${index}].icon`,
                                                ""
                                              );
                                            }}
                                          >
                                            <img
                                              src={deleteBlackIcon}
                                              alt="delete"
                                            />
                                          </button>
                                        ) : null}
                                        <img
                                          src={values.membership[index].icon}
                                          alt="imagesss"
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
                                        <span className="fileBtn">
                                          Add Item
                                        </span>

                                        <input
                                          id="file"
                                          name={`membership[${index}].icon`}
                                          type="file"
                                          onChange={(e) =>
                                            handleUpload(
                                              e,
                                              setFieldValue,
                                              `membership[${index}].icon`
                                            )
                                          }
                                        />
                                      </button>
                                    )}
                                    <ErrorMessage
                                      name={`membership[${index}].icon`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>

                                  <div
                                    className={
                                      membershipEdit
                                        ? "editField inputStyle"
                                        : "inputStyle"
                                    }
                                  >
                                    <label htmlFor={`membership${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`membership[${index}].title`}
                                      placeholder="question"
                                      id={`membership${index + 1}`}
                                      readOnly={!membershipEdit}
                                      disabled={!membershipEdit}
                                    />
                                    <ErrorMessage
                                      name={`membership[${index}].title`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label
                                      className={
                                        !membershipEdit ? " editLabel" : ""
                                      }
                                    >
                                      Paragraph{" "}
                                      <span>
                                        {
                                          values.membership[index].paragraph
                                            .length
                                        }
                                        /256
                                      </span>
                                    </label>
                                    <div
                                      className={
                                        membershipEdit
                                          ? "editField inputStyle mb-0"
                                          : "inputStyle mb-0"
                                      }
                                    >
                                      <Field
                                        name={`membership[${index}].paragraph`}
                                        component="textarea"
                                        readOnly={!membershipEdit}
                                        disabled={!membershipEdit}
                                      />
                                      <ErrorMessage
                                        name={`membership[${index}].paragraph`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {membershipEdit ? (
                                <Fragment>
                                  {values.membership.length < 6 ? (
                                    <button
                                      type="button"
                                      className="addNewItem"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          title: "",
                                          paragraph: "",
                                          icon: "",
                                        })
                                      }
                                    >
                                      Add Item
                                    </button>
                                  ) : null}
                                </Fragment>
                              ) : null}
                            </Fragment>
                          )}
                        />
                        {typeof errors.membership === "string" ? (
                          <p className="errorMsg">{errors.membership}</p>
                        ) : null}
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          featureEdit ? "editTitle" : ""
                        }`}
                      >
                        Upcoming Features
                        {featureEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setFeatureEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="feature_title"
                          component={TextInput}
                          value={values.feature_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!featureEdit}
                          className={featureEdit ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!featureEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="feature_paragraph"
                            component={TextInput}
                            value={values.feature_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            multiline
                            readOnly={!featureEdit}
                            className={featureEdit ? "editField" : ""}
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="feature_button_title"
                          component={TextInput}
                          value={values.feature_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!featureEdit}
                          className={featureEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="feature_button_link"
                          component={TextInput}
                          value={values.feature_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!featureEdit}
                          className={featureEdit ? "editField mb-0" : " mb-0"}
                        />
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          testimonialEdit ? "editTitle" : ""
                        }`}
                      >
                        Testimonials
                        {testimonialEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setTestimonialEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="testimonial_title"
                          component={TextInput}
                          value={values.testimonial_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!testimonialEdit}
                          className={testimonialEdit ? "editField" : ""}
                        />
                        <div className="multilineForm">
                          <label
                            className={!testimonialEdit ? " editLabel" : ""}
                          >
                            Paragraph
                          </label>
                          <Field
                            name="testimonial_paragraph"
                            component={TextInput}
                            value={values.testimonial_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={!testimonialEdit}
                            className={testimonialEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                        <Field
                          label="Button Title"
                          name="testimonial_button_title"
                          component={TextInput}
                          value={values.testimonial_button_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Title"
                          readOnly={!testimonialEdit}
                          className={testimonialEdit ? "editField" : ""}
                        />
                        <Field
                          label="Button Link"
                          name="testimonial_button_link"
                          component={TextInput}
                          value={values.testimonial_button_link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Button Link"
                          readOnly={!testimonialEdit}
                          className={testimonialEdit ? "editField" : ""}
                        />

                        <div className="divider"></div>
                        <label
                          className={
                            !testimonialEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Items
                        </label>
                        <FieldArray
                          name="testimonial"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.testimonial.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {testimonialEdit ? (
                                      <Fragment>
                                        {values.testimonial.length > 1 && (
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
                                  <label
                                    className={
                                      !testimonialEdit
                                        ? "imageLabel editImageLabel"
                                        : "imageLabel"
                                    }
                                    htmlFor="image"
                                  >
                                    Icon
                                  </label>
                                  <div className="mb-30">
                                    {values.testimonial[index].icon ? (
                                      <div className="videoView">
                                        {testimonialEdit ? (
                                          <button
                                            type="button"
                                            className="deleteIcon"
                                            onClick={() => {
                                              setFieldValue(
                                                `testimonial[${index}].icon`,
                                                ""
                                              );
                                            }}
                                          >
                                            <img
                                              src={deleteBlackIcon}
                                              alt="delete"
                                            />
                                          </button>
                                        ) : null}
                                        <img
                                          src={values.testimonial[index].icon}
                                          alt="imagessss"
                                          className="testimonialImg"
                                          style={{
                                            border: `7px solid ${values.testimonial[index].color}`,
                                          }}
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
                                        <span className="fileBtn">
                                          Add Item
                                        </span>

                                        <input
                                          id="file"
                                          name={`testimonial[${index}].icon`}
                                          type="file"
                                          onChange={(e) =>
                                            handleUpload(
                                              e,
                                              setFieldValue,
                                              `testimonial[${index}].icon`
                                            )
                                          }
                                        />
                                      </button>
                                    )}
                                    <ErrorMessage
                                      name={`testimonial[${index}].icon`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div
                                    className={
                                      testimonialEdit
                                        ? "editField inputStyle"
                                        : " inputStyle"
                                    }
                                  >
                                    <label htmlFor={`testimonial${index + 1}`}>
                                      Border Color
                                    </label>
                                    <Field
                                      name={`testimonial[${index}].color`}
                                      placeholder="question"
                                      id={`testimonial${index + 1}`}
                                      component="select"
                                      readOnly={!testimonialEdit}
                                      disabled={!testimonialEdit}
                                    >
                                      <option value="">Select Color</option>
                                      <option value="#E26262">E26262</option>
                                      <option value="#FA8C4E">FA8C4E</option>
                                      <option value="#777DEF">777DEF</option>
                                      <option value="#F7B5D5">F7B5D5</option>
                                      <option value="#FFCA41">FFCA41</option>
                                    </Field>
                                    <ErrorMessage
                                      name={`testimonial[${index}].color`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div
                                    className={
                                      testimonialEdit
                                        ? "editField inputStyle"
                                        : " inputStyle"
                                    }
                                  >
                                    <label htmlFor={`testimonial${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`testimonial[${index}].title`}
                                      placeholder="question"
                                      id={`testimonial${index + 1}`}
                                      readOnly={!testimonialEdit}
                                      disabled={!testimonialEdit}
                                    />
                                    <ErrorMessage
                                      name={`testimonial[${index}].title`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label
                                      className={
                                        !testimonialEdit
                                          ? "imageLabel editImageLabel"
                                          : "imageLabel"
                                      }
                                    >
                                      Paragraph{" "}
                                      <span>
                                        {
                                          values.testimonial[index].paragraph
                                            .length
                                        }
                                        /256
                                      </span>
                                    </label>
                                    <div className="editField inputStyle mb-0">
                                      <Field
                                        name={`testimonial[${index}].paragraph`}
                                        component="textarea"
                                        readOnly={!testimonialEdit}
                                        disabled={!testimonialEdit}
                                      />
                                      <ErrorMessage
                                        name={`testimonial[${index}].paragraph`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {testimonialEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      title: "",
                                      paragraph: "",
                                      icon: "",
                                      color: "",
                                    })
                                  }
                                >
                                  Add Item
                                </button>
                              ) : (
                                ""
                              )}
                            </Fragment>
                          )}
                        />
                        {typeof errors.testimonial === "string" ? (
                          <p className="errorMsg">{errors.testimonial}</p>
                        ) : null}
                      </div>
                      <h3
                        className={`resourceAddTitle ${
                          communityEdit ? "editTitle" : ""
                        }`}
                      >
                        Join The Community
                        {communityEdit ? (
                          <button className="savebtn" type="submit">
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setCommunityEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="community_title"
                          component={TextInput}
                          value={values.community_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          readOnly={!communityEdit}
                          className={communityEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub-title"
                          name="community_sub_title"
                          component={TextInput}
                          value={values.community_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub-title"
                          readOnly={!communityEdit}
                          className={communityEdit ? "editField" : ""}
                        />
                        <label
                          className={
                            !communityEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Image
                        </label>
                        <div className="uploadImage mb-30">
                          {values.community_image ? (
                            <div className="fileImage">
                              <img
                                defaultImg={false}
                                src={values.community_image}
                                alt="imagesss"
                              />
                              {communityEdit ? (
                                <button
                                  onClick={() =>
                                    setFieldValue("community_image", "")
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
                              <span className="fileText">(jpg,png,gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="community_image"
                                name="community_image"
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                onChange={(e) =>
                                  handleUpload(
                                    e,
                                    setFieldValue,
                                    `community_image`
                                  )
                                }
                              />
                            </button>
                          )}
                        </div>
                        <label
                          className={
                            !communityEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Video
                        </label>
                        <div className="uploadImage mb-30">
                          {values.community_video ? (
                            <div className="fileImage">
                              <div className="videoView">
                                <video
                                  controls
                                  autoPlay
                                  src={values.community_video}
                                />
                              </div>
                              {communityEdit ? (
                                <button
                                  onClick={() =>
                                    setFieldValue("community_video", "")
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
                              <h5>Upload Video</h5>
                              <span className="fileText">(mp4)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="community_video"
                                name="community_video"
                                type="file"
                                accept="video/mp4,video/x-m4v,video/*"
                                onChange={(e) =>
                                  handleUpload(
                                    e,
                                    setFieldValue,
                                    `community_video`
                                  )
                                }
                              />
                            </button>
                          )}
                        </div>
                        <div
                          className={`inputStyle mb-0 ${
                            communityEdit ? "editField" : ""
                          }`}
                        >
                          <label>Show Video or Image?</label>
                          <label className="switch switchVideo">
                            <Field
                              readOnly={!communityEdit}
                              disabled={!communityEdit}
                              name="is_video"
                              type="checkbox"
                            />
                            <span className="slider">
                              <span className={`yes ${values.is_video && 'active'}`}>Yes</span>
                              <span className={`no ${!values.is_video && 'active'}`}>No</span>
                            </span>
                          </label>
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
  home_data: state.home.home_data,
});

export default connect(mapStateToProps, {
  addGeneralHomeDataAction,
  addHeroHomeDataAction,
  getHomeDataAction,
  addWhatHomeDataAction,
  uploadFileAction,
  addHomeThreeDataAction,
})(withRouter(EditHome));
