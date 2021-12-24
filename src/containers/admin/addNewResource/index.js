import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf/dist/umd/entry.webpack";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Modal } from "reactstrap";
import * as Yup from "yup";
import cancel from "../../../assets/images/icons/cancel.svg";
import crose from "../../../assets/images/icons/crose.svg";
import deleteIcon from "../../../assets/images/icons/list/delete-white.svg";
import {
  default as deleteBlackIcon,
  default as deleteIconBlack,
} from "../../../assets/images/icons/list/delete.svg";
import submit from "../../../assets/images/icons/submit.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import SelectField from "../../../components/formfields/SelectField";
import ThumbImg from "../../../components/formfields/uploadImage";
import { translateToString } from "../../../utils/commonFunctions";
import AddTaskForm from "../../accountComplete/components/todo";
import {
  addNewResourceAction,
  getCategoriesListAction,
} from "../dashboard/actions";
import "./style.scss";
import SelectTodo from "./todo";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  thumbnail: Yup.string().required("Thumbnail can not be empty"),
  resource_type: Yup.string().required("Resource type can not be empty"),
  display_type: Yup.string().required("Display type can not be empty"),
  hero_image: Yup.string().required("Hero image can not be empty"),
  important_image: Yup.string().required("Important image can not be empty"),
  important_title: Yup.string().required("Important title can not be empty"),
  important_paragraph: Yup.string().required(
    "Important content can not be empty"
  ),
  expect_title: Yup.string().required("Expect title can not be empty"),
  expect_paragraph: Yup.string().required("Expect content can not be empty"),
  expect_secondary_title: Yup.string().required(
    "Expect Secondary title can not be empty"
  ),
  expect: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("question can not be empty"),
        answer: Yup.string().required("answer can not be empty"),
      })
    )
    .required("expect guide question can not be empty")
    .min(1, "please add minimum 1 expect guide question"),
  faq: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("question can not be empty"),
        answer: Yup.string().required("answer can not be empty"),
      })
    )
    .required("EHR Questions can not be empty")
    .min(1, "please add minimum 1 EHR Questions"),
  faq_title: Yup.string().required("EHR title can not be empty"),
  get_image: Yup.string().required("Get image can not be empty"),
  get_title: Yup.string().required("Get title can not be empty"),
  get_paragraph: Yup.string().required("Get content can not be empty"),
  get_sub_title: Yup.string().required("Get Sub title can not be empty"),
  document: Yup.string().required("Document can not be empty"),
  resource_color: Yup.string().required("Resource color can not be empty"),
});

