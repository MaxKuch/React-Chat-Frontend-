import React from 'react';
import { Form, Input } from 'antd'
import validate from '../../utils/helpers/validateField'

const FormField = ({
  name,
  placeholder,
  type,
  handleChange,
  handleBlur,
  touched,
  errors,
  defaultValue
}) => {
  return (
    <Form.Item 
      help={touched[name] && errors[name]} 
      name={name}
      onChange={handleChange} 
      onBlur={handleBlur}
      validateStatus={validate(touched[name], errors[name])} 
      hasFeedback 
      defaultValue = {defaultValue}
      >
        {type === "password" ? <Input.Password size="large" placeholder={placeholder}/> : <Input size="large" placeholder={placeholder}/>}
    </Form.Item>
  );
};

export default FormField;