import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { Modal } from "reactstrap";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import editColor from "../../../assets/images/icons/edit-color.svg";
import edit from "../../../assets/images/icons/edit.svg";
import deleteBlackIcon from "../../../assets/images/icons/list/delete.svg";
import submit from "../../../assets/images/icons/submit.svg";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import ThumbImg from "../../../components/formfields/uploadImage";
import {
  getFileExtension,
  getFileName,
  translateToString,
} from "../../../utils/commonFunctions";
import AddTaskForm from "../../accountComplete/components/todo";
import {
  getCategoriesListAction,
  updateResourceAction,
} from "../dashboard/actions";
import { getResourceDetailsAction } from "../../resources/actions";
import SelectTodo from "../addNewResource/todo";
import "./style.scss";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  keywords: Yup.string(),
  thumbnail: Yup.string(),
  resource_type: Yup.string().required("Resource Type can not be empty"),
  display_type: Yup.string().required("Display Type can not be empty"),
  categories: Yup.array().required("Category can not be empty"),
  is_featured: Yup.bool(),
  resource_color: Yup.string().required("Resource Color can not be empty"),
  hero_image: Yup.string(),
  important_image: Yup.string(),
  important_title: Yup.string().required("Title can not be empty"),
  important_paragraph: Yup.string().required(
    "Paragraph image can not be empty"
  ),
  expect_title: Yup.string().required("Title can not be empty"),
  expect_paragraph: Yup.string().required("Paragraph can not be empty"),
  expect_second_title: Yup.string().required("Second Title can not be empty"),
  // expect: Yup.object().required("Expect can not be empty"),
  faq_title: Yup.string().required("FAQ Title can not be empty"),
  // faq: Yup.object().required("FAQ can not be empty"),
  get_title: Yup.string().required("Title can not be empty"),
  get_sub_title: Yup.string().required("Subtitle can not be empty"),
  get_paragraph: Yup.string().required("Paragraph can not be empty"),
  get_image: Yup.string(),
  document: Yup.string().required("Document can not be empty"),
});

