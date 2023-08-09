import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { connect } from "react-redux";
import {creayeHeroThunk} from '../../store/slices/heroesSlice'

function HeroForm({createHero}) {
  const initialValues = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    isGood: true
  };
  const handleSubmit = (values, formikBag) => {
    createHero(values);
    formikBag.resetForm();
  }


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => <Form>
        <label>
          <span>Nickname:</span>
          <Field type="text" name="nickname" placeholder='Nickname'></Field>
        </label>
        <label>
          <span>Real Name:</span>
          <Field type="text" name="realName" placeholder='Real Name'></Field>
        </label>
        <label>
          <span>Origin Description:</span>
          <Field type="text" name="originDescription" placeholder='OriginDescription'></Field>
        </label>
        <label>
          <span>Catch Phrase:</span>
          <Field type="text" name="catchPhrase" placeholder='Catch Phrase'></Field>
        </label>
        <label>
          <Field type="checkbox" name="isGood"></Field>
          <span>Is hero positive:</span>
        </label>
        <button type='submit'>Create</button>
      </Form>}
    
    </Formik>
  )
}

const mapStateToProps = ({ heroData }) => heroData;
const mapDispatchToProps = (dispatch) => ({
  createHero: (data) => dispatch(creayeHeroThunk(data))
});
export default connect(mapStateToProps, mapDispatchToProps)( HeroForm)