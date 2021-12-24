import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
// images
import plane from "../../../assets/images/icons/plane.svg";
import TextInput from "../../formfields/InputField";
import "./style.scss";

const validationSchema = Yup.object({
  title: Yup.string().required("title can not be empty"),
  description: Yup.string().required("description can not be empty"),
});
const UsefulFeature = ({ className = "", bgImg, submitHandler }) => {
  const initialState = {
    title: "",
    description: "",
    featureIdea: true,
  };

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <li key={file.name}>
      <img src={file.preview} />
    </li>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  const handleSubmit = (values, actions) => {
    const data = {
      idea: values.featureIdea,
      title: values.title,
      description: values.description,
      image: files,
    };
    submitHandler(data, actions);
  };
  return (
    <section
      className={`${className} usefulFeatureArea`}
      style={{ background: `url(${bgImg}) no-repeat center center / cover` }}
    >
      <div className="usefulFeatureTitle">
        <h2>Have an idea for a useful feature?</h2>
        <p>We’re all ears.</p>
      </div>

      <Formik
        initialValues={initialState}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, handleBlur }) => {
          return (
            <Form className="usefulFeatureForm">
              <div className="usefulFeatureFormBG">
                <Field
                  label="Title Of Feature*"
                  id="title"
                  name="title"
                  component={TextInput}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter Title"
                />
                <Field
                  label="Description Of Feature*"
                  id="description"
                  name="description"
                  component={TextInput}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Describe your idea in as much detail as you can"
                />
                <div className="inputStyle">
                  <label>
                    Do you have and example of a similar feature? Send us a
                    screenshot!
                  </label>
                  <div {...getRootProps({ className: "dropzoneStyle" })}>
                    <input {...getInputProps()} />
                    <p>Drag & Drop files here to upload.</p>
                    <button type="button">Browse</button>
                  </div>
                  <ul className="thumbImages">{thumbs}</ul>
                </div>
                <div className="inputStyle mb-0">
                  <label>Can we call you about your feature idea?*</label>
                  <label className="switch">
                    <Field name="featureIdea" type="checkbox" />
                    <span className="slider">
                      <span className={`yes ${values.featureIdea && 'active'}`}>Yes</span>
                      <span className={`no ${!values.featureIdea && 'active'}`}>No</span>
                    </span>
                  </label>
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="sendbtn">
                  Send It <img src={plane} alt="Send It" />
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};
export default UsefulFeature;
