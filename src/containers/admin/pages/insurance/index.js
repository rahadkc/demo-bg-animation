import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import * as Yup from "yup";
import crose from "../../../../assets/images/icons/crose.svg";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../../assets/images/icons/list/delete-white.svg";
import TextInput from "../../../../components/formfields/InputField";
import AddTaskForm from "../../../accountComplete/components/todo";
import { getInsuranceDetailsAction } from "../../../App/actions";

import { uploadFileAction } from "../editHome/actions";
import { addInsuranceCMSDataAction } from "./actions";
import "./style.scss";
import deleteBlackIcon from "../../../../assets/images/icons/list/delete.svg";
import {getShortContent} from "../../../../utils/commonFunctions";
import editIcon from "../../../../assets/images/icons/list/edit.svg";
import {deleteFAQ, getFAQs} from "../../dashboard/actions";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  hero_image: Yup.array()
    .of(
      Yup.object().shape({
        image: Yup.string().required("images can not be empty"),
      })
    )
    .required("what image can not be empty")
    .min(3, "please add minimum 3 images")
    .max(3, "please add maximum 3 images"),

  hero_title_small: Yup.string().nullable("Hero Small Title can not be empty"),
  hero_title: Yup.string().required("Hero Title can not be empty"),
  hero_sub_title: Yup.string().nullable(),
  hero_button_title: Yup.string().required(
    "Hero Button Title can not be empty"
  ),
  hero_button_link: Yup.string().required("Hero Button Link can not be empty"),
  hero_image1: Yup.string().required("Hero Image can not be empty"),
  section2_title: Yup.string().required("Section 2 title can not be empty"),
  section2_client_title: Yup.string().required(
    "Section 2 title can not be empty"
  ),
  section2_client_description: Yup.string().required(
    "Section 2 client description can not be empty"
  ),
  section2_client_image: Yup.string().required(
    "Section 2 client image can not be empty"
  ),
  why_join_title: Yup.string().required("Why join title can not be empty"),
  why_join_sub_title: Yup.string().required(
    "Why join sub title can not be empty"
  ),
  why_join_image: Yup.string().required("Why join image can not be empty"),
  why_join_details: Yup.string().required("Why join details can not be empty"),
  plan_title: Yup.string().required("Signup title can not be empty"),
  plan_sub_title: Yup.string().required("Signup sub title can not be empty"),
  plan_details: Yup.string().required("Signup details can not be empty"),
  section2_button_title: Yup.string().required(
    "Section 2 button title can not be empty"
  ),
  section2_button_link: Yup.string().required(
    "Section 2 button link can not be empty"
  ),
  plan_button_title: Yup.string().required(
    "Plan button title can not be empty"
  ),
  plan_button_link: Yup.string().required("Plan button link can not be empty"),
  satisfaction_icons: Yup.string().nullable(),
  satisfaction_title: Yup.string().nullable(),
  satisfaction_description: Yup.string().nullable(),
  satisfaction_button_title: Yup.string().nullable(),
  satisfaction_button_link: Yup.string().nullable(),
});



