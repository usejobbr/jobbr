import React from 'react'
import { withRouter } from 'react-router-dom'
import { AUTH_TOKEN } from '../constant'
import LoginPage from './LoginPage'

class LogoutPage extends React.Component {
  componentDidMount() {
    this.props.refreshToken &&
      this.props.refreshToken({
        [AUTH_TOKEN]: null,
      })
  }

  render() {
    return (
      <div>
        <h1>
          You are currently logged out. To continue using Jobbr, please login.
        </h1>
        <LoginPage refreshToken={this.props.refreshToken} />
      </div>
    )
  }
}

export default withRouter(LogoutPage)
