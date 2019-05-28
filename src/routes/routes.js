import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Dashboard from './dashboard'
import Landing from './landing'
import FeedPage from './FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import PageNotFound from './PageNotFound'
import LogoutPage from './LogoutPage'

const ProtectedRoute = ({ component: Component, token, ...rest }) => {
  return token ? (
    <Route {...rest} render={matchProps => <Component {...matchProps} />} />
  ) : (
    <Redirect to="/login" />
  )
}

class AppRoutes extends React.Component {
  render() {
    const { token, refreshToken } = this.props

    return (
      <Switch>
        <Route exact path="/" component={token ? FeedPage : Landing} />
        <ProtectedRoute token={token} path="/dev" exact component={Dashboard} />
        <ProtectedRoute token={token} path="/drafts" component={DraftsPage} />
        <ProtectedRoute token={token} path="/create" component={CreatePage} />
        <ProtectedRoute token={token} path="/post/:id" component={DetailPage} />
        <Route
          token={token}
          path="/login"
          render={props => <LoginPage refreshToken={refreshToken} />}
        />
        <Route
          token={token}
          path="/signup"
          render={props => <SignupPage refreshToken={refreshToken} />}
        />
        <Route
          path="/logout"
          render={props => <LogoutPage refreshToken={refreshToken} />}
        />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
}

export default AppRoutes
