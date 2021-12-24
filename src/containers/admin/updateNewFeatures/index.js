import { Field, Form, Formik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import editColor from "../../../assets/images/icons/edit-color.svg";
import edit from "../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../assets/images/icons/list/delete-white.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import ThumbImg from "../../../components/formfields/uploadImage";
import {
  getFeatureDetailsAction,
  updateFeatureAction,
} from "../dashboard/actions";
import "./style.scss";

const UpdateNewFeatures = (props) => {
  const { id } = useParams();

  const [publishModal, setPublishModal] = useState(false);
  const [editView, setEditView] = useState(false);
  const [editViewImage, setEditViewImage] = useState(false);
  const initialState = {
    name: props.feature_details?.name ? props.feature_details?.name : "",
    description: props.feature_details?.description
      ? props.feature_details?.description
      : "",
    coming_in: props.feature_details?.coming_in
      ? props.feature_details?.coming_in
      : "",
    image: "",
    is_featured: props.feature_details?.is_featured === "Yes" ? true : false,
  };
  useEffect(() => {
    props.getFeatureDetailsAction(id);
  }, []);
  useEffect(() => {
    props.getFeatureDetailsAction(id);
  }, [id]);
  const handlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("description", values.description);
    form_data.append("coming_in", values.coming_in);
    form_data.append("image", values.image);
    form_data.append("is_featured", values.is_featured);
    props.updateFeatureAction(
      form_data,
      id,
      setPublishModal,
      setEditView,
      setEditViewImage
    );
  };
  const publishNowHandler = () => {
    setPublishModal(true);
  };
  const handleEdit = () => {
    setEditView(true);
  };
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <h2 className="adminSectionTitle mb-30">
                Update Upcoming Features
              </h2>
              <Formik
                enableReinitialize
                initialValues={initialState}
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
                      <h3
                        className={`resourceAddTitle ${
                          editView ? "editTitle" : ""
                        }`}
                      >
                        Features
                        {editView ? (
                          <button
                            className="savebtn"
                            type="submit"
                            onClick={() => publishNowHandler(dirty)}
                          >
                            Save <img src={editColor} alt="" />
                          </button>
                        ) : (
                          <span onClick={handleEdit} className="edit">
                            Edit <img src={edit} alt="edit" />
                          </span>
                        )}
                      </h3>
                      <div className="usefulFeatureFormBG">
                        <Field
                          label="Name"
                          name="name"
                          component={TextInput}
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Name"
                          readOnly={!editView}
                          disabled={!editView}
                          className={editView ? "editField" : ""}
                        />

                        <div className="multilineForm">
                          <label className={!editView ? " editLabel" : ""}>
                            Description
                          </label>
                          <Field
                            name="description"
                            component={TextInput}
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Description"
                            readOnly={!editView}
                            disabled={!editView}
                            className={editView ? "editField" : ""}
                            multiline
                          />
                        </div>

                        <Field
                          label="Coming In"
                          name="coming_in"
                          component={TextInput}
                          value={values.coming_in}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Coming in"
                          readOnly={!editView}
                          disabled={!editView}
                          className={editView ? "editField" : ""}
                        />

                        <label
                          className={
                            !editView
                              ? "imageLabel editImageLabel"
                              : "imageLabel"
                          }
                          htmlFor="image"
                        >
                          Image
                        </label>

                        <div className="uploadImage mb-30">
                          {!editViewImage ? (
                            <div className="fileImage">
                              <img
                                src={props.feature_details?.image}
                                alt="imagessss"
                              />
                              {editView ? (
                                <button
                                  onClick={() => setEditViewImage(true)}
                                  className="deleteIcon"
                                  type="button"
                                >
                                  <img src={deleteIcon} alt="delete" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          ) : (
                            <Fragment>
                              {values.image ? (
                                <div className="fileImage">
                                  <ThumbImg
                                    defaultImg={false}
                                    file={values.image}
                                  />

                                  <button
                                    onClick={() => setFieldValue("image", "")}
                                    className="deleteIcon"
                                    type="button"
                                  >
                                    <img src={deleteIcon} alt="delete" />
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
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={(event) => {
                                      setFieldValue(
                                        "image",
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                  />
                                </button>
                              )}
                            </Fragment>
                          )}
                        </div>

                        <div
                          className={`${
                            editView ? "editField" : ""
                          } inputStyle mb-0`}
                        >
                          <label>Featured?</label>
                          <label className="switch">
                            <Field
                              readOnly={!editView}
                              disabled={!editView}
                              name="is_featured"
                              type="checkbox"
                            />
                            <span className="slider">
                              <span className={`yes ${values.is_featured && 'active'}`}>Yes</span>
                              <span className={`no ${!values.is_featured && 'active'}`}>No</span>
                            </span>
                          </label>
                        </div>
                      </div>
                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Would you like to Update this feature?"
                        content="If you choose yes, this post will show in the upcoming feature"
                        submit={handlerSubmit}
                        submitBtn={true}
                        values={values}
                      />
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
  feature_details: state.admin.feature_details,
});
export default connect(mapStateToProps, {
  updateFeatureAction,
  getFeatureDetailsAction,
})(withRouter(UpdateNewFeatures));
