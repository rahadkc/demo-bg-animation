import {Field, Form, Formik} from "formik";
import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {useParams, withRouter} from "react-router-dom";
import * as Yup from "yup";

import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import {addNewPlan, getInsuranceById} from "../../admin/dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  title: Yup.string().required("Title can not be empty"),
  description: Yup.string().required("Subtitle can not be empty"),
});

const AddNewPlan = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const {insurance_id} = useParams();

  useEffect(() => {
    if (!insurance_id) {
      props.history.push("/admin/insurances");
    }

    props.getInsuranceById(insurance_id);
  }, []);

  const initialState = {
    title: "",
    description: "",
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("insurance_id", insurance_id);
    form_data.append("title", values.title);
    form_data.append("description", values.description);

    props.addNewPlan(form_data, insurance_id, props.history);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Add A Plan</h2>
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
                    validateForm,
                  }) => {
                  return (
                    <Form className="usefulFeatureForm">
                      <h3 className="resourceAddTitle editTitle">
                        General Info
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Plan Title"
                          name="title"
                          component={TextInput}
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          className="editField"
                        />

                        <div className="multilineForm">
                          {/* <label>Excerpt</label> */}
                          <Field
                            label="Plan Description"
                            name="description"
                            component={TextInput}
                            value={values.subtittle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Subtitle"
                            className="editField"
                            multiline
                          />
                        </div>
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Would you like to publish this plan?"
                        content="If you choose yes, this post will show in the plan grid."
                        submit={publishNowHandlerSubmit}
                        submitBtn={true}
                        values={values}
                        dirty={dirty}
                      />

                      <ul className="submitButtons">
                        <li>
                          <button
                            className="publishNow"
                            type="submit"
                            onClick={() => publishNowHandler(errors, dirty)}
                          >
                            Publish Now
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
  subscriptions: state.admin.subscriptions,
});
export default connect(mapStateToProps, {
  addNewPlan,
  getInsuranceById,
})(withRouter(AddNewPlan));