const EditInsuranceCMS = (props) => {
  console.log(props);
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [clientEdit, setClientEdit] = useState(false);
  const [whyEdit, setWhyEdit] = useState(false);
  const [singUpEdit, setSignupEdit] = useState(false);
  const [satisfactionEdit, setSatisfactionEdit] = useState(false);

  const [keywords, setKeywords] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };

  const initialState = {
    name: props.insurance?.name ? props.insurance?.name : "",
    url: props.insurance?.url ? props.insurance?.url : "/insurance",
    excerpt: props.insurance?.excerpt ? props.insurance?.excerpt : "",
    thumbnail: props.insurance?.thumbnail ? props.insurance?.thumbnail : "",
    hero_title_small: props.insurance?.hero_title_small
      ? props.insurance?.hero_title_small
      : "",
    hero_title: props.insurance?.hero_title ? props.insurance?.hero_title : "",
    hero_sub_title: props.insurance?.hero_sub_title
      ? props.insurance?.hero_sub_title
      : "",
    hero_button_title: props.insurance?.hero_button_title
      ? props.insurance?.hero_button_title
      : "",
    hero_button_link: props.insurance?.hero_button_link
      ? props.insurance?.hero_button_link
      : "",
    hero_image1: props.insurance?.hero_image1
      ? props.insurance?.hero_image1
      : "",

    section2_title: props.insurance?.section2_title
      ? props.insurance?.section2_title
      : "",
    section2_client_title: props.insurance?.section2_client_title
      ? props.insurance?.section2_client_title
      : "",
    section2_client_description: props.insurance?.section2_client_description
      ? props.insurance?.section2_client_description
      : "",
    section2_client_image: props.insurance?.section2_client_image
      ? props.insurance?.section2_client_image
      : "",
    why_join_title: props.insurance?.why_join_title
      ? props.insurance?.why_join_title
      : "",
    why_join_sub_title: props.insurance?.why_join_sub_title
      ? props.insurance?.why_join_sub_title
      : "",
    why_join_image: props.insurance?.why_join_image
      ? props.insurance?.why_join_image
      : "",
    why_join_details: props.insurance?.why_join_details
      ? props.insurance?.why_join_details
      : "",
    plan_title: props.insurance?.plan_title ? props.insurance?.plan_title : "",
    plan_sub_title: props.insurance?.plan_sub_title
      ? props.insurance?.plan_sub_title
      : "",
    plan_details: props.insurance?.plan_details
      ? props.insurance?.plan_details
      : "",
    section2_button_title: props.insurance?.section2_button_title
      ? props.insurance?.section2_button_title
      : "",
    section2_button_link: props.insurance?.section2_button_link
      ? props.insurance?.section2_button_link
      : "",
    plan_button_title: props.insurance?.plan_button_title
      ? props.insurance?.plan_button_title
      : "",
    plan_button_link: props.insurance?.plan_button_link
      ? props.insurance?.plan_button_link
      : "",
    satisfaction_icons: props.insurance?.satisfaction_icons
      ? props.insurance?.satisfaction_icons
      : "",
    satisfaction_title: props.insurance?.satisfaction_title
      ? props.insurance?.satisfaction_title
      : "",
    satisfaction_description: props.insurance?.satisfaction_description
      ? props.insurance?.satisfaction_description
      : "",
    satisfaction_button_title: props.insurance?.satisfaction_button_title
      ? props.insurance?.satisfaction_button_title
      : "",
    satisfaction_button_link: props.insurance?.satisfaction_button_link
      ? props.insurance?.satisfaction_button_link
      : "",
    satisfaction_slider: props.insurance?.satisfaction_slider
      ? props.insurance?.satisfaction_slider
      : [
          {
            image: "",
          },
        ],
  };
  useEffect(() => {
    props.getFAQs();
  }, []);
  const deleteResponseHandler = (id) => {
    props.deleteFAQ(id);
  };

  const handleSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("thumbnail", values.thumbnail);
    form_data.append("hero_title_small", values.hero_title_small);
    form_data.append("hero_title", values.hero_title);
    form_data.append("hero_sub_title", values.hero_sub_title);
    form_data.append("hero_button_title", values.hero_button_title);
    form_data.append("hero_button_link", values.hero_button_link);
    form_data.append("hero_image1", values.hero_image1);
    form_data.append("section2_title", values.section2_title);
    form_data.append("section2_client_title", values.section2_client_title);
    form_data.append(
      "section2_client_description",
      values.section2_client_description
    );
    form_data.append("section2_client_image", values.section2_client_image);
    form_data.append("why_join_title", values.why_join_title);
    form_data.append("why_join_sub_title", values.why_join_sub_title);
    form_data.append("why_join_image", values.why_join_image);
    form_data.append("why_join_details", values.why_join_details);
    form_data.append("plan_title", values.plan_title);
    form_data.append("plan_sub_title", values.plan_sub_title);
    form_data.append("plan_details", values.plan_details);
    form_data.append("section2_button_title", values.section2_button_title);
    form_data.append("section2_button_link", values.section2_button_link);
    form_data.append("plan_button_title", values.plan_button_title);
    form_data.append("plan_button_link", values.plan_button_link);
    form_data.append("satisfaction_icons", values.satisfaction_icons);
    form_data.append("satisfaction_title", values.satisfaction_title);
    form_data.append(
      "satisfaction_description",
      values.satisfaction_description
    );
    form_data.append(
      "satisfaction_button_title",
      values.satisfaction_button_title
    );
    form_data.append(
      "satisfaction_button_link",
      values.satisfaction_button_link
    );
    form_data.append(
      "satisfaction_slider",
      JSON.stringify(values.satisfaction_slider)
    );
    props.addInsuranceCMSDataAction(form_data, setGeneralEdit);
    setHeroEdit(false);
  };

  useEffect(() => {
    props.getInsuranceDetailsAction();
  }, []);
  useEffect(() => {
    setKeywords(props.insurance?.keywords ? props.insurance?.keywords : []);
  }, [props.insurance?.keywords]);
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
                <h2 className="adminSectionTitle">Insurance Page</h2>
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
                  touched,
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
                              setHeroEdit(false);
                              handleSubmit(values);
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
                              <img src={values.thumbnail} alt="" />
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
                              setHeroEdit(false);
                              handleSubmit(values);
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

                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Hero Small Title"
                          name="hero_title_small"
                          component={TextInput}
                          value={values.hero_title_small}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Hero Small Title"
                          readOnly={!heroEdit}
                          disabled={!heroEdit}
                          className={heroEdit ? "editField" : ""}
                        />

                        <div
                          className={
                            heroEdit ? "editField inputStyle" : "inputStyle"
                          }
                        >
                          <label htmlFor="url">Hero Title</label>
                          <Field
                            name="hero_title"
                            type="text"
                            id="hero_title"
                            value={values.hero_title}
                            placeholder="Hero Title"
                            readOnly={!heroEdit}
                            disabled={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                          />
                          {touched.hero_title && errors.hero_title && (
                            <p className="errorMsg mb-0">{errors.hero_title}</p>
                          )}

                          <label htmlFor="hero_sub_title" className="mt-4">
                            Hero Subtitle
                          </label>
                          <Field
                            name="hero_sub_title"
                            type="text"
                            id="hero_sub_title"
                            value={values.hero_sub_title}
                            placeholder="Hero Subtitle"
                            readOnly={!heroEdit}
                            disabled={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                          />

                          <label htmlFor="url" className="mt-4">
                            Hero Button Title
                          </label>
                          <Field
                            name="hero_button_title"
                            type="text"
                            id="hero_button_title"
                            value={values.hero_button_title}
                            placeholder="Hero Button Title"
                            readOnly={!heroEdit}
                            disabled={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                          />
                          {touched.hero_button_title &&
                            errors.hero_button_title && (
                              <p className="errorMsg mb-0">
                                {errors.hero_button_title}
                              </p>
                            )}

                          <label htmlFor="url" className="mt-4">
                            Hero Button Link
                          </label>
                          <Field
                            name="hero_button_link"
                            type="text"
                            id="hero_button_title"
                            value={values.hero_button_link}
                            placeholder="Hero Button Title"
                            readOnly={!heroEdit}
                            disabled={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                          />
                          {touched.hero_button_link &&
                            errors.hero_button_link && (
                              <p className="errorMsg mb-0">
                                {errors.hero_button_link}
                              </p>
                            )}

                          <label
                            className={`${
                              !heroEdit
                                ? "imageLabel editImageLabel"
                                : "imageLabel"
                            } mt-4 mb-3`}
                            htmlFor="image"
                          >
                            Hero Image
                          </label>
                          <div className="uploadImage">
                            {values.hero_image1 ? (
                              <div className="fileImage">
                                <img
                                  src={values.hero_image1}
                                  alt="hero_image1"
                                />
                                {heroEdit ? (
                                  <button
                                    onClick={() =>
                                      setFieldValue("hero_image1", "")
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
                                <span className="fileText">
                                  (jpg, png, gif)
                                </span>
                                <span className="fileBtn">Add Item</span>
                                <input
                                  id="hero_image1"
                                  name="hero_image1"
                                  type="file"
                                  className="imageinput"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "hero_image1",
                                      e.currentTarget.files[0]
                                    );
                                    handleUpload(
                                      e,
                                      setFieldValue,
                                      `hero_image1`
                                    );
                                  }}
                                />
                              </button>
                            )}
                          </div>
                          {touched.hero_image1 && errors.hero_image1 && (
                            <p className="errorMsg mb-0">
                              {errors.hero_image1}
                            </p>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          clientEdit ? "editTitle" : ""
                        }`}
                      >
                        Client Section
                        {clientEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              setClientEdit(false);
                              handleSubmit(values);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setClientEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <div
                          className={
                            clientEdit ? "editField inputStyle" : "inputStyle"
                          }
                        >
                          <label htmlFor="url" className="mt-4">
                            Client Section Title
                          </label>
                          <Field
                            name="section2_title"
                            type="text"
                            id="section2_title"
                            value={values.section2_title}
                            placeholder="Title"
                            readOnly={!clientEdit}
                            disabled={!clientEdit}
                            className={clientEdit ? "editField" : ""}
                          />
                          {touched.section2_title && errors.section2_title && (
                            <p className="errorMsg mb-0">
                              {errors.section2_title}
                            </p>
                          )}

                          <div className="multilineForm mt-4">
                            <label className={!clientEdit ? " editLabel" : ""}>
                              Client Section Description
                            </label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={values.section2_client_description}
                              className="ekEditorWrap"
                              readOnly={!clientEdit}
                              disabled={!clientEdit}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue(
                                  "section2_client_description",
                                  data
                                );
                              }}
                            />
                          </div>
                          {errors.contents && touched.contents && (
                            <p className="errorMsg">{errors.contents}</p>
                          )}

                          <label
                            htmlFor="section2_button_title"
                            className="mt-4"
                          >
                            Client Section Button Title
                          </label>
                          <Field
                            name="section2_button_title"
                            type="text"
                            id="section2_button_title"
                            value={values.section2_button_title}
                            placeholder="section2_button_title"
                            readOnly={!clientEdit}
                            disabled={!clientEdit}
                            className={clientEdit ? "editField" : ""}
                          />
                          {touched.section2_button_title &&
                            errors.section2_button_title && (
                              <p className="errorMsg mb-0">
                                {errors.section2_button_title}
                              </p>
                            )}

                          <label
                            htmlFor="section2_button_link"
                            className="mt-4"
                          >
                            Client Section Button Link
                          </label>
                          <Field
                            name="section2_button_link"
                            type="text"
                            id="section2_button_link"
                            value={values.section2_button_link}
                            placeholder="section2_button_link"
                            readOnly={!clientEdit}
                            disabled={!clientEdit}
                            className={clientEdit ? "editField" : ""}
                          />
                          {touched.section2_button_link &&
                            errors.section2_button_link && (
                              <p className="errorMsg mb-0">
                                {errors.section2_button_link}
                              </p>
                            )}

                          <label
                            className={`${
                              !clientEdit
                                ? "imageLabel editImageLabel"
                                : "imageLabel"
                            } mt-4 mb-2`}
                            htmlFor="image"
                          >
                            Client Section Image
                          </label>
                          <div className="uploadImage1">
                            {values.section2_client_image ? (
                              <div className="fileImage">
                                <img
                                  src={values.section2_client_image}
                                  alt="section2_client_image"
                                />
                                {clientEdit ? (
                                  <button
                                    onClick={() =>
                                      setFieldValue("section2_client_image", "")
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
                                <span className="fileText">
                                  (jpg, png, gif)
                                </span>
                                <span className="fileBtn">Add Item</span>
                                <input
                                  id="section2_client_image"
                                  name="section2_client_image"
                                  type="file"
                                  className="imageinput"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "section2_client_image",
                                      e.currentTarget.files[0]
                                    );
                                    handleUpload(
                                      e,
                                      setFieldValue,
                                      `section2_client_image`
                                    );
                                  }}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          whyEdit ? "editTitle" : ""
                        }`}
                      >
                        Why Join Section
                        {whyEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              setWhyEdit(false);
                              handleSubmit(values);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setWhyEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <div
                          className={
                            whyEdit ? "editField inputStyle" : "inputStyle"
                          }
                        >
                          <label htmlFor="why_join_title" className="mt-4">
                            Why Join Title
                          </label>
                          <Field
                            name="why_join_title"
                            type="text"
                            id="why_join_title"
                            value={values.why_join_title}
                            placeholder="why_join_title"
                            readOnly={!whyEdit}
                            disabled={!whyEdit}
                            className={whyEdit ? "editField" : ""}
                          />
                          {touched.why_join_title && errors.why_join_title && (
                            <p className="errorMsg mb-0">
                              {errors.why_join_title}
                            </p>
                          )}

                          <label htmlFor="why_join_sub_title" className="mt-4">
                            Why Join Sub Title
                          </label>
                          <Field
                            name="why_join_sub_title"
                            type="text"
                            id="why_join_sub_title"
                            value={values.why_join_sub_title}
                            placeholder="why_join_sub_title"
                            readOnly={!whyEdit}
                            disabled={!whyEdit}
                            className={whyEdit ? "editField" : ""}
                          />
                          {touched.why_join_sub_title &&
                            errors.why_join_sub_title && (
                              <p className="errorMsg mb-0">
                                {errors.why_join_sub_title}
                              </p>
                            )}

                          <div className="multilineForm mt-4">
                            <label className={!whyEdit ? " editLabel" : ""}>
                              Why Join Details
                            </label>
                            <Field
                              name="why_join_details"
                              component={TextInput}
                              value={values.why_join_details}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Why Join Details"
                              readOnly={!whyEdit}
                              className={`${whyEdit ? "editField" : ""} mb-4 `}
                              multiline
                              disabled={!whyEdit}
                            />
                          </div>

                          <label
                            className={`${
                              !whyEdit
                                ? "imageLabel editImageLabel"
                                : "imageLabel"
                            } mt-4 mb-2`}
                            htmlFor="image"
                          >
                            Why Join Section Image
                          </label>

                          <div className="uploadImage1 mb-3">
                            {values.why_join_image ? (
                              <div className="fileImage">
                                <img
                                  src={values.why_join_image}
                                  alt="why_join_image"
                                />
                                {whyEdit ? (
                                  <button
                                    onClick={() =>
                                      setFieldValue("why_join_image", "")
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
                                <span className="fileText">
                                  (jpg, png, gif)
                                </span>
                                <span className="fileBtn">Add Item</span>
                                <input
                                  id="why_join_image"
                                  name="why_join_image"
                                  type="file"
                                  className="imageinput"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "why_join_image",
                                      e.currentTarget.files[0]
                                    );
                                    handleUpload(
                                      e,
                                      setFieldValue,
                                      `why_join_image`
                                    );
                                  }}
                                />
                              </button>
                            )}
                          </div>
                          {touched.why_join_image && errors.why_join_image && (
                            <p className="errorMsg mb-0">
                              {errors.why_join_image}
                            </p>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          singUpEdit ? "editTitle" : ""
                        }`}
                      >
                        Sign Up Section
                        {singUpEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              setSignupEdit(false);
                              handleSubmit(values);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setSignupEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <div
                          className={
                            singUpEdit ? "editField inputStyle" : "inputStyle"
                          }
                        >
                          <label htmlFor="plan_title" className="mt-4">
                            Signup Title
                          </label>
                          <Field
                            name="plan_title"
                            type="text"
                            id="plan_title"
                            value={values.plan_title}
                            placeholder="Signup title"
                            readOnly={!singUpEdit}
                            disabled={!singUpEdit}
                            className={singUpEdit ? "editField" : ""}
                          />
                          {touched.plan_title && errors.plan_title && (
                            <p className="errorMsg mb-0">{errors.plan_title}</p>
                          )}

                          <label htmlFor="plan_sub_title" className="mt-4">
                            Signup Sub Title
                          </label>
                          <Field
                            name="plan_sub_title"
                            type="text"
                            id="plan_sub_title"
                            value={values.plan_sub_title}
                            placeholder="Signup sub title"
                            readOnly={!singUpEdit}
                            disabled={!singUpEdit}
                            className={singUpEdit ? "editField" : ""}
                          />
                          {touched.plan_sub_title && errors.plan_sub_title && (
                            <p className="errorMsg mb-0">
                              {errors.plan_sub_title}
                            </p>
                          )}

                          <div className="multilineForm mt-4">
                            <label className={!singUpEdit ? " editLabel" : ""}>
                              Signup Details
                            </label>
                            <Field
                              name="plan_details"
                              component={TextInput}
                              value={values.plan_details}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Signup Details"
                              readOnly={!singUpEdit}
                              className={`${
                                singUpEdit ? "editField" : ""
                              } mb-4 `}
                              multiline
                              disabled={!singUpEdit}
                            />
                          </div>

                          <label htmlFor="plan_button_title" className="mt-4">
                            Signup Button Title
                          </label>
                          <Field
                            name="plan_button_title"
                            type="text"
                            id="plan_button_title"
                            value={values.plan_button_title}
                            placeholder="plan_button_title"
                            readOnly={!singUpEdit}
                            disabled={!singUpEdit}
                            className={singUpEdit ? "editField" : ""}
                          />

                          {touched.plan_button_title &&
                            errors.plan_button_title && (
                              <p className="errorMsg mb-0">
                                {errors.plan_button_title}
                              </p>
                            )}

                          <label htmlFor="plan_button_link" className="mt-4">
                            Signup Button Link
                          </label>
                          <Field
                            name="plan_button_link"
                            type="text"
                            id="plan_button_link"
                            value={values.plan_button_link}
                            placeholder="plan_button_link"
                            readOnly={!singUpEdit}
                            disabled={!singUpEdit}
                            className={singUpEdit ? "editField" : ""}
                          />
                          {touched.plan_button_link &&
                            errors.plan_button_link && (
                              <p className="errorMsg mb-0">
                                {errors.plan_button_link}
                              </p>
                            )}
                        </div>
                      </div>



                      <h3
                        className={`resourceAddTitle ${
                          satisfactionEdit ? "editTitle" : ""
                        }`}
                      >
                        Satisfaction Section
                        {satisfactionEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              setSatisfactionEdit(false);
                              handleSubmit(values);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setSatisfactionEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <div
                          className={
                            satisfactionEdit
                              ? "editField inputStyle"
                              : "inputStyle"
                          }
                        >
                          {/*<label htmlFor="satisfaction_icons" className="mt-4">*/}
                          {/*  Satisfaction Section Icons*/}
                          {/*</label>*/}
                          {/*<Field*/}
                          {/*    name="satisfaction_icons"*/}
                          {/*    type="text"*/}
                          {/*    id="satisfaction_icons"*/}
                          {/*    value={values.satisfaction_icons}*/}
                          {/*    placeholder="satisfaction_icons"*/}
                          {/*    readOnly={!satisfactionEdit}*/}
                          {/*    disabled={!satisfactionEdit}*/}
                          {/*    className={satisfactionEdit ? "editField" : ""}*/}
                          {/*/>*/}

                          <label
                            className={
                              !satisfactionEdit
                                ? "imageLabel editImageLabel"
                                : "imageLabel"
                            }
                            htmlFor="image"
                          >
                            Images
                          </label>

                          <div className="uploadImage">
                            {values.satisfaction_icons ? (
                              <div className="fileImage">
                                <img
                                  src={values.satisfaction_icons}
                                  alt=""
                                />
                                {satisfactionEdit ? (
                                  <button
                                    onClick={() =>
                                      setFieldValue("satisfaction_icons", "")
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
                                <span className="fileText">
                                  (jpg, png, gif)
                                </span>
                                <span className="fileBtn">Add Item</span>
                                <input
                                  id="satisfaction_icons"
                                  name="satisfaction_icons"
                                  type="file"
                                  className="imageinput"
                                  onChange={(e) => {
                                    handleUpload(
                                      e,
                                      setFieldValue,
                                      `satisfaction_icons`
                                    );
                                  }}
                                />
                              </button>
                            )}
                          </div>

                          <label htmlFor="satisfaction_title" className="mt-4">
                            Satisfaction Section Title
                          </label>
                          <Field
                            name="satisfaction_title"
                            type="text"
                            id="satisfaction_title"
                            value={values.satisfaction_title}
                            placeholder="satisfaction_title"
                            readOnly={!satisfactionEdit}
                            disabled={!satisfactionEdit}
                            className={satisfactionEdit ? "editField" : ""}
                          />
                          {touched.satisfaction_title &&
                            errors.satisfaction_title && (
                              <p className="errorMsg mb-0">
                                {errors.satisfaction_title}
                              </p>
                            )}
                          <div className="multilineForm mt-4">
                            <label
                              className={!satisfactionEdit ? " editLabel" : ""}
                            >
                              Satisfaction Section Description
                            </label>
                            <Field
                              name="satisfaction_description"
                              component={TextInput}
                              value={values.satisfaction_description}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Satisfaction Section Description"
                              readOnly={!satisfactionEdit}
                              className={`${
                                satisfactionEdit ? "editField" : ""
                              } mb-4 `}
                              multiline
                              disabled={!satisfactionEdit}
                            />
                          </div>
                          {touched.satisfaction_description &&
                            errors.satisfaction_description && (
                              <p className="errorMsg mb-0">
                                {errors.satisfaction_description}
                              </p>
                            )}

                          <label
                            htmlFor="satisfaction_button_title"
                            className="mt-4"
                          >
                            Satisfaction Button Title
                          </label>
                          <Field
                            name="satisfaction_button_title"
                            type="text"
                            id="satisfaction_button_title"
                            value={values.satisfaction_button_title}
                            placeholder="satisfaction_button_title"
                            readOnly={!satisfactionEdit}
                            disabled={!satisfactionEdit}
                            className={satisfactionEdit ? "editField" : ""}
                          />
                          {touched.satisfaction_button_title &&
                            errors.satisfaction_button_title && (
                              <p className="errorMsg mb-0">
                                {errors.satisfaction_button_title}
                              </p>
                            )}

                          <label
                            htmlFor="satisfaction_button_link"
                            className="mt-4"
                          >
                            Satisfaction Button Link
                          </label>
                          <Field
                            name="satisfaction_button_link"
                            type="text"
                            id="satisfaction_button_link"
                            value={values.satisfaction_button_link}
                            placeholder="satisfaction_button_link"
                            readOnly={!satisfactionEdit}
                            disabled={!satisfactionEdit}
                            className={satisfactionEdit ? "editField" : ""}
                          />
                          {touched.plan_button_link &&
                            errors.plan_button_link && (
                              <p className="errorMsg mb-0">
                                {errors.plan_button_link}
                              </p>
                            )}

                          <label
                            className={`${
                              !satisfactionEdit
                                ? "imageLabel editImageLabel"
                                : "imageLabel"
                            } mt-4 mb-2`}
                            htmlFor="image"
                          >
                            Images
                          </label>

                          <FieldArray
                            name="satisfaction_slider"
                            render={(arrayHelpers) => (
                              <Fragment>
                                {values.satisfaction_slider.map(
                                  (exp, index) => (
                                    <div
                                      className="faqQuestionsWrap faqQuestionsWrapNew"
                                      key={index}
                                    >
                                      {values.satisfaction_slider[index]
                                        .image ? (
                                        <div className="videoCountStyle">
                                          <div className="videoCountWrap">
                                            <span className="labelCount">
                                              0{index + 1}
                                            </span>
                                            {satisfactionEdit ? (
                                              <>
                                                {values.satisfaction_slider
                                                  .length > 1 && (
                                                  <button
                                                    type="button"
                                                    className="deleteIcon"
                                                    onClick={() => {
                                                      arrayHelpers.remove(
                                                        index
                                                      );
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
                                            src={
                                              values.satisfaction_slider[index]
                                                .image
                                            }
                                            alt="satisfaction_slider"
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
                                            name={`satisfaction_slider[${index}].image`}
                                            type="file"
                                            className="imageinput"
                                            onChange={(e) =>
                                              handleUpload(
                                                e,
                                                setFieldValue,
                                                `satisfaction_slider[${index}].image`
                                              )
                                            }
                                          />
                                        </button>
                                      )}

                                      <ErrorMessage
                                        name={`satisfaction_slider[${index}].image`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  )
                                )}
                                {typeof errors.satisfaction_slider ===
                                "string" ? (
                                  <p className="errorMsg">
                                    {errors.satisfaction_slider}
                                  </p>
                                ) : null}
                                {satisfactionEdit ? (
                                  <Fragment>
                                    {values.satisfaction_slider.length < 4 && (
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
                                    )}
                                  </Fragment>
                                ) : null}
                              </Fragment>
                            )}
                          />
                        </div>


                      </div>

                      <div className="adminContainer">
                        <div className="d-flex  align-items-center justify-content-between titleBoxWrap">
                          <h4 className="resourceAddTitle ">Frequently Asked Questions</h4>

                          <p>
                            <Link
                                to="/admin/insurances/faqs/add-new-faq"
                                className="adminBtn adminBtnBlack mt-sm-15"
                            >
                              Add New FAQ
                            </Link>
                          </p>

                        </div>
                        <Fragment>
                          <div className="tableResponsive">
                            <table className="tableStyle">
                              <thead>
                              <tr>
                                <th>QUESTION</th>
                                <th>ANSWER</th>
                                <th></th>
                              </tr>
                              </thead>
                              <tbody className="tableBody">
                              {props?.faqs?.faq?.map((item) => (
                                  <tr key={item.id}>
                                    <td>
                                      <strong>

                                        {getShortContent(item?.question)}

                                      </strong>
                                    </td>
                                    <td>{getShortContent(item?.answer) || "__"}</td>

                                    <td className="text-right">
                                      <ul className="insuranceActionBtns">
                                        <li>
                                          <Link to={`/admin/insurances/faqs/${item.id}/update`}>
                                            <img src={editIcon} alt="edit" />
                                          </Link>
                                        </li>
                                        <li>
                                          <button
                                              onClick={() => deleteResponseHandler(item.id)}
                                              className="remove"
                                          >
                                            <img src={deleteIcon} alt="delete" />
                                          </button>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                        </Fragment>
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
  insurance: state.cms.insurance,
  faqs: state.admin.faqs,
});


export default connect(mapStateToProps, {
  getFAQs,
  deleteFAQ,
  uploadFileAction,
  getInsuranceDetailsAction,
  addInsuranceCMSDataAction,
})(withRouter(EditInsuranceCMS));
