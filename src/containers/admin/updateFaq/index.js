import {Field, Form, Formik} from "formik";
import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";
import {useParams, withRouter} from "react-router-dom";
import * as Yup from "yup";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import {getFaqById, updateFaq} from "../../admin/dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  question: Yup.string().required("Question can not be empty"),
  answer: Yup.string().required("Answer can not be empty"),
});

const UpdateFaq = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const {faq_id} = useParams();

  useEffect(() => {
    if (!faq_id || isNaN(faq_id)) {
      props.history.push("/admin/insurances/faqs");
    }

    props.getFaqById(faq_id);
  }, []);

  const initialState = {
    question: props?.faq_details?.faq?.question,
    answer: props?.faq_details?.faq?.answer,
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("question", values.question);
    form_data.append("answer", values.answer);

    props.updateFaq(form_data, props.history, faq_id);
  };

  return (
    <Fragment>
      <div className="blackListArea">
        <div className="adminContainer">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="d-flex flex-wrap align-items-center justify-content-between titleBoxWrap">
                <h2 className="adminSectionTitle">Update FAQ</h2>
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
                        Frequently Asked Questions
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        <Field
                          label="Question"
                          name="question"
                          component={TextInput}
                          value={values.question}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="FAQ Question"
                          className="editField"
                        />

                        <div className="multilineForm">
                          <Field
                            label="FAQ Answer"
                            name="answer"
                            component={TextInput}
                            value={values.answer}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="FAQ Answer"
                            className="editField"
                            multiline
                          />
                        </div>
                        {typeof errors.faq === "string" ? (
                          <p className="errorMsg">{errors.faq}</p>
                        ) : null}
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Would you like to update this FAQ?"
                        content="If you choose yes, this FAQ will update."
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
  faq_details: state.admin.faq_details,
});
export default connect(mapStateToProps, {
  updateFaq,
  getFaqById,
})(withRouter(UpdateFaq));