const AddNewResource = (props) => {
  const [keywords, setKeywords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishModal, setPublishModal] = useState(false);
  const [publishDateModal, setPublishDateModal] = useState(false);
  const [publishLaterModal, setPublishLaterModal] = useState(false);
  const addKeywords = (text) => setKeywords([...keywords, text]);
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

  const initialState = {
    name: "",
    url: "",
    excerpt: "",
    thumbnail: "",
    hero_image: "",
    resource_type: "",
    display_type: "BASIC",
    is_featured: false,
    important_title: "",
    important_image: "",
    important_paragraph: "",

    expect_title: "",
    expect_paragraph: "",
    expect_secondary_title: "",
    expect: [
      {
        question: "",
        answer: "",
      },
    ],

    faq_title: "",
    faq: [
      {
        question: "",
        answer: "",
      },
    ],

    get_image: "",
    get_title: "",
    get_sub_title: "",
    get_paragraph: "",
    document: "",
    resource_color: "",
    later_date: "",
    later_time: "",
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };
  const saveDraftHandler = (values) => {
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
    form_data.append("resource_color", values.resource_color);
    form_data.append("is_featured", values.is_featured);
    form_data.append("hero_image", values.hero_image);
    form_data.append("important_image", values.important_image);
    form_data.append("important_title", values.important_title);
    form_data.append("important_paragraph", values.important_paragraph);
    form_data.append("expect_title", values.expect_title);
    form_data.append("expect_paragraph", values.expect_paragraph);
    form_data.append("expect_second_title", values.expect_secondary_title);
    form_data.append("expect", JSON.stringify(values.expect));
    form_data.append("faq_title", values.faq_title);
    form_data.append("faq", JSON.stringify(values.faq));
    form_data.append("get_title", values.get_title);
    form_data.append("get_sub_title", values.get_sub_title);
    form_data.append("get_paragraph", values.get_paragraph);
    form_data.append("get_image", values.get_image);
    form_data.append("document", values.document);
    form_data.append("status", "Draft");
    props.addNewResourceAction(form_data, props.history);
  };

  const publishLaterHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishDateModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
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
    form_data.append("resource_color", values.resource_color);
    form_data.append("is_featured", values.is_featured);
    form_data.append("hero_image", values.hero_image);
    form_data.append("important_image", values.important_image);
    form_data.append("important_title", values.important_title);
    form_data.append("important_paragraph", values.important_paragraph);
    form_data.append("expect_title", values.expect_title);
    form_data.append("expect_paragraph", values.expect_paragraph);
    form_data.append("expect_second_title", values.expect_secondary_title);
    form_data.append("expect", JSON.stringify(values.expect));
    form_data.append("faq_title", values.faq_title);
    form_data.append("faq", JSON.stringify(values.faq));
    form_data.append("get_title", values.get_title);
    form_data.append("get_sub_title", values.get_sub_title);
    form_data.append("get_paragraph", values.get_paragraph);
    form_data.append("get_image", values.get_image);
    form_data.append("document", values.document);
    form_data.append("status", "Publish");
    props.addNewResourceAction(form_data, props.history);
  };

  const publishDateSubmitOption = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) {
      setPublishLaterModal(true);
      setPublishDateModal(false);
    }
  };
  const publishDateSubmitHandler = (values) => {
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
    form_data.append("resource_color", values.resource_color);
    form_data.append("is_featured", values.is_featured);
    form_data.append("hero_image", values.hero_image);
    form_data.append("important_image", values.important_image);
    form_data.append("important_title", values.important_title);
    form_data.append("important_paragraph", values.important_paragraph);
    form_data.append("expect_title", values.expect_title);
    form_data.append("expect_paragraph", values.expect_paragraph);
    form_data.append("expect_second_title", values.expect_secondary_title);
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
    props.addNewResourceAction(form_data, props.history);
  };

  useEffect(() => {
    props.getCategoriesListAction();
  }, []);

  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setPageNumber(numPages);
  }

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Add A Resource</h2>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                // onSubmit={submitHandler}
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
                      <h3 className="resourceAddTitle editTitle">
                        General Info
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
                          className="editField"
                        />

                        <div className="editField inputStyle">
                          <label htmlFor="url">URL</label>
                          <Field
                            name="url"
                            type="text"
                            id="url"
                            value={translateToString(
                              values.url
                                ? values.url
                                : values.name.toLowerCase()
                            )}
                            placeholder="URL"
                            onChange={handleChange}
                          />
                        </div>

                        <div className="multilineForm">
                          <label>Excerpt</label>
                          <Field
                            name="excerpt"
                            component={TextInput}
                            value={values.excerpt}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Excerpt"
                            className="editField"
                            multiline
                          />
                        </div>
                        <div className="inputStyle editField">
                          <label>Keywords</label>
                          <AddTaskForm
                            addTask={addKeywords}
                            placeholder="Keywords"
                          />
                          <ul className="todo-list">
                            {keywords.map((task, index) => (
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
                        <label className="imageLabel" htmlFor="image">
                          Thumbnail
                        </label>
                        <div className="uploadImage mb-30">
                          {values.thumbnail ? (
                            <div className="fileImage">
                              <ThumbImg
                                defaultImg={false}
                                file={values.thumbnail}
                              />
                              <button
                                onClick={() => setFieldValue("thumbnail", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIcon} alt="delete" />
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="thumbnail"
                                name="thumbnail"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue(
                                    "thumbnail",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                          {touched.thumbnail && errors.thumbnail && (
                            <p className="errorMsg mb-0">{errors.thumbnail}</p>
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
                          className="editField"
                        >
                          <option value="">Select Resource Types</option>
                          <option value="how-to-guides">How-To-Guides</option>
                          <option value="spreadsheets">Spreadsheets</option>
                          <option value="calculators-tools">
                            Calculators + Tools
                          </option>
                          <option value="checklists">Checklists</option>
                          <option value="forms">Forms</option>
                        </Field>
                        {/* <Field
                          label="Categories"
                          id="categories"
                          name="categories"
                          component={SelectField}
                          value={categories}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="editField"
                        >
                          <option value="">Select categories</option>
                          {props.categories?.data?.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </Field> */}
                        <div className="inputStyle editField">
                          <label>Categories</label>
                          <SelectTodo
                            addTask={addCategories}
                            placeholder="categories"
                            categoriesData={categories}
                          />
                          <ul className="todo-list">
                            {categories.map((task, index) => (
                              <li key={index} className="todo">
                                <span className="label">{task}</span>
                                <span
                                  className="delete"
                                  onClick={() => removeCategories(index)}
                                >
                                  <img src={crose} alt="delete" />
                                </span>
                              </li>
                            ))}
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
                          className="editField"
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
                        </Field>
                        <Field
                          label="Display Type"
                          id="display_type"
                          name="display_type"
                          component={SelectField}
                          value={values.display_type}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="editField"
                        >
                          <option value="BASIC">Free</option>
                          <option value="PREMIUM">Premium ($97.00/Year)</option>
                        </Field>
                        <div className="inputStyle editField mb-0">
                          <label>Featured?</label>
                          <label className="switch">
                            <Field name="is_featured" type="checkbox" />
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
                      <h3 className="resourceAddTitle editTitle">
                        Hero Section
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <label className="imageLabel" htmlFor="image">
                          Image
                        </label>
                        <div className="uploadImage">
                          {values.hero_image ? (
                            <div className="fileImage">
                              <ThumbImg
                                defaultImg={false}
                                file={values.hero_image}
                              />
                              <button
                                onClick={() => setFieldValue("hero_image", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIcon} alt="delete" />
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="hero_image"
                                name="hero_image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue(
                                    "hero_image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </div>
                        {touched.hero_image && errors.hero_image && (
                          <p className="errorMsg mb-0">{errors.hero_image}</p>
                        )}
                      </div>

                      <h3 className="resourceAddTitle editTitle">
                        Why Is This Important?
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
                          className="editField"
                        />

                        <div className="multilineForm">
                          <label>Paragraph</label>
                          <Field
                            name="important_paragraph"
                            component={TextInput}
                            value={values.important_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="editField"
                            multiline
                          />
                        </div>
                        <label className="imageLabel" htmlFor="image">
                          Image
                        </label>
                        <div className="uploadImage">
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
                              >
                                <img src={deleteIcon} alt="delete" />
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="important_image"
                                name="important_image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue(
                                    "important_image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </div>
                        {touched.important_image && errors.important_image && (
                          <p className="errorMsg mb-0">
                            {errors.important_image}
                          </p>
                        )}
                      </div>
                      <h3 className="resourceAddTitle editTitle">
                        What Can You Expect?
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
                          className="editField"
                        />
                        <div className="multilineForm">
                          <label>Paragraph</label>
                          <Field
                            name="expect_paragraph"
                            component={TextInput}
                            value={values.expect_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="editField"
                            multiline
                          />
                        </div>

                        <Field
                          label="Secondary Title"
                          name="expect_secondary_title"
                          component={TextInput}
                          value={values.expect_secondary_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Expect Secondary Title"
                          className="editField"
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
                                  </div>
                                  <div className="editField inputStyle">
                                    <label htmlFor={`question${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`expect[${index}].question`}
                                      placeholder="question"
                                      id={`question${index + 1}`}
                                    />
                                    <ErrorMessage
                                      name={`expect[${index}].question`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label>Paragraph</label>
                                    <div className="editField inputStyle mb-0">
                                      <Field
                                        name={`expect[${index}].answer`}
                                        component="textarea"
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
                            </Fragment>
                          )}
                        />
                        {typeof errors.expect === "string" ? (
                          <p className="errorMsg">{errors.expect}</p>
                        ) : null}
                      </div>

                      <h3 className="resourceAddTitle editTitle">
                        Frequently Asked Questions
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
                          className="editField"
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
                                  </div>
                                  <div className="editField inputStyle">
                                    <label htmlFor={`faq${index + 1}`}>
                                      Title
                                    </label>
                                    <Field
                                      name={`faq[${index}].question`}
                                      placeholder="question"
                                      id={`faq${index + 1}`}
                                    />
                                    <ErrorMessage
                                      name={`faq[${index}].question`}
                                      className="errorMessage"
                                      component="div"
                                    />
                                  </div>
                                  <div className="multilineForm">
                                    <label>Paragraph</label>
                                    <CKEditor
                                      editor={ClassicEditor}
                                      data={values.faq[index].answer}
                                      className="ekEditorWrap"
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
                            </Fragment>
                          )}
                        />
                        {typeof errors.faq === "string" ? (
                          <p className="errorMsg">{errors.faq}</p>
                        ) : null}
                      </div>

                      <h3 className="resourceAddTitle editTitle">
                        What You’ll Get
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
                          className="editField"
                        />
                        <Field
                          label="Sub Title"
                          name="get_sub_title"
                          component={TextInput}
                          value={values.get_sub_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Sub Title"
                          className="editField"
                        />

                        <div className="multilineForm">
                          <label>Paragraph</label>
                          <Field
                            name="get_paragraph"
                            component={TextInput}
                            value={values.get_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="editField"
                            multiline
                          />
                        </div>

                        <label className="imageLabel" htmlFor="image">
                          Image
                        </label>
                        <div className="uploadImage">
                          {values.get_image ? (
                            <div className="fileImage">
                              <ThumbImg
                                defaultImg={false}
                                file={values.get_image}
                              />
                              <button
                                onClick={() => setFieldValue("get_image", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIcon} alt="delete" />
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="get_image"
                                name="get_image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue(
                                    "get_image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </div>
                        {touched.hero_image && errors.hero_image && (
                          <p className="errorMsg mb-0">{errors.hero_image}</p>
                        )}
                      </div>

                      <h3 className="resourceAddTitle editTitle">
                        The Download
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <label className="imageLabel" htmlFor="image">
                          File
                        </label>
                        <div className="uploadImage">
                          {values.document ? (
                            <div className="fileImage">
                              <Document
                                file={values.document}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="mb-30"
                              >
                                <Page pageNumber={pageNumber} />
                              </Document>
                              <button
                                onClick={() => setFieldValue("document", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIconBlack} alt="delete" />
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
                                accept="application/pdf,application/zip"
                                onChange={(event) => {
                                  setFieldValue(
                                    "document",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                        </div>
                        {touched.document && errors.document && (
                          <p className="errorMsg mb-0">{errors.document}</p>
                        )}
                      </div>
                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Would you like to publish this resource?"
                        content="If you choose yes, this post will show in the resource grid."
                        submit={publishNowHandlerSubmit}
                        submitBtn={true}
                        values={values}
                        dirty={dirty}
                      />

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
                                type="submit"
                                onClick={() =>
                                  publishDateSubmitOption(errors, dirty)
                                }
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
                      <ul className="submitButtons">
                        <li>
                          <button
                            className="drafts"
                            type="button"
                            onClick={() => saveDraftHandler(values)}
                          >
                            Save to Drafts
                          </button>
                        </li>
                        <li>
                          <button
                            className="publishNow"
                            type="submit"
                            onClick={() => publishNowHandler(errors, dirty)}
                          >
                            Publish Now
                          </button>
                        </li>
                        <li>
                          <button
                            className="publishLater"
                            type="submit"
                            onClick={() => publishLaterHandler(errors, dirty)}
                          >
                            Publish Later
                          </button>
                        </li>
                      </ul>
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
  categories: state.admin.categories,
});
export default connect(mapStateToProps, {
  addNewResourceAction,
  getCategoriesListAction,
})(withRouter(AddNewResource));
