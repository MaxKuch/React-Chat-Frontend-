import React from 'react'
import { Link } from "react-router-dom"
import { Form, Input } from 'antd'
import Button from '../../../components/Button'
import Block from '../../../components/Block'
import validate from '../../../utils/helpers/validateField'

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 25,
  },
};

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isValid
  }) => {

  const onFinish = () => {
    
    handleSubmit()
  }
  return (
    <React.Fragment>
      <div className = "auth__top">
        <h2>Войти в аккаунт</h2>
        <p>Пожалуйста, войдите в свой аккаунт</p>
      </div>
      <Block>   
        <Form {...layout} onFinish={onFinish}>
          <Form.Item 
            name="email"  
            help={touched.email && errors.email}
            onChange = {handleChange} 
            onBlur = {handleBlur}  
            validateStatus={validate(touched.email, errors.email)}
            hasFeedback 
            rules={[{required: true,message: 'Please input your E-Mail'}]}>
            <Input size="large" placeholder="E-Mail"/>
          </Form.Item>
          <Form.Item 
            name="password" 
            help={touched.password && errors.password}
            onChange = {handleChange} 
            onBlur = {handleBlur} 
            validateStatus={validate(touched.password, errors.password)}
            hasFeedback 
            rules={[{required: true,message: 'Please input your password'}]}>
            <Input.Password size="large" placeholder="Password"/>
          </Form.Item>
          <Form.Item>
          {isSubmitting && !isValid && <span>Ошибка!</span>}
          <Button 
            disabled={isSubmitting} 
            size="large" 
            type="primary" 
            htmlType="submit"
          >
            Войти в аккаунт
          </Button>
          </Form.Item>
        </Form>
        <Link className="auth__register-link" to="/register">Зарегистрироваться</Link>
      </Block>
    </React.Fragment>
  )
}

export default LoginForm