import React, { Fragment, useEffect, useState } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import ConfirmModal from "../../../components/confirmModal";
import TextInput from "../../../components/formfields/InputField";
import {
  updateSubscription,
  getSubscriptionDetails,
} from "../../admin/dashboard/actions";
import "./style.scss";

const validationSchema = Yup.object({
  title: Yup.string().required("Title can not be empty"),
  available_in: Yup.string().nullable(),
  price_title: Yup.string().required("Price title can not be empty"),
  price: Yup.string().required("Price type can not be empty"),
  link: Yup.string().required("Link can not be empty"),
});

const UpdateSubscription = (props) => {
  const [publishModal, setPublishModal] = useState(false);

  const { insurance_id, plan_id, subscription_id } = useParams();

  useEffect(() => {
    if (!insurance_id || !plan_id || isNaN(plan_id)) {
      props.history.push("/admin/insurance/plans");
    }
  }, []);

  const [inputList, setInputList] = useState([]);

  useEffect(() => {
    props.getSubscriptionDetails(subscription_id);
  }, [insurance_id, plan_id]);

  useEffect(() => {
    if (Object.keys(props?.subscription_details).length > 0) {
      let data = JSON.parse(props?.subscription_details?.Subscription?.body);
      if (data.length !== 0) {
        setInputList(data);
      }
    }
  }, [props?.subscription_details?.Subscription?.body]);

  const handleItemChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addNewItem = () => {
    setInputList([...inputList, { itemtitle: "", itemvalue: "" }]);
  };

  const removeItem = (id) => {
    setInputList(inputList.filter((_, index) => index !== id));
  };

  const initialState = {
    title: props?.subscription_details?.Subscription?.title,
    available_in: props?.subscription_details?.Subscription?.available_in,
    price_title: props?.subscription_details?.Subscription?.price_title,
    price: props?.subscription_details?.Subscription?.price,
    link: props?.subscription_details?.Subscription?.link,
  };

  const publishNowHandler = (errors, dirty) => {
    if (Object.keys(errors).length === 0 && dirty) setPublishModal(true);
  };

  const publishNowHandlerSubmit = (values) => {
    const form_data = new FormData();
    form_data.append("plan_id", plan_id);
    form_data.append("title", values.title);
    form_data.append("available_in", values.available_in ?? "");
    form_data.append("price_title", values.price_title);
    form_data.append("price", values.price);
    form_data.append("link", values.link ?? "");
    form_data.append("body", JSON.stringify(inputList));

    props.updateSubscription(
      form_data,
      props?.subscription_details?.Subscription?.id,
      plan_id,
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
                <h2 className="adminSectionTitle">Update Subscription</h2>
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
                          label="Subscription Title"
                          name="title"
                          component={TextInput}
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Title"
                          className="editField"
                        />

                        <Field
                          label="Available In"
                          name="available_in"
                          component={TextInput}
                          value={values.available_in}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder=""
                          className="editField"
                        />

                        <Field
                          label="Price Title"
                          name="price_title"
                          component={TextInput}
                          value={values.price_title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Price title"
                          className="editField"
                        />

                        <Field
                          label="Price"
                          name="price"
                          component={TextInput}
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Price"
                          className="editField"
                        />

                        <Field
                          label="Link"
                          name="link"
                          component={TextInput}
                          value={values.link}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Link"
                          className="editField"
                        />
                      </div>
                      <h3 className="resourceAddTitle editTitle">
                        Subscription Body
                      </h3>
                      <div className="usefulFeatureFormBG mb-50">
                        {inputList.map((item, index) => (
                          <>
                            <div className="row align-end mb-4">
                              <div className="col-5">
                                <div>
                                  <label className="customLabel">Title</label>
                                  <input
                                    type="text"
                                    name="itemtitle"
                                    className="customEditField"
                                    onChange={(event) =>
                                      handleItemChange(event, index)
                                    }
                                    value={item.itemtitle}
                                  />
                                </div>
                              </div>
                              <div className="col-6">
                                <div>
                                  <label className="customLabel">Body</label>
                                  <input
                                    type="text"
                                    name="itemvalue"
                                    className="customEditField"
                                    onChange={(event) =>
                                      handleItemChange(event, index)
                                    }
                                    value={item.itemvalue}
                                  />
                                </div>
                              </div>
                              <div className="col-1">
                                <svg
                                  className="subscription__removeitem"
                                  onClick={() => removeItem(index)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                >
                                  <path fill="none" d="M0 0h24v24H0z" />
                                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-9h10v2H7v-2z" />
                                </svg>
                              </div>
                            </div>
                          </>
                        ))}

                        <div className="subscription__addanother">
                          <button type="button" onClick={(e) => addNewItem(e)}>
                            Add another
                          </button>
                        </div>
                      </div>

                      <ConfirmModal
                        isOpen={publishModal}
                        onClosed={() => setPublishModal(false)}
                        title="Do you want to update the subscription?"
                        content="If you choose yes, this post will show in the resource grid."
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
  subscription_details: state.admin.subscription_details,
});
export default connect(mapStateToProps, {
  updateSubscription,
  getSubscriptionDetails,
})(withRouter(UpdateSubscription));
