import React from 'react'
import { Link } from "react-router-dom"
import { Form } from 'antd'
import Button from '../../../components/Button'
import FormField from '../../../components/FormField'
import Block from '../../../components/Block'

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 25,
  }
};

const RegistrationForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setTouched
}) => {
  const onFinish = () => {
    handleSubmit()
  }
  return (
    
    <React.Fragment>
    <div className = "auth__top">
      <h2>Зарегистрируйтесь</h2>
      <p>Для входа в чат, нужно зарегистрироваться</p>
    </div>
    <Block>   
      <Form {...layout} onFinish={onFinish}>
        <FormField 
          name="email" 
          placeholder="E-mail" 
          touched={touched} 
          errors={errors} 
          handleChange={handleChange} 
          handleBlur={handleBlur} 
          defaultValue={values.email}
        />
        <FormField 
          name="name" 
          placeholder="Ваше имя"
          touched={touched} 
          errors={errors} 
          handleChange={handleChange} 
          handleBlur={handleBlur} 
          defaultValue={values.name}
        />
        <FormField 
          type="password" 
          name="password" 
          placeholder="Пароль" 
          touched={touched} 
          errors={errors} 
          handleChange={handleChange} 
          handleBlur={handleBlur} 
          defaultValue={values.password}
        />
        <FormField 
          type="password" 
          name="repeatPassword" 
          placeholder="Повторите пароль" 
          touched={touched} 
          errors={errors} 
          handleChange={handleChange} 
          handleBlur={handleBlur} 
          defaultValue={values.repeatPassword}
        />
        <Form.Item>
        <Button onClick = {() => {
          setTouched({email: true, name: true, password: true, repeatPassword: true})
        }} size="large" type="primary" htmlType="submit">Зарегистрироваться</Button>
        </Form.Item>
      </Form>
      <Link className="auth__register-link" to="/login">Войти в аккаунт</Link>
    </Block>
    </React.Fragment>
  )
}

export default RegistrationForm