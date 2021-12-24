import {Field, Form, Formik} from "formik";
import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {withRouter, useParams} from "react-router-dom";
import * as Yup from "yup";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import {updatePlan, getPlanDetails} from "../dashboard/actions";
import "./style.scss";


const validationSchema = Yup.object({
  title: Yup.string().required("Title can not be empty"),
  description: Yup.string().required("Subtitle can not be empty"),
  status: Yup.string().required("Is Featured type can not be empty"),
});

const UpdatePlan = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const {insurance_id, plan_id} = useParams();

  useEffect(() => {
    if (!insurance_id || isNaN(insurance_id)) {
      props.history.push("/admin/insurances");
    }
  }, []);

  useEffect(() => {
    props.getPlanDetails(plan_id);
  }, [insurance_id]);

  const [selectList, setSelectList] = useState([]);

  const initialState = {
    title: props?.plan_details?.plan?.title,
    description: props?.plan_details?.plan?.description,
    status: props?.plan_details?.plan?.status,
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();

    form_data.append("insurance_plan_id", 1);
    form_data.append("title", values.title);
    form_data.append("description", values.description);
    form_data.append("status", values.status);

    props.updatePlan(
      form_data,
      props?.plan_details?.plan?.id,
      insurance_id,
      props.history
    );
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Update A Plan</h2>
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
                          <Field
                            label="Plan Description"
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
                          <span className="switchLabel">Status</span>
                          <label className="switch mb-0 mt-0">
                            <Field name="status" type="checkbox"/>
                            <span className="slider">
                              <span className={`yes ${values.status && 'active'}`}>Yes</span>
                              <span className={`no ${!values.status && 'active'}`}>No</span>
                            </span>
                          </label>
                        </div>
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Do you want to update this plan?"
                        content="If you choose yes, this post will show in the plans grid."
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
  plan_details: state.admin.plan_details,
});

export default connect(mapStateToProps, {
  updatePlan,
  getPlanDetails,
})(withRouter(UpdatePlan));
