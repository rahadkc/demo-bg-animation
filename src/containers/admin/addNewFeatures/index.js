import { Field, Form, Formik } from "formik";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import deleteIcon from "../../../assets/images/icons/list/delete-white.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import ThumbImg from "../../../components/formfields/uploadImage";
import { addNewFeatureAction } from "../../admin/dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  description: Yup.string().required("Description can not be empty"),
  coming_in: Yup.string().required("Coming in can not be empty"),
  image: Yup.string().required("Image can not be empty"),
  is_featured: Yup.string().required("Resource type can not be empty"),
});

const AddNewFeatures = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const initialState = {
    name: "",
    description: "",
    coming_in: "",
    image: "",
    is_featured: false,
  };

  const handlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("description", values.description);
    form_data.append("coming_in", values.coming_in);
    form_data.append("image", values.image);
    form_data.append("is_featured", values.is_featured);
    props.addNewFeatureAction(form_data, props.history);
  };
  const publishNowHandler = (dirty) => {
    if (dirty) setPublishModal(true);
  };
  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 col-12">
              <h2 className="adminSectionTitle mb-30">
                Add A Upcoming Features
              </h2>
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
                      <div className="usefulFeatureFormBG">
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

                        <Field
                          label="Coming In"
                          name="coming_in"
                          component={TextInput}
                          value={values.coming_in}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Coming in"
                          className="editField"
                        />

                        <label className="imageLabel" htmlFor="image">
                          Image
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
                                <img src={deleteIcon} alt="delete" />
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
                                onChange={(event) => {
                                  setFieldValue(
                                    "image",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                            </button>
                          )}
                          {touched.image && errors.image && (
                            <p className="errorMsg mb-0">{errors.image}</p>
                          )}
                        </div>
                        <div className="inputStyle editField mb-0">
                          <label>Featured?</label>
                          <label className="switch">
                            <Field name="is_featured" type="checkbox" />
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
                        title="Would you like to publish this feature?"
                        content="If you choose yes, this post will show in the upcoming feature"
                        submit={handlerSubmit}
                        submitBtn={true}
                        values={values}
                      />
                      <ul className="submitButtons mt-30">
                        <li>
                          <button
                            className="publishNow"
                            type="submit"
                            onClick={() => publishNowHandler(dirty)}
                          >
                            Submit Now
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

export default connect(null, {
  addNewFeatureAction,
})(withRouter(AddNewFeatures));
