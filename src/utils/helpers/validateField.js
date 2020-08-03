const validate = (touched, errors) => touched ? errors && touched ? 'error' : 'success' : ''

export default validate