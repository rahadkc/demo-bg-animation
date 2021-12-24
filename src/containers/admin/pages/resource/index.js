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
import { getResourceDetailsAction } from "../../../App/actions";
import { uploadFileAction } from "../editHome/actions";
import { addResourceCMSDataAction } from "./actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  hero_title: Yup.string().required("Title can not be empty"),
  hero_paragraph: Yup.string().required("Paragraph can not be empty"),
  hero_image: Yup.array()
    .of(
      Yup.object().shape({
        image: Yup.string().required("images can not be empty"),
      })
    )
    .required("what image can not be empty")
    .min(3, "please add minimum 3 images")
    .max(3, "please add maximum 3 images"),
});

const EditResourceCMS = (props) => {
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);

  const [keywords, setKeywords] = useState([]);
  const addKeywords = (text) => setKeywords([...keywords, text]);
  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };
  const initialState = {
    name: props.resource_cms?.name ? props.resource_cms?.name : "",
    url: props.resource_cms?.url ? props.resource_cms?.url : "/resources",
    excerpt: props.resource_cms?.excerpt ? props.resource_cms?.excerpt : "",
    thumbnail: props.resource_cms?.thumbnail
      ? props.resource_cms?.thumbnail
      : "",
    hero_title: props.resource_cms?.hero_title
      ? props.resource_cms?.hero_title
      : "",
    hero_paragraph: props.resource_cms?.hero_paragraph
      ? props.resource_cms?.hero_paragraph
      : "",
    hero_image: props.resource_cms?.hero_image
      ? props.resource_cms?.hero_image
      : [
          {
            image: "",
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
    form_data.append("hero_paragraph", values.hero_paragraph);
    form_data.append("hero_image", JSON.stringify(values.hero_image));
    props.addResourceCMSDataAction(form_data, setGeneralEdit);
    setHeroEdit(false);
  };

  useEffect(() => {
    props.getResourceDetailsAction();
  }, []);
  useEffect(() => {
    setKeywords(props.resource_cms?.keyword ? props.resource_cms?.keyword : []);
  }, [props.resource_cms?.keyword]);
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
                <h2 className="adminSectionTitle">Resources Page</h2>
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
                      <div className="usefulFeatureFormBG">
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

                        <div className="multilineForm">
                          <label className={!heroEdit ? " editLabel" : ""}>
                            Paragraph
                          </label>
                          <Field
                            name="hero_paragraph"
                            component={TextInput}
                            value={values.hero_paragraph}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Paragraph"
                            readOnly={!heroEdit}
                            className={heroEdit ? "editField" : ""}
                            multiline
                          />
                        </div>

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
                                <>
                                  {values.hero_image.length < 3 ? (
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
                                </>
                              ) : null}
                            </Fragment>
                          )}
                        />
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
  resource_cms: state.cms.resource_cms,
});

export default connect(mapStateToProps, {
  getResourceDetailsAction,
  uploadFileAction,
  addResourceCMSDataAction,
})(withRouter(EditResourceCMS));
