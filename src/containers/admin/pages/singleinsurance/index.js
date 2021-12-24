import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import * as Yup from "yup";
import crose from "../../../../assets/images/icons/crose.svg";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../../assets/images/icons/list/delete-white.svg";
import TextInput from "../../../../components/formfields/InputField";
import AddTaskForm from "../../../accountComplete/components/todo";
import { uploadFileAction } from "../editHome/actions";
import {
  addInsuranceCMSDataAction,
  deleteInsuranceTiers,
  editInsuranceTiers,
  getInsuranceDetails,
} from "./actions";
import "./style.scss";
import PlanForm from "./planForm";
import Publishlater from "./publishLater";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  slug: Yup.string().required("Slug can not be empty"),
  description: Yup.string().required("Description can not be empty"),
  excerpt: Yup.string().required("Excerpt can not be empty"),
  keywords: Yup.array(),
  image: Yup.string().required("Hero Image can not be empty"),
  icon: Yup.string().required("Icon can not be empty"),
  hero_title_small: Yup.string().nullable("Hero Small Title can not be empty"),
});

const EditSingleInsuranceCMS = (props) => {
  const [statusEdit, setStatusEdit] = useState(false);
  const [generalEdit, setGeneralEdit] = useState(false);
  const [heroEdit, setHeroEdit] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const { insurance_slug } = useParams();
  const generalSubmitRef = useRef(null);
  const [status, setStatus] = useState("draft");
  const [publishDateModal, setPublishDateModal] = useState(false);
  const [publishLaterModal, setPublishLaterModal] = useState(false);
  const renderCount = useRef(0);

  const addKeywords = (text) => {
    setKeywords((keywords) => [...keywords, text]);
  };

  const removeExpertise = (index) => {
    const newTasks = [...keywords];
    newTasks.splice(index, 1);
    setKeywords(newTasks);
  };

  const publishDateSubmitOption = () => {
    setPublishLaterModal(true);
    setPublishDateModal(false);
  };

  const publishDateSubmitHandler = (values) => {
    values.status = "Later";
    props.addInsuranceCMSDataAction(values, setGeneralEdit, insurance_slug);
    setPublishLaterModal(false);
  };

  useEffect(() => {
    props.getInsuranceDetails(insurance_slug);
  }, []);

  useEffect(() => {
    setKeywords(
      props?.single_insurance?.insurance?.keywords
        ? props?.single_insurance?.insurance?.keywords
        : []
    );
  }, [props?.single_insurance?.insurance?.keywords]);

  const initialState = {
    status: props.single_insurance?.insurance?.status
      ? props.single_insurance?.insurance?.status
      : "Later",
    name: props.single_insurance?.insurance?.name
      ? props.single_insurance?.insurance?.name
      : " ",
    slug: props.single_insurance?.insurance?.slug
      ? props.single_insurance?.insurance?.slug
      : " ",
    description: props.single_insurance?.insurance?.description
      ? props.single_insurance?.insurance?.description
      : " ",
    excerpt: props.single_insurance?.insurance?.excerpt
      ? props.single_insurance?.insurance?.excerpt
      : " ",
    keywords: props.single_insurance?.insurance?.keywords
      ? props.single_insurance?.insurance?.keywords
      : " ",
    icon: props.single_insurance?.insurance?.icon
      ? props.single_insurance?.insurance?.icon
      : " ",
    hero_title_small: props.single_insurance?.insurance?.hero_title_small
      ? props.single_insurance?.insurance?.hero_title_small
      : " ",
    title: props.single_insurance?.insurance?.title
      ? props.single_insurance?.insurance?.title
      : " ",
    image: props.single_insurance?.insurance?.image
      ? props.single_insurance?.insurance?.image
      : " ",
  };

  const [initialPlanState, setInitialPlanState] = useState([
    {
      title: " ",
      description: " ",
      subscriptions: [
        {
          available_in: " ",
          body: " ",
          price: " ",
          price_title: " ",
          title: " ",
        },
      ],
    },
  ]);

  const changeStatus = (e) => {
    setGeneralEdit(true);
    setStatus(e.target.value);
  };

  const handleSubmit = (values) => {
    values.status = status;
    values.keywords = keywords;
    props.addInsuranceCMSDataAction(values, setGeneralEdit, insurance_slug);
    setGeneralEdit(false);
    setHeroEdit(false);
    setStatusEdit(false);
  };

  const addNewPlan = () => {
    setInitialPlanState((initialPlanState) => [
      ...initialPlanState,
      {
        title: "",
        description: "",
        subscriptions: [
          {
            available_in: " ",
            body: " ",
            price: " ",
            price_title: " ",
            title: " ",
          },
        ],
      },
    ]);
  };

  const deletePlan = (planIndex) => {
    const filterPlan = initialPlanState.filter(
      (plan, index) => index !== planIndex
    );
    setInitialPlanState(filterPlan);
  };

  const handleUpload = (event, fieldValue, name) => {
    const data = {
      file: event.currentTarget.files[0],
    };
    props.uploadFileAction(data, fieldValue, name);
  };

  useEffect(() => {
    setInitialPlanState(props.single_insurance?.insurance?.plans);
    setStatus(props?.single_insurance?.insurance?.status);
  }, [props.single_insurance?.insurance]);

  useEffect(() => {
    if (renderCount.current > 2) {
      if (status === "Later") {
        setPublishDateModal(true);
      } else {
        generalSubmitRef.current?.click();
      }
    } else {
      renderCount.current += 1;
    }
  }, [status]);

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="titleBoxWrap mb-25">
                <h2 className="adminSectionTitle">Insurance</h2>
                <span className="view" onClick={() => setStatusEdit(true)}>
                  {statusEdit ? (
                    <img src={editColor} alt="view" />
                  ) : (
                    <img src={edit} alt="view" />
                  )}
                </span>
              </div>

              <Formik
                enableReinitialize
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
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
                      <div className="singleinsurancestatus">
                        <div className={`inputStyle`}>
                          <label htmlFor="status">Status</label>
                          <select
                            value={status}
                            defaultValue={
                              props.single_insurance?.insurance?.status
                            }
                            disabled={!statusEdit}
                            id="status"
                            onChange={changeStatus}
                          >
                            <option value="Draft">Draft</option>
                            <option value="Publish">Published</option>
                            <option value="Later">Published Later</option>
                          </select>
                        </div>
                      </div>

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
                            ref={generalSubmitRef}
                            onClick={() => handleSubmit(values)}
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
                          <Field
                            label="URL"
                            name="slug"
                            component={TextInput}
                            value={values.slug}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="URL"
                            readOnly={!generalEdit}
                            disabled={!generalEdit}
                            className={generalEdit ? "editField" : ""}
                          />
                        </div>

                        <div className="multilineForm">
                          <label className={!generalEdit ? " editLabel" : ""}>
                            Description
                          </label>
                          <Field
                            name="description"
                            component={TextInput}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Description"
                            readOnly={!generalEdit}
                            className={generalEdit ? "editField" : ""}
                            multiline
                            disabled={!generalEdit}
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
                          {values.icon ? (
                            <div className="fileImage">
                              <img src={values.icon} alt="Insurance" />
                              {generalEdit ? (
                                <button
                                  onClick={() => setFieldValue("icon", "")}
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
                                id="icon"
                                name="icon"
                                type="file"
                                onChange={(e) => {
                                  handleUpload(e, setFieldValue, `icon`);
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
                            {values.image ? (
                              <div className="fileImage">
                                <img src={values.image} alt="image" />
                                {heroEdit ? (
                                  <button
                                    onClick={() => setFieldValue("image", "")}
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
                                  id="image"
                                  name="image"
                                  type="file"
                                  className="imageinput"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "image",
                                      e.currentTarget.files[0]
                                    );
                                    handleUpload(e, setFieldValue, `image`);
                                  }}
                                />
                              </button>
                            )}
                          </div>
                          {touched.image && errors.image && (
                            <p className="errorMsg mb-0">{errors.image}</p>
                          )}
                        </div>
                      </div>

                      <Publishlater
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
                      />
                    </Form>
                  );
                }}
              </Formik>

              {initialPlanState?.map((plan, planIndex) => (
                <PlanForm
                  plan={plan}
                  editInsuranceTiers={props.editInsuranceTiers}
                  insurance_slug={insurance_slug}
                  deleteInsuranceTiers={props.deleteInsuranceTiers}
                  deletePlan={deletePlan}
                  planIndex={planIndex}
                  key={planIndex}
                />
              ))}

              <div className="action__buttons">
                <button type="button" onClick={addNewPlan}>
                  Add Tier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  single_insurance: state.cms.single_insurance,
});

export default connect(mapStateToProps, {
  uploadFileAction,
  getInsuranceDetails,
  addInsuranceCMSDataAction,
  editInsuranceTiers,
  deleteInsuranceTiers,
})(withRouter(EditSingleInsuranceCMS));
