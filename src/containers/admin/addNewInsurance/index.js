import {Field, Form, Formik} from "formik";
import React, {Fragment, useState} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import * as Yup from "yup";
import deleteIcon from "../../../assets/images/icons/list/delete-white.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import ThumbImg from "../../../components/formfields/uploadImage";
import crose from "../../../assets/images/icons/crose.svg";

import {addNewInsurance} from "../dashboard/actions";
import AddTaskForm from "../../accountComplete/components/todo";
import PublishLater from "./PublishLater";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  slug: Yup.string().required("Slug can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  keywords: Yup.array(),
  icon: Yup.string().required("Thumbnail can not be empty"),
  image: Yup.string().required("Hero Image can not be empty"),
  hero_title_small: Yup.string().nullable("Hero Small Title can not be empty"),
});

const AddNewInsurance = (props) => {
  const [keywords, setKeywords] = useState([]);
  const [publishModal, setPublishModal] = useState(false);
  const [publishDateModal, setPublishDateModal] = useState(false);
  const [publishLaterModal, setPublishLaterModal] = useState(false);

  const addKeywords = (text) => {
    setKeywords((keywords) => [...keywords, text]);
  };

  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };

  const initialState = {
    name: "",
    slug: "",
    description: "",
    excerpt: "",
    keywords: "",
    image: "",
    icon: "",
    hero_title_small: "",
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
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
    form_data.append("slug", values.slug);
    form_data.append("description", values.description);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("image", values.image);
    form_data.append("icon", values.icon);
    form_data.append("hero_title_small", values.hero_title_small);
    form_data.append("status", "Later");
    form_data.append("later_date", values.later_date);
    form_data.append("later_time", values.later_time);
    props.addNewInsurance(form_data, props.history);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("slug", values.slug);
    form_data.append("description", values.description);
    form_data.append("excerpt", values.excerpt);
    form_data.append("keywords", keywords);
    form_data.append("image", values.image);
    form_data.append("icon", values.icon);
    form_data.append("hero_title_small", values.hero_title_small);
    form_data.append("status", "Publish");
    props.addNewInsurance(form_data, props.history);
  };

  const saveDraftHandler = (errors, dirty, values) => {
    if (Object.keys(errors).length === 0 && dirty) {
      const form_data = new FormData();
      form_data.append("name", values.name);
      form_data.append("slug", values.slug);
      form_data.append("description", values.description);
      form_data.append("excerpt", values.excerpt);
      form_data.append("keywords", keywords);
      form_data.append("image", values.image);
      form_data.append("icon", values.icon);
      form_data.append("hero_title_small", values.hero_title_small);
      form_data.append("status", "Draft");
      props.addNewInsurance(form_data, props.history);
    }
  };

  const publishLaterHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishDateModal(true);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Add Insurance</h2>
              </div>
              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
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
                      <h3 className="resourceAddTitle">General Info</h3>
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

                        <Field
                          label="URL"
                          name="slug"
                          component={TextInput}
                          value={values.slug}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="URL"
                          className="editField"
                        />

                        <div className="multilineForm">
                          <label>Description</label>
                          <Field
                            name="description"
                            component={TextInput}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Description"
                            className="editField"
                            multiline
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
                            {keywords?.map((task, index) => (
                              <li key={index} className="todo">
                                <span className="label">{task}</span>
                                <span
                                  className="delete"
                                  onClick={() => removeExpertise(index)}
                                >
                                  <img src={crose} alt="delete"/>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <label className="imageLabel" htmlFor="icon">
                          Thumbnail
                        </label>
                        <div className="uploadImage mb-30">
                          {values.icon ? (
                            <div className="fileImage">
                              <ThumbImg defaultImg={false} file={values.icon}/>
                              <button
                                onClick={() => setFieldValue("icon", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIcon} alt="delete"/>
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="icon"
                                name="icon"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  setFieldValue(
                                    "icon",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                          {touched.icon && errors.icon && (
                            <p className="errorMsg mb-0">{errors.icon}</p>
                          )}
                        </div>
                      </div>

                      <h3 className="resourceAddTitle">Hero Section</h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Hero Small Title                          "
                          name="hero_title_small"
                          component={TextInput}
                          value={values.hero_title_small}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Hero Small Title                          "
                          className="editField"
                        />

                        <label className="imageLabel" htmlFor="image">
                          Hero Image
                        </label>
                        <div className="uploadImage mb-30">
                          {values.image ? (
                            <div className="fileImage">
                              <ThumbImg
                                defaultImg={false}
                                file={values.image}
                              />
                              <button
                                onClick={() => setFieldValue("image", "")}
                                className="deleteIcon"
                              >
                                <img src={deleteIcon} alt="delete"/>
                              </button>
                            </div>
                          ) : (
                            <button component="label" className="inputFileBtn">
                              <h5>Upload File</h5>
                              <span className="fileText">(jpg, png, gif)</span>
                              <span className="fileBtn">Add Item</span>
                              <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  setFieldValue(
                                    "image",
                                    e.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                          {touched.image && errors.image && (
                            <p className="errorMsg mb-0">{errors.image}</p>
                          )}
                        </div>
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Would you like to publish this insurance?"
                        content="If you choose yes, this post will show in the insurance grid."
                        submit={publishNowHandlerSubmit}
                        submitBtn={true}
                        values={values}
                        dirty={dirty}
                      />

                      <PublishLater
                        publishLaterModal={publishLaterModal}
                        setPublishLaterModal={setPublishLaterModal}
                        publishDateModal={publishDateModal}
                        setPublishDateModal={setPublishDateModal}
                        handleChange={handleChange}
                        later_date={values.later_date}
                        handleBlur={handleBlur}
                        publishDateSubmitOption={publishDateSubmitOption}
                        publishDateSubmitHandler={publishDateSubmitHandler}
                        values={values}
                        errors={errors}
                        dirty={dirty}
                      />

                      <ul className="submitButtons">
                        <li>
                          <button
                            className="drafts"
                            type="button"
                            onClick={() =>
                              saveDraftHandler(errors, dirty, values)
                            }
                          >
                            Save to Drafts
                          </button>
                        </li>
                        <li>
                          <button
                            className="publishNow"
                            type="button"
                            onClick={() => publishNowHandler(errors, dirty)}
                          >
                            Publish Now
                          </button>
                        </li>

                        <li>
                          <button
                            className="publishLater"
                            type="button"
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {
  addNewInsurance,
})(withRouter(AddNewInsurance));
