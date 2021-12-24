import React, { useState } from "react";
import * as Yup from "yup";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import editColor from "../../../../assets/images/icons/edit-color.svg";
import edit from "../../../../assets/images/icons/edit.svg";
import deleteIcon from "../../../../assets/images/icons/list/delete-red.svg";
import TextInput from "../../../../components/formfields/InputField";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./style.scss";

const plansValidationSchema = Yup.object({
  title: Yup.string().required("Plan title can not be empty"),
  description: Yup.string().nullable(),
  subscriptions: Yup.array()
    .of(
      Yup.object().shape({
        available_in: Yup.string().nullable(),
        body: Yup.string().nullable(),
        price: Yup.number().typeError("Must be a valid number."),
        price_title: Yup.string()
          .nullable()
          .required("Price title can not be empty"),
        title: Yup.string().required("Title can not be empty"),
      })
    )
    .required("Features can not be empty")
    .min(1, "Please add minimum 1 Plans"),
});

export default function PlanForm({
  plan,
  editInsuranceTiers,
  insurance_slug,
  deleteInsuranceTiers,
  deletePlan,
  planIndex,
}) {
  const [planEdit, setPlanEdit] = useState(false);

  const handleSubmit = (values) => {
    delete values.created_at;
    delete values.updated_at;
    values.plan_id = values.id;
    delete values.id;
    delete values.insurance_id;
    editInsuranceTiers(values, setPlanEdit, insurance_slug);
    setPlanEdit(false);
  };

  const deleteSubscription = (tierId) => {
    if (tierId) {
      deleteInsuranceTiers(setPlanEdit, tierId, insurance_slug);
    }
    deletePlan(planIndex);
    setPlanEdit(false);
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={plan}
        validationSchema={plansValidationSchema}
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
              <div>
                <h3
                  className={`resourceAddTitle ${planEdit ? "editTitle" : ""}`}
                >
                  Plans
                  {planEdit ? (
                    <div className="edit-tier-buttons">
                      <button
                        className="savebtn delete"
                        type="submit"
                        onClick={() => deleteSubscription(values.id)}
                      >
                        Delete <img src={deleteIcon} alt="Delete Tier" />
                      </button>

                      <button className="savebtn" type="submit">
                        Save <img src={editColor} alt="" />
                      </button>
                    </div>
                  ) : (
                    <span onClick={() => setPlanEdit(true)} className="edit">
                      Edit <img src={edit} alt="edit" />
                    </span>
                  )}
                </h3>
              </div>

              <div className="usefulFeatureFormBG mb-50">
                <div
                  className={planEdit ? "editField inputStyle" : "inputStyle"}
                >
                  <div>
                    <label htmlFor="title" className="mt-4">
                      Title
                    </label>
                    <Field
                      name="title"
                      type="text"
                      id="title"
                      value={values.title}
                      placeholder="Title"
                      readOnly={!planEdit}
                      disabled={!planEdit}
                      className={planEdit ? "editField" : ""}
                    />
                    <ErrorMessage
                      name="title"
                      className="errorMessage"
                      component="div"
                    />
                  </div>

                  <div className="multilineForm mt-4">
                    <label className={!planEdit ? " editLabel" : ""}>
                      Paragraph
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.description}
                      className="ekEditorWrap"
                      readOnly={!planEdit}
                      disabled={!planEdit}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue(`description`, data);
                      }}
                    />
                    <ErrorMessage
                      name="description"
                      className="errorMessage"
                      component="div"
                    />
                  </div>
                </div>

                <div className="divider" />

                <FieldArray
                  name="subscriptions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.subscriptions.map((subscription, index) => (
                        <div className="pr faqQuestionsWrap">
                          {planEdit && (
                            <button
                              onClick={() => arrayHelpers.remove(index)}
                              className="deleteIcon plan-delete"
                            >
                              <img src={deleteIcon} alt="delete" />
                            </button>
                          )}

                          <div className="mb-20">
                            <div
                              className={
                                planEdit ? "editField inputStyle" : "inputStyle"
                              }
                            >
                              <label htmlFor={`plan${index + 1}`}>
                                Plan Name
                              </label>
                              <Field
                                name={`subscriptions[${index}].title`}
                                component={TextInput}
                                value={values.subscriptions[index].title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Title"
                                readOnly={!planEdit}
                                className={`${
                                  planEdit ? "editField" : ""
                                } mb-4 `}
                                disabled={!planEdit}
                              />
                              <ErrorMessage
                                name={`subscriptions[${index}].title`}
                                className="errorMessage"
                                component="div"
                              />
                            </div>

                            <div
                              className={
                                planEdit ? "editField inputStyle" : "inputStyle"
                              }
                            >
                              <label htmlFor={`plan${index + 1}`}>Price</label>
                              <Field
                                name={`subscriptions[${index}].price`}
                                component={TextInput}
                                type="number"
                                value={values.subscriptions[index].price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Price"
                                readOnly={!planEdit}
                                className={`${
                                  planEdit ? "editField" : ""
                                } mb-4 `}
                                disabled={!planEdit}
                              />
                              <ErrorMessage
                                name={`subscriptions[${index}].price`}
                                className="errorMessage"
                                component="div"
                              />
                            </div>

                            <div
                              className={
                                planEdit ? "editField inputStyle" : "inputStyle"
                              }
                            >
                              <label htmlFor={`plan${index + 1}`}>
                                Price Title
                              </label>
                              <Field
                                name={`subscriptions[${index}].price_title`}
                                component={TextInput}
                                value={values.subscriptions[index].price_title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Price Title"
                                readOnly={!planEdit}
                                className={`${
                                  planEdit ? "editField" : ""
                                } mb-4 `}
                                disabled={!planEdit}
                              />
                              <ErrorMessage
                                name={`subscriptions[${index}].price_title`}
                                className="errorMessage"
                                component="div"
                              />
                            </div>

                            <div
                              className={
                                planEdit ? "editField inputStyle" : "inputStyle"
                              }
                            >
                              <label htmlFor={`plan${index + 1}`}>
                                Available In
                              </label>
                              <Field
                                name={`subscriptions[${index}].available_in`}
                                component={TextInput}
                                value={values.subscriptions[index].available_in}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                readOnly={!planEdit}
                                className={`${
                                  planEdit ? "editField" : ""
                                } mb-4 `}
                                disabled={!planEdit}
                              />
                              <ErrorMessage
                                name={`subscriptions[${index}].available_in`}
                                className="errorMessage"
                                component="div"
                              />
                            </div>

                            <div className="multilineForm">
                              <label
                                className={`${
                                  !planEdit ? " editLabel" : ""
                                } mb-3`}
                              >
                                Body
                              </label>
                              <div className="editField inputStyle mb-0">
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={values.subscriptions[index].body}
                                  className="ekEditorWrap"
                                  readOnly={!planEdit}
                                  disabled={!planEdit}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue(
                                      `subscriptions[${index}].body`,
                                      data
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name="paragraph"
                                  className="errorMessage"
                                  component="div"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {planEdit && (
                        <div>
                          <button
                            type="button"
                            className="addNewItem"
                            onClick={() => {
                              arrayHelpers.push({
                                available_in: " ",
                                body: " ",
                                price: " ",
                                price_title: " ",
                                title: " ",
                              });
                            }}
                          >
                            Add New Plan
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
