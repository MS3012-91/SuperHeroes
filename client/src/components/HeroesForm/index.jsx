import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { creayeHeroThunk } from "../../store/slices/heroesSlice";

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

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form encType="multipart/form-data">
          <label>
            <span>Nickname:</span>
            <Field
              type="text"
              name="nickname"
              placeholder="Nickname"
            ></Field>
          </label>
          <label >
            <span>Real Name:</span>
            <Field type="text" name="realName" placeholder="Real Name"></Field>
          </label>
          <label>
            <span>Origin Description:</span>
            <Field
              type="text"
              name="originDescription"
              placeholder="OriginDescription"
            ></Field>
          </label>
          <label>
            <span>Catch Phrase:</span>
            <Field
              type="text"
              name="catchPhrase"
              placeholder="Catch Phrase"
            ></Field>
          </label>
          <label>
            <Field type="checkbox" name="isGood"></Field>
            <span>Is hero positive:</span>
          </label>
          <label>
            <span>Hero photo:</span>
            <input
              type="file"
              name="heroPhoto"
              accept="image/*"
              onChange={(e) => {
                formikProps.setFieldValue("heroPhoto", e.target.files[0]);
              }}
            />
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
