import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { creayeHeroThunk } from "../../store/slices/heroesSlice";
import { yupValidation } from "./yupValidation";
import PreviewImg from "./previewImg";
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
    heroPhoto: null,
  };

  // const [fileName, setFileName] = useState("");

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
    let error;
    if (!file) {
    } else if (file.size > MAX_FILE_SIZE) {
      error = "File is too big";
    } else if (
      SUPPORTED_FORMATS.includes(file.type).test(
        "fileType",
        "Unsupported File Format",
        file
      )
    ) {
      error = "Invalif file format";
    }
    return error;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yupValidation}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className={styles.form} encType="multipart/form-data">
          <div className={styles.createSuperHero}>
            <h1> Create Super Hero</h1>
            <div className={styles.textField}>
              <label htmlFor="nickname"></label>
              <Field
                styles="textField"
                type="text"
                name="nickname"
                placeholder="Nickname"
                className="form-control"
              ></Field>
              <ErrorMessage
                name="nickname"
                render={(msg) => (
                  <div className={styles.errorMessage}> {msg} </div>
                )}
              />
            </div>
            <div className={styles.textField}>
              <label>
                <Field
                  type="text"
                  name="realName"
                  placeholder="Real Name"
                  className="form-control"
                ></Field>
                <ErrorMessage
                  name="realName"
                  render={(msg) => (
                    <div className={styles.errorMessage}> {msg} </div>
                  )}
                />
              </label>
            </div>
            <div className={styles.textField}>
              <label>
                <Field
                  type="text"
                  name="originDescription"
                  placeholder="Origin Description"
                  className="form-control"
                ></Field>
                <ErrorMessage
                  name="originDescription"
                  render={(msg) => (
                    <div className={styles.errorMessage}> {msg} </div>
                  )}
                />
              </label>
            </div>
            <div className={styles.textField}>
              <label>
                <Field
                  type="text"
                  name="catchPhrase"
                  placeholder="Catch Phrase"
                  className="form-control"
                ></Field>
                <ErrorMessage
                  name="catchPhrase"
                  render={(msg) => (
                    <div className={styles.errorMessage}> {msg} </div>
                  )}
                />
              </label>
            </div>
            <div className={styles.checkField}>
              <label>
                <span>Is hero positive:</span>
                <Field type="checkbox" name="isGood"></Field>
              </label>
            </div>
            <div className={styles.photoField}>
              <label htmlFor="heroPhoto"> </label>
              <input
                id="innerButton"
                style={{ display: "none" }}
                type="file"
                name="heroPhoto"
                accept="image/*"
                onChange={(e) => {
                  formikProps.setFieldValue("heroPhoto", e.target.files[0]);
                  // setFileName(e.target.files[0].name);
                  return validateFile();
                }}
                className="form-control"
              />
              {formikProps.values.heroPhoto && (
                <PreviewImg file={formikProps.values.heroPhoto} />
              )}
              <div className={styles.selectedFile}>
                {/* <span> {fileName} </span> */}
              </div>
              <button
                className={styles.selectFileButton}
                type="button"
                onClick={(e) => {
                  document.getElementById("innerButton").click();
                }}
              >
                Select Hero Photo
              </button>
              <ErrorMessage
                name="heroPhoto"
                render={(msg) => (
                  <div className={styles.errorMessage}> {msg} </div>
                )}
              />
            </div>
            <button className={styles.submitButton} type="submit">
              Create
            </button>
          </div>
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
