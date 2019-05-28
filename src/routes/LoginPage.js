import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'
import { AUTH_TOKEN } from '../constant'

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            this._login()
          }}
        >
          <h3>
            Don't have an account? <a href="/signup">Signup</a>
          </h3>
          <input
            autoFocus
            placeholder="Email"
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
          <button
            onClick={this._login}
            disabled={!this.state.email || !this.state.password}
          >
            Log in
          </button>
        </form>
      </div>
    )
  }

  _login = async e => {
    const { email, password } = this.state
    this.props
      .loginMutation({
        variables: {
          email,
          password,
        },
      })
      .then(result => {
        const token = result.data.login.token

        this.props.refreshToken &&
          this.props.refreshToken({
            [AUTH_TOKEN]: token,
          })
        this.props.history.replace('/')
      })
      .catch(err => {
        console.log('error')
      })
  }
}

const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

export default graphql(LOGIN_USER_MUTATION, { name: 'loginMutation' })(
  withRouter(LoginPage),
)
