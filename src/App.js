import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom'
import styled from 'styled-components'

import { Button } from './components/Button'
import Navigation from './components/Navigation'
import Toolbar from './components/Toolbar'
import UserMenu from './components/UserMenu'
import { ToastContainer } from './components/Toast'
import { AUTH_TOKEN } from './constant'
import { isTokenExpired } from './helper/jwtHelper'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import AppRoutes from './routes'

const AppWrap = styled.div`
  padding-top: ${props => (props.isLoggedIn ? 64 : 0)}px;
  margin-left: ${props =>
    props.isLoggedIn ? (props.collapsed ? 96 : 240) : 0}px;
  position: relative;
  transition: 250ms;
`
const LoginLink = styled(Link)`
  position: fixed;
  top: 16px;
  right: 48px;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.refreshToken = this.refreshToken.bind(this)

    this.state = {
      token: props.token,
      navCollapsed: false,
    }
  }

  refreshToken(data = {}) {
    const token = data[AUTH_TOKEN]

    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN)
    }

    this.setState({ token: data[AUTH_TOKEN] })
  }

  bootStrapData() {
    try {
      const token = localStorage.getItem(AUTH_TOKEN)
      if (token !== null && token !== undefined) {
        const expired = isTokenExpired(token)
        if (!expired) {
          this.setState({ token: token })
        } else {
          localStorage.removeItem(AUTH_TOKEN)
          this.setState({ token: null })
        }
      }
    } catch (e) {
      console.log('')
    }
  }

  //verify localStorage check
  componentDidMount() {
    this.bootStrapData()
  }

  render() {
    const { navCollapsed, token } = this.state

    return (
      <Router>
        <Query query={ME_QUERY} errorPolicy="all">
          {({ data }) => (
            <Fragment>
              <AppWrap isLoggedIn={!!token} collapsed={navCollapsed}>
                {token && (
                  <Navigation
                    isLoggedIn={!!token}
                    me={data && data.me}
                    onChange={navCollapsed => this.setState({ navCollapsed })}
                  />
                )}
                {token && <Toolbar title="Test" />}
                <AppRoutes
                  isLoggedIn={!!token}
                  me={data && data.me}
                  token={token}
                  refreshToken={this.refreshToken}
                />
                {token && data && data.me && (
                  <UserMenu isLoggedIn={!!token} me={data.me} />
                )}
                {!token && (
                  <LoginLink to="/login">
                    <Button size="sm">Login</Button>
                  </LoginLink>
                )}
                <ToastContainer />
              </AppWrap>
            </Fragment>
          )}
        </Query>
      </Router>
    )
  }
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
    }
  }
`

export default App
