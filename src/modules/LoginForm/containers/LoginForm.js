import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm.jsx'
import { Formik } from 'formik';
import validateFunc from '../../../utils/validate'
import { withRouter } from "react-router-dom";
import { userActions } from '../../../redux/actions'

const FormikLogin = ({fetchUserLogin, history}) => (
  <div>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate = {values => {
        const errors = {}
        validateFunc({ isAuth: true, values, errors  })
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        fetchUserLogin(values).then(status => {
          
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
      {LoginForm}
    </Formik>
  </div>
);

export default connect(state => state, userActions)(withRouter(FormikLogin))