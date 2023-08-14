import React from "react";
import { Formik, Form, Field, ErrorMessage, setFieldError } from "formik";
import { connect } from "react-redux";
import { creayeHeroThunk } from "../../store/slices/heroesSlice";
import { yupValidation } from "./yupValidation";
import styles from "./heroesForm.module.css";

const MAX_FILE_SIZE = 307200;

const SUPPORTED_FORMATS = ["image/jpeg", "image/gif", "image/png"];

function HeroForm({ createHero }) {
  const initialValues = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    isGood: true,
    heroPhoto: "",
  };
 
  const handleSubmit = (values, formikBag) => {
    const formData = new FormData();
    formData.append("nickname", values.nickname);
    formData.append("realName", values.realName);
    formData.append("originDescription", values.originDescription);
    formData.append("catchPhrase", values.catchPhrase);
    formData.append("heroPhoto", values.heroPhoto);
    formData.append("isGood", values.isGood);
    createHero(formData);
    formikBag.resetForm();
  };

  const validateFile = (file) => {
    let error
    if (!file) {}
    else if (file.size <= MAX_FILE_SIZE.test(file)) {
      error = "File is too big"
    }
    else if (
      SUPPORTED_FORMATS.includes(file.type).test(
        "fileType",
        "Unsupported File Format",
        file
      )
    ) {
      error = "Invalif file format";
    }
    return error
  }

  return (
    // <div className={styles.container}>
    //   <h1>Create your hero!</h1>
      <Formik initialValues={initialValues} validationSchema={yupValidation} onSubmit={handleSubmit}>
        {(formikProps) => (
          <Form className={styles.form} encType="multipart/form-data">
            <div className={styles.textField}>
              <label htmlFor="nickname"></label>
              {/* <span>Nickname:</span> */}
              <Field
                styles="textField"
                type="text"
                name="nickname"
                placeholder="Nickname"
                class="form-control"
              ></Field>
              <ErrorMessage name="nickname" component="div" />
            </div>
            <label>
              {/* <span>Real Name:</span> */}
              <Field
                type="text"
                name="realName"
                placeholder="Real Name"
                class="form-control"
              ></Field>
              <ErrorMessage name="realName" component="div" />
            </label>
            <label>
              {/* <span>Origin Description:</span> */}
              <Field
                type="text"
                name="originDescription"
                placeholder="OriginDescription"
                class="form-control"
              ></Field>
              <ErrorMessage name="originDescription" component="div" />
            </label>
            <label>
              {/* <span>Catch Phrase:</span> */}
              <Field
                type="text"
                name="catchPhrase"
                placeholder="Catch Phrase"
                class="form-control"
              ></Field>
              <ErrorMessage name="catchPhrase" component="div" />
            </label>
            <label>
              <Field
                type="checkbox"
                name="isGood"
              ></Field>
              <span>Is hero positive:</span>
            </label>
            <label>
              <span>Hero photo:</span>
              <input
                type="file"
                name="heroPhoto"
                accept="image/*"
                onChange={(e) => {
                  formikProps.setFieldValue(
                    "heroPhoto",
                    e.target.files[0],
                    true
                  );
                  return validateFile();
                }}
                class="form-control"
              />
              <ErrorMessage name="heroPhoto" component="div" />
            </label>
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
   
  );
}

const mapStateToProps = ({ heroData }) => heroData;
const mapDispatchToProps = (dispatch) => ({
  createHero: (data) => dispatch(creayeHeroThunk(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HeroForm);