const EditResource = (props) => {
  const { id } = useParams();

  const initialState = {
    name: props.resources_details?.name ? props.resources_details?.name : "",
    url: props.resources_details?.url ? props.resources_details?.url : "",
    excerpt: props.resources_details?.excerpt
      ? props.resources_details?.excerpt
      : "",
    categories: props.resources_details?.categories
      ? props.resources_details?.categories
      : "",
    thumbnail: "",
    hero_image: "",
    resource_type: props.resources_details?.resource_type
      ? props.resources_details?.resource_type
      : "",
    display_type: props.resources_details?.display_type
      ? props.resources_details?.display_type
      : "",
    important_title: props.resources_details?.important_title
      ? props.resources_details?.important_title
      : "",
    important_image: "",
    important_paragraph: props.resources_details?.important_paragraph
      ? props.resources_details?.important_paragraph
      : "",

    expect_title: props.resources_details?.expect_title
      ? props.resources_details?.expect_title
      : "",
    expect_paragraph: props.resources_details?.expect_paragraph
      ? props.resources_details?.expect_paragraph
      : "",
    expect_second_title: props.resources_details?.expect_second_title
      ? props.resources_details?.expect_second_title
      : "",
    expect: props.resources_details?.expect
      ? props.resources_details?.expect
      : [],

    faq_title: props.resources_details?.faq_title
      ? props.resources_details?.faq_title
      : "",
    faq: props.resources_details?.faq ? props.resources_details?.faq : [],

    get_image: "",
    get_title: props.resources_details?.get_title
      ? props.resources_details?.get_title
      : "",
    get_sub_title: props.resources_details?.get_sub_title
      ? props.resources_details?.get_sub_title
      : "",
    get_paragraph: props.resources_details?.get_paragraph
      ? props.resources_details?.get_paragraph
      : "",
    document: props.resources_details?.document ?? "",
    resource_color: props.resources_details?.resource_color
      ? props.resources_details?.resource_color
      : "",
    later_date: props.resources_details?.later_date
      ? props.resources_details?.later_date
      : "",
    later_time: props.resources_details?.later_time
      ? props.resources_details?.later_time
      : "",
    is_featured: props.resources_details?.is_featured === "Yes",
  };
  const [keywords, setKeywords] = useState([]);
  const [categories, setCategories] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const [generalEdit, setGeneralEdit] = useState(false);
  const [generalImage, setGeneralImage] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [heroImage, setHeroImage] = useState(false);
  const [importantEdit, setImportantEdit] = useState(false);
  const [importantImage, setImportantImage] = useState(false);
  const [expectEdit, setExpectEdit] = useState(false);
  const [faqsEdit, setFaqsEdit] = useState(false);
  const [getEdit, setGetEdit] = useState(false);
  const [getImage, setGetImage] = useState(false);
  const [documentEdit, setDocumentEdit] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [status, setStatus] = useState("Draft");
  const [publishLaterModal, setPublishLaterModal] = useState(false);
  const [publishDateModal, setPublishDateModal] = useState(false);
  const generalEditRef = useRef(null);

  const addCategories = (text) => setCategories([...categories, text]);
  const removeCategories = (index) => {
    const newTasks = [...categories];
    newTasks.splice(index, 1);
    setCategories(newTasks);
  };
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };
  const submitHandler = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append(
      "url",
      values.url
        ? translateToString(values.url)
        : translateToString(values.name)
    );
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("thumbnail", values.thumbnail);
    form_data.append("resource_type", values.resource_type);
    form_data.append("display_type", values.display_type);
    form_data.append("categories", categories);
    form_data.append("is_featured", values.is_featured);
    form_data.append("resource_color", values.resource_color);
    form_data.append("hero_image", values.hero_image);
    form_data.append("important_image", values.important_image);
    form_data.append("important_title", values.important_title);
    form_data.append("important_paragraph", values.important_paragraph);
    form_data.append("expect_title", values.expect_title);
    form_data.append("expect_paragraph", values.expect_paragraph);
    form_data.append("expect_second_title", values.expect_second_title);
    form_data.append("expect", JSON.stringify(values.expect));
    form_data.append("faq_title", values.faq_title);
    form_data.append("faq", JSON.stringify(values.faq));
    form_data.append("get_title", values.get_title);
    form_data.append("get_sub_title", values.get_sub_title);
    form_data.append("get_paragraph", values.get_paragraph);
    form_data.append("get_image", values.get_image);
    form_data.append("document", values.document);
    form_data.append("status", status);
    props.updateResourceAction(form_data, id);
    setGeneralEdit(false);
    setEditStatus(false);
  };

  useEffect(() => {
    if (status !== props.resources_details?.status) {
      generalEditRef.current?.click();
    }
    setEditStatus(false);
  }, [status]);

  const publishDateSubmitOption = () => {
    setPublishLaterModal(true);
    setPublishDateModal(false);
  };

  const handleStatusEdit = (e) => {
    setGeneralEdit(true);
    setStatus(e.target.value);
  };

  const publishDateSubmitHandler = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("url", values.url);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("thumbnail", values.thumbnail);
    form_data.append("resource_type", values.resource_type);
    form_data.append("display_type", values.display_type);
    form_data.append("is_featured", values.is_featured);
    form_data.append("categories", categories);
    form_data.append("resource_color", values.resource_color);
    form_data.append("hero_image", values.hero_image);
    form_data.append("important_image", values.important_image);
    form_data.append("important_title", values.important_title);
    form_data.append("important_paragraph", values.important_paragraph);
    form_data.append("expect_title", values.expect_title);
    form_data.append("expect_paragraph", values.expect_paragraph);
    form_data.append("expect_second_title", values.expect_second_title);
    form_data.append("expect", JSON.stringify(values.expect));
    form_data.append("faq_title", values.faq_title);
    form_data.append("faq", JSON.stringify(values.faq));
    form_data.append("get_title", values.get_title);
    form_data.append("get_sub_title", values.get_sub_title);
    form_data.append("get_paragraph", values.get_paragraph);
    form_data.append("get_image", values.get_image);
    form_data.append("document", values.document);
    form_data.append("later_date", values.later_date);
    form_data.append("later_time", values.later_time);
    form_data.append("status", "Later");
    props.updateResourceAction(form_data, id, setPublishLaterModal);
  };

  useEffect(() => {
    setKeywords(props.resources_details?.keywords);
  }, [props.resources_details?.keywords]);

  useEffect(() => {
    setCategories(
      props.resources_details?.categories
        ? props.resources_details?.categories
        : []
    );
    setStatus(props.resources_details?.status);
  }, [props.resources_details?.categories]);

  useEffect(() => {
    props.getResourceDetailsAction(id);
    props.getCategoriesListAction();
  }, []);

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap mb-10">
                <h2 className="adminSectionTitle">
                  {props.resources_details?.name}
                </h2>
              </div>
              <div className="div">
                <span
                  onClick={() => setEditStatus(!editStatus)}
                  className="editStatus"
                >
                  <img src={edit} alt="edit" />
                </span>
                <div className="row mt-20">
                  <div className="col-md-6">
                    <div
                      className={`inputStyle ${editStatus ? "editField" : ""}`}
                    >
                      <label style={{ fontSize: "16px" }} htmlFor="status">
                        Status
                      </label>
                      <select
                        id="status"
                        value={status}
                        defaultValue={props.resources_details?.status}
                        disabled={!editStatus}
                        onChange={handleStatusEdit}
                      >
                        <option value="Draft">Draft</option>
                        <option value="Publish">Published</option>
                        <option value="Later">Later</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  submitHandler(values);
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  touched,
                  errors,
                  dirty,
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
                            type="button"
                            ref={generalEditRef}
                            onClick={() => submitHandler(values)}
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
                            onChange={handleChange}
                            readOnly={!generalEdit}
                            className={generalEdit ? "editField" : ""}
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
                        <div className="uploadImage mb-30">
                          {!generalImage ? (
                            <div className="fileImage">
                              <img
                                src={props.resources_details?.thumbnail}
                                alt="image"
                              />
                              {generalEdit ? (
                                <button
                                  onClick={() => setGeneralImage(true)}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteBlackIcon} alt="delete" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.thumbnail ? (
                                <div className="fileImage">
                                  <ThumbImg
                                    defaultImg={false}
                                    file={values.thumbnail}
                                  />

                                  <button
                                    onClick={() =>
                                      setFieldValue("thumbnail", "")
                                    }
                                    className="deleteIcon"
                                    type="button"
                                  >
                                    <img src={deleteBlackIcon} alt="delete" />
                                  </button>
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
                                    id="thumbnail"
                                    name="thumbnail"
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "thumbnail",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>

                        <Field
                          label="Resource Type"
                          id="resource_type"
                          name="resource_type"
                          component={SelectField}
                          value={values.resource_type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={!generalEdit}
                          disabled={!generalEdit}
                          className={generalEdit ? "editField" : ""}
                        >
                          <option value="">Select Resource Types</option>
                          <option value="how-to-guides">How-To-Guides</option>
                          <option value="spreadsheets">Spreadsheets</option>
                          <option value="calculators-tools">
                            Calculators + Tools
                          </option>
                          <option value="checklists">Checklists</option>
                        </Field>

                        <div
                          className={`inputStyle ${
                            generalEdit ? "editField" : ""
                          }`}
                        >
                          <label>Categories</label>
                          {generalEdit ? (
                            <SelectTodo
                              addTask={addCategories}
                              placeholder="categories"
                              categoriesData={categories}
                            />
                          ) : (
                            ""
                          )}

                          <ul className="todo-list">
                            {categories !== undefined
                              ? categories?.map((task, index) => (
                                  <li key={index} className="todo">
                                    <span className="label">{task}</span>
                                    {generalEdit ? (
                                      <span
                                        className="delete"
                                        onClick={() => removeCategories(index)}
                                      >
                                        <img src={crose} alt="delete" />
                                      </span>
                                    ) : null}
                                  </li>
                                ))
                              : null}
                          </ul>
                        </div>

                        <Field
                          label="Resource Color"
                          id="resource_color"
                          name="resource_color"
                          component={SelectField}
                          value={values.resource_color}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={!generalEdit}
                          disabled={!generalEdit}
                          className={generalEdit ? "editField" : ""}
                        >
                          <option value="">Select Background</option>
                          <option value="pink/yellow">Pink/Yellow</option>
                          <option value="blue/purple">Blue/Purple</option>
                          <option value="purple/green">Purple/Green</option>
                          <option value="green/yellow">Green/Yellow</option>
                          <option value="blue/lightBlue">
                            Blue/Light Blue
                          </option>
                          <option value="green/teal">Green/Teal</option>
                          <option value="dark_blue/purple">Dark Blue/Purple</option>
                        </Field>

                        <Field
                          label="Display Type"
                          id="display_type"
                          name="display_type"
                          component={SelectField}
                          value={values.display_type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          readOnly={!generalEdit}
                          disabled={!generalEdit}
                          className={generalEdit ? "editField" : ""}
                        >
                          <option value="BASIC">Free</option>
                          <option value="PREMIUM">Premium ($97.00/Year)</option>
                        </Field>

                        <div
                          className={`inputStyle mb-0 ${
                            generalEdit ? "editField" : ""
                          }`}
                        >
                          <label>Featured?</label>
                          <label className="switch">
                            <Field
                              readOnly={!generalEdit}
                              disabled={!generalEdit}
                              name="is_featured"
                              type="checkbox"
                            />
                            <span className="slider">
                              <span
                                className={`yes ${
                                  values.is_featured && "active"
                                }`}
                              >
                                Yes
                              </span>
                              <span
                                className={`no ${
                                  !values.is_featured && "active"
                                }`}
                              >
                                No
                              </span>
                            </span>
                          </label>
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
                              submitHandler(values);
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

                      <div className="usefulFeatureFormBG mb-50">
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
                        <div className="uploadImage">
                          {!heroImage ? (
                            <div className="fileImage">
                              <img
                                src={props.resources_details?.hero_image}
                                alt="image"
                              />
                              {heroEdit ? (
                                <button
                                  onClick={() => setHeroImage(true)}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteBlackIcon} alt="delete" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.hero_image ? (
                                <div className="fileImage">
                                  <ThumbImg
                                    defaultImg={false}
                                    file={values.hero_image}
                                  />

                                  <button
                                    onClick={() =>
                                      setFieldValue("hero_image", "")
                                    }
                                    className="deleteIcon"
                                    type="button"
                                  >
                                    <img src={deleteBlackIcon} alt="delete" />
                                  </button>
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
                                    id="hero_image"
                                    name="hero_image"
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "hero_image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          importantEdit ? "editTitle" : ""
                        }`}
                      >
                        Why Is This Important?
                        {importantEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              submitHandler(values);
                              setImportantEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setImportantEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="important_title"
                          component={TextInput}
                          value={values.important_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="important_title"
                          readOnly={!importantEdit}
                          className={importantEdit ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!importantEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="important_paragraph"
                            component={TextInput}
                            value={values.important_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={!importantEdit}
                            className={importantEdit ? "editField" : ""}
                            multiline
                          />
                        </div>

                        <label
                          className={
                            !importantEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Image
                        </label>
                        <div className="uploadImage">
                          {!importantImage ? (
                            <div className="fileImage">
                              <img
                                src={props.resources_details?.important_image}
                                alt="image"
                              />
                              {importantEdit ? (
                                <button
                                  onClick={() => setImportantImage(true)}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteBlackIcon} alt="delete" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.important_image ? (
                                <div className="fileImage">
                                  <ThumbImg
                                    defaultImg={false}
                                    file={values.important_image}
                                  />

                                  <button
                                    onClick={() =>
                                      setFieldValue("important_image", "")
                                    }
                                    className="deleteIcon"
                                    type="button"
                                  >
                                    <img src={deleteBlackIcon} alt="delete" />
                                  </button>
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
                                    id="important_image"
                                    name="important_image"
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "important_image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          expectEdit ? "editTitle" : ""
                        }`}
                      >
                        What Can You Expect?
                        {expectEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              submitHandler(values);
                              setExpectEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setExpectEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="expect_title"
                          component={TextInput}
                          value={values.expect_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Expect Title"
                          readOnly={!expectEdit}
                          className={expectEdit ? "editField" : ""}
                        />
                        <div className="multilineForm">
                          <label className={!expectEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="expect_paragraph"
                            component={TextInput}
                            value={values.expect_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={!expectEdit}
                            className={expectEdit ? "editField" : ""}
                            multiline
                          />
                        </div>

                        <Field
                          label="Secondary Title"
                          name="expect_second_title"
                          component={TextInput}
                          value={values.expect_second_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Expect Secondary Title"
                          readOnly={!expectEdit}
                          className={expectEdit ? "editField" : ""}
                        />

                        <div className="divider"></div>
                        <FieldArray
                          name="expect"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.expect.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {values.expect.length > 1 && (
                                      <Fragment>
                                        {expectEdit ? (
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
                                        ) : (
                                          ""
                                        )}
                                      </Fragment>
                                    )}
                                  </div>
                                  <div
                                    className={`inputStyle ${
                                      expectEdit ? "editField" : ""
                                    }`}
                                  >
                                    <label htmlFor={`question${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`expect[${index}].question`}
                                      placeholder="question"
                                      id={`question${index + 1}`}
                                      readOnly={!expectEdit}
                                    />
                                    <ErrorMessage
                                      name={`expect[${index}].question`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label
                                      className={
                                        !expectEdit ? " editLabel" : ""
                                      }
                                    >
                                      Paragraph
                                    </label>
                                    <div className="editField inputStyle mb-0">
                                      <Field
                                        name={`expect[${index}].answer`}
                                        component="textarea"
                                        readOnly={!expectEdit}
                                      />
                                      <ErrorMessage
                                        name={`expect[${index}].answer`}
                                        className="errorMessage"
                                        component="div"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {expectEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      question: "",
                                      answer: "",
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
                        {typeof errors.expect === "string" ? (
                          <p className="errorMsg">{errors.expect}</p>
                        ) : null}
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          faqsEdit ? "editTitle" : ""
                        }`}
                      >
                        Frequently Asked Questions
                        {faqsEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              submitHandler(values);
                              setFaqsEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setFaqsEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="faq_title"
                          component={TextInput}
                          value={values.faq_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="FAQs Title"
                          readOnly={!faqsEdit}
                          className={faqsEdit ? "editField" : ""}
                        />
                        <div className="divider"></div>

                        <h5 className="mb-30">Questions</h5>
                        <FieldArray
                          name="faq"
                          render={(arrayHelpers) => (
                            <Fragment>
                              {values.faq.map((exp, index) => (
                                <div className="faqQuestionsWrap" key={index}>
                                  <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span className="labelCount">
                                      0{index + 1}
                                    </span>
                                    {values.faq.length > 1 && (
                                      <Fragment>
                                        {faqsEdit ? (
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
                                        ) : (
                                          ""
                                        )}
                                      </Fragment>
                                    )}
                                  </div>
                                  <div
                                    className={`inputStyle ${
                                      faqsEdit ? "editField" : ""
                                    }`}
                                  >
                                    <label htmlFor={`question${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`faq[${index}].question`}
                                      placeholder="question"
                                      id={`question${index + 1}`}
                                      readOnly={!faqsEdit}
                                    />
                                    <ErrorMessage
                                      name={`faq[${index}].question`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div
                                    className={`multilineForm ${
                                      !faqsEdit ? "multilineFormHide" : ""
                                    }`}
                                  >
                                    <label
                                      className={!faqsEdit ? " editLabel" : ""}
                                    >
                                      Paragraph
                                    </label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={values.faq[index].answer}
                                      config={{
                                        toolbar: [
                                          "heading",
                                          "|",
                                          "bold",
                                          "italic",
                                          "link",
                                          "bulletedList",
                                          "numberedList",
                                          "blockQuote",
                                          "|",
                                          "imageUpload",
                                          "|",
                                          "mediaEmbed",
                                          "insertTable",
                                          "tableColumn",
                                          "tableRow",
                                          "sourcedialog",
                                          "mergeTableCells",
                                          "|",
                                          "undo",
                                          "redo",
                                        ],
                                      }}
                                      className="ekEditorWrap"
                                      readOnly={!faqsEdit}
                                      disabled={!faqsEdit}
                                      onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setFieldValue(
                                          `faq[${index}].answer`,
                                          data
                                        );
                                      }}
                                    />
                                    <ErrorMessage
                                      name={`faq[${index}].answer`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                </div>
                              ))}
                              {faqsEdit ? (
                                <button
                                  type="button"
                                  className="addNewItem"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      question: "",
                                      answer: "",
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

                        {typeof errors.faq === "string" ? (
                          <p className="errorMsg">{errors.faq}</p>
                        ) : null}
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          getEdit ? "editTitle" : ""
                        }`}
                      >
                        What You’ll Get
                        {getEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              submitHandler(values);
                              setGetEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setGetEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Title"
                          name="get_title"
                          component={TextInput}
                          value={values.get_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Get Title"
                          readOnly={!getEdit}
                          className={getEdit ? "editField" : ""}
                        />
                        <Field
                          label="Sub Title"
                          name="get_sub_title"
                          component={TextInput}
                          value={values.get_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub Title"
                          readOnly={!getEdit}
                          className={getEdit ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!getEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="get_paragraph"
                            component={TextInput}
                            value={values.get_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            readOnly={!getEdit}
                            className={getEdit ? "editField" : ""}
                            multiline
                          />
                        </div>
                        <label
                          className={
                            !getEdit
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Thumbnail
                        </label>
                        <div className="uploadImage">
                          {!getImage ? (
                            <div className="fileImage">
                              <img
                                src={props.resources_details?.get_image}
                                alt="What You'will get"
                              />
                              {getEdit ? (
                                <button
                                  onClick={() => setGetImage(true)}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteBlackIcon} alt="delete" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.get_image ? (
                                <div className="fileImage">
                                  <ThumbImg
                                    defaultImg={false}
                                    file={values.get_image}
                                  />

                                  <button
                                    onClick={() =>
                                      setFieldValue("get_image", "")
                                    }
                                    className="deleteIcon"
                                    type="button"
                                  >
                                    <img src={deleteBlackIcon} alt="delete" />
                                  </button>
                                </div>
                              ) : (
                                <button className="inputFileBtn" type="button">
                                  <h5>Upload File</h5>
                                  <span className="fileText">
                                    (jpg, png, gif)
                                  </span>
                                  <span className="fileBtn">Add Item</span>
                                  <input
                                    id="get_image"
                                    name="get_image"
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "get_image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>
                      </div>

                      <h3
                        className={`resourceAddTitle ${
                          documentEdit ? "editTitle" : ""
                        }`}
                      >
                        The Download
                        {documentEdit ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => {
                              submitHandler(values);
                              setDocumentEdit(false);
                            }}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span
                            onClick={() => setDocumentEdit(true)}
                            className="edit"
                          >
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <label className="imageLabel" htmlFor="image">
                          File
                        </label>

                        <div className="uploadImage">
                          {!documentEdit ? (
                            <div className="fileImage">
                              {values.document && (
                                <div>
                                  {getFileExtension(
                                    props.resources_details?.document
                                  ) === "zip" && (
                                    <div>
                                      <a
                                        href={props.resources_details.document}
                                      >
                                        {getFileName(
                                          props.resources_details?.document
                                        )}
                                      </a>
                                    </div>
                                  )}
                                  {getFileExtension(
                                    props.resources_details?.document
                                  ) === "pdf" && (
                                    <embed
                                      src={`${props.resources_details?.document}#view=FitH&scrollbar=0&toolbar=0&statusbar=0&messages=0&navpanes=0`}
                                      className="filePdf"
                                      type="application/pdf"
                                    />
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.document ? (
                                <div className="file-list">
                                  <div>
                                    {getFileName(values.document) ??
                                      getFileName(values.document)}
                                    {getFileName(values.document.name) ??
                                      getFileName(values.document.name)}
                                  </div>
                                  <button
                                    onClick={() =>
                                      setFieldValue("document", "")
                                    }
                                    className="deleteIcon"
                                  >
                                    <img src={deleteBlackIcon} alt="delete" />
                                  </button>
                                </div>
                              ) : (
                                <button className="inputFileBtn">
                                  <h5>Upload File</h5>
                                  <span className="fileText">(pdf, zip)</span>
                                  <span className="fileBtn">Add Item</span>
                                  <input
                                    id="document"
                                    name="document"
                                    type="file"
                                    accept="application/pdf, application/zip"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "document",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>

                        {touched.document && errors.document && (
                          <p className="errorMsg mb-0">{errors.document}</p>
                        )}
                      </div>
                      <Modal
                        isOpen={publishLaterModal}
                        centered
                        fade={false}
                        onClosed={() => setPublishLaterModal(false)}
                        backdropClassName="signupModalWrapBackdrop"
                        className="blackListModal"
                      >
                        <span
                          onClick={() => setPublishLaterModal(false)}
                          className="signupCroseBtn"
                        >
                          <img src={crose} alt="crose" />
                        </span>
                        <div className="blackListModalWrap">
                          <h2>Would you like to schedule this post?</h2>
                          <p>
                            This resource will publish on{" "}
                            <strong>
                              {moment(values.later_date).format("MM/DD/YYYY")}
                            </strong>{" "}
                            at
                            <strong>
                              {moment(values.later_date).format("h:mm A")}
                            </strong>{" "}
                            EST.
                          </p>

                          <ul className="modalBtns">
                            <li>
                              <button
                                type="submit"
                                onClick={() => publishDateSubmitHandler(values)}
                                className="success"
                              >
                                Yes, Do It <img src={submit} alt="submit" />
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => setPublishLaterModal(false)}
                                type="button"
                                className="error"
                              >
                                No, Don’t Do It{" "}
                                <img src={cancel} alt="submit" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </Modal>
                      <Modal
                        isOpen={publishDateModal}
                        centered
                        fade={false}
                        onClosed={() => setPublishDateModal(false)}
                        backdropClassName="signupModalWrapBackdrop"
                        className="blackListModal"
                      >
                        <span
                          onClick={() => setPublishDateModal(false)}
                          className="signupCroseBtn"
                        >
                          <img src={crose} alt="crose" />
                        </span>
                        <div className="blackListModalWrap">
                          <h2>Select Publish Date</h2>
                          <p>
                            Choose the date and time. Scheduling based on the
                            Eastern Timezone.
                          </p>
                          <div className="row">
                            <div className="col-sm-6 col-12">
                              <Field
                                name="later_date"
                                component={TextInput}
                                value={values.later_date}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="editField"
                                type="date"
                                label="Select Date"
                                min={new Date()}
                              />
                            </div>
                            <div className="col-sm-6 col-12">
                              <Field
                                name="later_time"
                                component={TextInput}
                                value={values.later_time}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="editField"
                                type="time"
                                label="Select Time"
                              />
                            </div>
                          </div>
                          <ul className="modalBtns">
                            <li>
                              <button
                                type="button"
                                onClick={publishDateSubmitOption}
                                className="success"
                              >
                                Yes, Do It <img src={submit} alt="submit" />
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => setPublishDateModal(false)}
                                type="button"
                                className="error"
                              >
                                No, Don’t Do It{" "}
                                <img src={cancel} alt="submit" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </Modal>
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
  resources_details: state.resources.resources_details,
  categories: state.admin.categories,
});

export default connect(mapStateToProps, {
  updateResourceAction,
  getResourceDetailsAction,
  getCategoriesListAction,
})(withRouter(EditResource));
