import React from 'react'
import './Auth.scss'
import { FormLogin, RegistrationForm } from '../../modules'
import { Route, Switch } from 'react-router-dom'


const Auth = () => 
  (
    <div className = "auth">
      <div className = "auth__wrapper">
        <Switch>
          <Route exact path={['/', '/login']} component={FormLogin}/>
          <Route exact path='/register' component={RegistrationForm}/>
        </Switch>
      </div>
    </div>
  )

export default Auth