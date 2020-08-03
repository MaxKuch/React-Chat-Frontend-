import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { userActions } from './redux/actions'

function App({me, isAuth, token, fetchUserData}) {

  useEffect(() => {
    if(token && !me)
      fetchUserData(token)
  }, [me])
  
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path='/' render={() => isAuth ? <Redirect to="/im"/>  : <Redirect to="/login"/>}/> 
          <Route exact path={['/login', '/register']} render={() => isAuth ?  <Redirect to="/im"/> : <Auth/>}/>
          <Route exact path='/im' render={() => isAuth ? <Home/> : <Redirect to="/login"/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default connect(({ user: {isAuth, token, data} }) => ({isAuth, token, me: data}), userActions)(App);
