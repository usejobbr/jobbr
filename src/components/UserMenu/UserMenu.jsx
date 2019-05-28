import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import md5 from 'md5'

import Avatar from '../Avatar'
import Dialog from '../Dialog'
import Icon from '../Icon'

const MenuWrap = styled.div``
const AvatarWrap = styled.div`
  position: fixed;
  top: ${props => (props.open ? 112 : 16)}px;
  right: ${props => (props.open ? 92 : 20)}px;
  z-index: 801;
  transition: ${props =>
    props.open
      ? `top 250ms 0ms ease-out, right 200ms 50ms ease-out`
      : `top 250ms 0s ease-out, right 200ms 0s ease-out`};
`
const StyledAvatar = styled(Avatar)`
  border: ${props => (props.open ? 8 : 0)}px solid white;
  width: ${props => (props.open ? 80 : 32)}px;
  height: ${props => (props.open ? 80 : 32)}px;
  border-radius: ${props => (props.open ? 80 : 32)}px;
  transition: 200ms ease-in-out;
  transition-delay: ${props => (props.open ? 50 : 0)}ms;
`
const AvatarButton = styled.button`
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 0;
  outline: 0;
  cursor: pointer;
`

const MenuHeader = styled.div`
  background-color: #313642;
  height: 160px;
  background-image: url(https://mobile-cdn.lds.org/17/f8/17f8873768cf8e5aa2054762f56603aab3fd1175/draper_utah_temple.jpg);
  background-size: cover;
  background-position: center;
`

const MenuItems = styled.div`
  padding: 12px 0;
  margin: 18px 0;
  list-style: none;
  position: relative;
`
const MenuItem = styled(Link)`
  display: flex;
  height: 40px;
  align-items: center;
  text-decoration: none;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    background-color: #eff0f0;
  }
`
const MenuItemIconWrap = styled.div`
  padding: 0 20px;
  color: #313642;
  opacity: 0.65;
  transition: 200ms;
`
const MenuItemLabel = styled.div`
  flex: 1;
  font-family: museo-sans, sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #313642;
  letter-spacing: 0;
  text-align: left;
  transition: 200ms;
`
const UserInfo = styled.div`
  margin-top: 56px;
`
const UserTitle = styled.h3`
  color: #0095ff;
  font-family: museo-sans, sans-serif;
  line-height: 1em;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  margin: 0 0 4px 0;
`
const UserDescription = styled.div`
  font-family: museo-sans, sans-serif;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  color: #4a5055;
`

const Hr = styled.hr`
  border: 0;
  display: block;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
`

const userMenuData = [
  {
    id: 'my-profile',
    icon: 'account-circle',
    label: 'My Profile',
    route: '/profile',
  }
]

const userActionData = [
  {
    id: 'sign-out',
    icon: 'key',
    label: 'Sign out',
    route: '/logout',
  },
]

const Item = ({ icon, label, route, itemRef, active }) => (
  <li ref={itemRef}>
    <MenuItem to={route} className={active && 'active'}>
      <MenuItemIconWrap>
        <Icon name={icon} />
      </MenuItemIconWrap>
      <MenuItemLabel>{label}</MenuItemLabel>
    </MenuItem>
  </li>
)

class UserMenu extends React.Component {
  state = {
    showMenu: false,
  }

  showMenu = () => this.setState({ showMenu: true })
  closeMenu = () => this.setState({ showMenu: false })

  render() {
    const { me } = this.props
    const { showMenu } = this.state
    console.log(me)
    return (
      <MenuWrap>
        <AvatarWrap open={showMenu}>
          <AvatarButton onClick={this.showMenu}>
            <StyledAvatar
              open={showMenu}
              src={`https://www.gravatar.com/avatar/${md5(me.email)}`}
            />
          </AvatarButton>
        </AvatarWrap>
        <Dialog
          width={'240px'}
          position={{ x: 'right', y: 'stretch' }}
          zIndex={800}
          hideCloseButton
          noPadding
          open={showMenu}
          onClose={this.closeMenu}
        >
          <MenuHeader open={showMenu} />
          <UserInfo>
            <UserTitle>{me.name}</UserTitle>
            <UserDescription>{me.email}</UserDescription>
          </UserInfo>
          <MenuItems>
            {userMenuData.map(item => (
              <Item
                key={item.id}
                icon={item.icon}
                label={item.label}
                route={item.route}
                onClick={this.closeMenu}
              />
            ))}
            <Hr />
            {userActionData.map(item => (
              <Item
                key={item.id}
                icon={item.icon}
                label={item.label}
                route={item.route}
                onClick={this.closeMenu}
              />
            ))}
          </MenuItems>
        </Dialog>
      </MenuWrap>
    )
  }
}

export default UserMenu
