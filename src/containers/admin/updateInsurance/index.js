import {Field, Form, Formik} from "formik";
import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter, useParams} from "react-router-dom";
import * as Yup from "yup";
import deleteIcon from "../../../assets/images/icons/list/delete-white.svg";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import {
  updateInsurance,
  getInsuranceById,
} from "../dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  name: Yup.string().required("Name can not be empty"),
  description: Yup.string().required("Description can not be empty"),
  is_featured: Yup.string().required("Is Featured type can not be empty"),
  icon: Yup.string().required("Icon can not be empty"),
  image: Yup.string().required("Hero image can not be empty"),
});

const UpdateInsurance = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const {insurance_id} = useParams();

  const initialState = {
    name: props?.insurance_details?.insurance?.name,
    description: props?.insurance_details?.insurance?.description,
    icon: props?.insurance_details?.insurance?.icon || "",
    image: props?.insurance_details?.insurance?.image || "",
    is_featured: props?.insurance_details?.insurance?.is_featured,
  };

  useEffect(() => {
    props.getInsuranceById(insurance_id);
  }, [insurance_id]);

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("name", values.name);
    form_data.append("description", values.description);
    form_data.append("is_featured", values.is_featured);
    form_data.append("icon", values.icon);
    form_data.append("image", values.image);

    props.updateInsurance(form_data, insurance_id, props.history);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Update Insurance</h2>
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

                        <div className="d-flex flex-wrap justify-content-between switchWrap my-5">
                          <span className="switchLabel">Is Featured</span>
                          <label className="switch mb-0 mt-0">
                            <Field name="is_featured" type="checkbox"/>
                            <span className="slider">
                              <span className={`yes ${values.is_featured && 'active'}`}>Yes</span>
                              <span className={`no ${!values.is_featured && 'active'}`}>No</span>
                            </span>
                          </label>
                        </div>

                        <label className="imageLabel" htmlFor="icon">
                          Icon
                        </label>
                        <div className="uploadImage mb-30">
                          {values.icon ? (
                            <div className="fileImage">
                              <img alt="Icon" src={values.icon}/>
                              <button
                                onClick={() => setFieldValue("icon", "")}
                                className="deleteIcon"
                              >
                                <img
                                  className="bg-danger"
                                  src={deleteIcon}
                                  alt="delete"
                                />
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

                        <label className="imageLabel" htmlFor="image">
                          Thumbnail
                        </label>
                        <div className="uploadImage mb-30">
                          {values.image ? (
                            <div className="fileImage">
                              <img alt="Thumbnail" src={values.image}/>
                              <button
                                onClick={() => setFieldValue("image", "")}
                                className="deleteIcon"
                              >
                                <img
                                  className="bg-danger"
                                  src={deleteIcon}
                                  alt="delete"
                                />
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
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Do you want to update the insurance?"
                        content="If you choose yes, this insurance will be updated."
                        submit={publishNowHandlerSubmit}
                        submitBtn={true}
                        values={values}
                        dirty={dirty}
                        id={insurance_id}
                      />

                      <ul className="submitButtons">
                        <li>
                          <button
                            className="publishNow"
                            type="submit"
                            onClick={() => publishNowHandler(errors, dirty)}
                          >
                            Update Now
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
  insurance_details: state.admin.insurance_details,
});
export default connect(mapStateToProps, {
  updateInsurance,
  getInsuranceById,
})(withRouter(UpdateInsurance));
