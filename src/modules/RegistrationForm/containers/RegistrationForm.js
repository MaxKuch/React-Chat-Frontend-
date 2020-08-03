import React from 'react'
import { connect } from 'react-redux'
import RegistrationForm from '../components/RegistrationForm.jsx'
import { Formik } from 'formik';
import validateFunc from '../../../utils/validate'
import { userActions } from '../../../redux/actions'
import { withRouter } from 'react-router-dom'

const FormikRegistration = ({fetchUserRegistration, history}) => (
  <div>
    <Formik
      initialValues={{ email: '', name:'', password: '', repeatPassword: '' }}
      
      validate = {values => {
        const errors = {}
        validateFunc({ isAuth: false, values, errors })
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        fetchUserRegistration(values).then(status => {
          
          if(status === 'success'){
            history.push('/')
          }
          else{
            setSubmitting(false)
          }
          
        }).catch(err => {
          setSubmitting(false)
        })
      }}
    >
      {RegistrationForm}
    </Formik>
  </div>
);

export default connect(state => state, userActions)(withRouter(FormikRegistration))