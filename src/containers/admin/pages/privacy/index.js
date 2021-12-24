import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import crose from "../../../../assets/images/icons/crose.svg";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../../assets/images/icons/list/delete-white.svg";
import TextInput from "../../../../components/formfields/InputField";
import AddTaskForm from "../../../accountComplete/components/todo";
import { getPrivacyDetailsAction } from "../../../App/actions";
import { uploadFileAction } from "../editHome/actions";
import { addPrivacyCMSDataAction } from "./actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  terms_title: Yup.string().required("Title can not be empty"),
  contents: Yup.string().required("Contents can not be empty"),
});

const EditPrivacyCMS = (props) => {
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
    name: props.privacy?.name ? props.privacy?.name : "",
    url: props.privacy?.url ? props.privacy?.url : "/privacy-policy",
    excerpt: props.privacy?.excerpt ? props.privacy?.excerpt : "",
    thumbnail: props.privacy?.thumbnail ? props.privacy?.thumbnail : "",
    terms_title: props.privacy?.terms_title ? props.privacy?.terms_title : "",
    contents: props.privacy?.contents ? props.privacy?.contents : "",
  };

  const handleSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keyword", keywords);
    form_data.append("thumbnail", values.thumbnail);
    form_data.append("terms_title", values.terms_title);
    form_data.append("contents", values.contents);
    props.addPrivacyCMSDataAction(form_data, setGeneralEdit);
    setHeroEdit(false);
  };

  useEffect(() => {
    props.getPrivacyDetailsAction();
  }, []);
  useEffect(() => {
    setKeywords(props.privacy?.keyword ? props.privacy?.keyword : []);
  }, [props.privacy?.keyword]);
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
                <h2 className="adminSectionTitle">Privacy Policy Page</h2>
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
                                    "thumbnail",
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
                        Privacy Policy Section
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
                          name="terms_title"
                          component={TextInput}
                          value={values.terms_title}
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
                          <CKEditor
                            editor={ClassicEditor}
                            data={values.contents}
                            className="ekEditorWrap"
                            readOnly={!heroEdit}
                            disabled={!heroEdit}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setFieldValue("contents", data);
                            }}
                          />
                        </div>
                        {errors.contents && touched.contents && (
                          <p className="errorMsg">{errors.contents}</p>
                        )}
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
  privacy: state.cms.privacy,
});

export default connect(mapStateToProps, {
  uploadFileAction,
  getPrivacyDetailsAction,
  addPrivacyCMSDataAction,
})(withRouter(EditPrivacyCMS));
