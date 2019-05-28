import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from '../Icon'
import { withRouter, Link } from 'react-router-dom'
import { IconButton } from '../Button'

import logo from '../../assets/images/logo.svg'

const NavWrap = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.collapsed ? 96 : 240)}px;
  transition: 250ms;
  z-index: 200;
`
const NavToggle = styled(IconButton).attrs({ name: 'menu' })`
  position: absolute;
  top: 12px;
  left: calc(100% + 20px);
  z-index: 198;
  border: 0;
  background-color: transparent;
  padding: 0;
  outline: 0;
  color: white;
  opacity: 1;
`
const Nav = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${props => (props.collapsed ? 96 : 240)}px;
  background-color: #ffffff;
  overflow: hidden;
  margin-left: ${props => (props.active ? 0 : '-240px')};
  transition: 250ms;
  padding: 12px 0;
`
const LogoWrap = styled.div`
  width: 100%;
  padding: 8px 24px;
  opacity: ${props => (props.collapsed ? 0 : 1)};
  transition: ${props => (props.collapsed ? 100 : 250)}ms
    ${props => (props.collapsed ? 0 : 100)}ms;
`
const NavItems = styled.ul`
  width: 240px;
  padding: 12px 0;
  margin: 0;
  list-style: none;
  position: relative;
  margin-top: ${props => (props.collapsed ? -16 : 0)}px;
  transition: 250ms;
`
const NavItem = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`
const NavItemLink = styled(Link)`
  display: flex;
  height: 48px;
  align-items: center;
  text-decoration: none;
`
const NavItemIconWrap = styled.div`
  padding: 0 ${props => (props.collapsed ? 28 : 20)}px;
  color: white;
  opacity: 0.5;
  transition: opacity 200ms, padding 250ms;
  ${NavItem}.active &, ${NavItem}:hover &, ${NavItemLink}.active &, ${NavItemLink}:hover & {
    opacity: 1;
  }
`
const NavItemLabel = styled.div`
  flex: 1;
  opacity: ${props => (props.collapsed ? 0 : 0.75)};
  font-family: museo-sans, sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
  text-align: left;
  transition: 200ms;
  ${NavItem}.active &, ${NavItem}:hover &, ${NavItemLink}.active &, ${NavItemLink}:hover & {
    opacity: ${props => (props.collapsed ? 0 : 1)};
  }
`
const ActiveItemIndicator = styled.div`
  width: 3px;
  height: ${props => (props.height ? props.height : 0)}px;
  position: absolute;
  top: ${props => (props.position ? props.position : 0)}px;
  left: 0;
  background-color: #0095ff;
  transition: 200ms;
`
const SubItemsList = styled.ul`
  list-style: none;
  padding: 0;
  ${props => !props.open && `display: none;`}
`
const SubItem = styled.div`
  font-family: museo-sans, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #cccccc;
  padding: 8px 8px 8px 64px;
`
const SubItemLink = styled(Link)`
  font-family: museo-sans, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #cccccc;
  padding: 8px 8px 8px 64px;
`

const Menu = styled.div`
  background: #1a2025;
  height: 100vh;
  position: absolute;
  left: 100%;
  z-index: 199;
  overflow: hidden;
`
const MenuInside = styled.div`
  padding: 24px;
  width: max-content;
  display: flex;
  flex-direction: column;
  height: 100%;
`
const MenuLabel = styled.h3`
  font-family: museo-sans, sans-serif;
  font-size: 24px;
  font-weight: normal;
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 24px;
`
const MenuCategories = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`
const MenuCategory = styled.div`
  padding: 24px;
`
const MenuCategoryLabel = styled.h4`
  opacity: 0.6;
  font-family: museo-sans, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 0.92px;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 12px;
`
const MenuItems = styled.div``
const MenuItem = styled.div``
const MenuItemLink = styled(Link)`
  display: block;
  opacity: 0.85;
  font-family: museo-sans, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  padding: 8px 0;
`

const navData = [
  {
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    route: '/',
  },
  {
    id: 'browse',
    icon: 'book-open-page',
    label: 'Browse',
    route: '/browse',
    items: [
      {
        id: 'jobs',
        label: 'Jobs',
        route: '/jobs',
      },
      {
        id: 'people',
        label: 'People',
        route: '/people',
      },
      {
        id: 'companies',
        label: 'Companies',
        route: '/companies',
      },
    ],
  },
  {
    id: 'profile',
    icon: 'contacts',
    label: 'Profile',
    route: '/profile',
  },
  {
    id: 'community',
    icon: 'calendar',
    label: 'Community',
    route: '/community',
  },
  {
    id: 'messages',
    icon: 'clipboard-check',
    label: 'Messages',
    route: '/messages',
  },
  {
    id: 'statistics',
    icon: 'gift',
    label: 'Statistics',
    route: '/statistics',
  },
  {
    id: 'organize',
    icon: 'account-search',
    label: 'Organize',
    route: '/organize',
  },
]

const Item = ({
  id,
  icon,
  label,
  route,
  itemRef,
  active,
  collapsed,
  items,
  setFocusedItemId,
  focusedItemId,
  setMenu,
}) => {
  const NavItemComponent = items ? NavItem : NavItemLink

  return (
    <li ref={itemRef}>
      <NavItemComponent
        to={!items ? route : null}
        as={items && 'div'}
        items={items}
        onClick={() => setFocusedItemId(items ? id : null)}
        className={active && 'active'}
      >
        <NavItemIconWrap collapsed={collapsed}>
          <Icon name={icon} />
        </NavItemIconWrap>
        <NavItemLabel collapsed={collapsed}>{label}</NavItemLabel>
      </NavItemComponent>
      {items && (
        <SubItemsList open={focusedItemId === id}>
          {items.map(subItem => {
            const SubItemComponent = subItem.menu ? SubItem : SubItemLink

            return (
              <li key={subItem.id}>
                <SubItemComponent
                  to={!subItem.menu ? subItem.route : null}
                  onClick={e => {
                    if (subItem.menu) {
                      e.preventDefault()
                      setMenu(subItem.menu)
                    }
                  }}
                >
                  {subItem.label}
                </SubItemComponent>
              </li>
            )
          })}
        </SubItemsList>
      )}
    </li>
  )
}

class Navigation extends React.Component {
  state = {
    mounted: false,
    collapsed: false,
    activeItemHeight: null,
    activeItemPosition: null,
    activeItem: null,
    focusedItemId: null,
  }

  navItemRefs = {}

  componentDidMount() {
    window.setTimeout(() => this.setState({ mounted: true }), 0)
    this.updateActiveItemIndicator()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.updateActiveItemIndicator()
    }
  }

  updateActiveItemIndicator = () => {
    const rootLocation = `/${
      this.props.location.pathname !== '/'
        ? this.props.location.pathname.split('/')[1]
        : ''
    }`
    const activeItem = navData.filter(item => item.route === rootLocation)[0]

    if (activeItem) {
      const activeItemEl = this.navItemRefs[`item_${activeItem.id}`]

      this.setState({
        activeItem,
        activeItemHeight: activeItemEl.offsetHeight,
        activeItemPosition: activeItemEl.offsetTop,
      })
    }
  }

  setMenu = menu => {
    this.setState({ menu }, () => console.log({ menu }))
  }

  render() {
    const { onChange } = this.props
    const {
      collapsed,
      mounted = false,
      activeItem,
      activeItemHeight,
      activeItemPosition,
      focusedItemId,
      menu,
    } = this.state

    return (
      <NavWrap active={mounted} collapsed={collapsed}>
        <Nav active={mounted} collapsed={collapsed}>
          <LogoWrap collapsed={collapsed}>
            <img src={logo} className="App-logo" alt="logo" />
          </LogoWrap>
          <NavItems collapsed={collapsed}>
            {navData.map(item => (
              <Item
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                route={item.route}
                active={activeItem && item.id === activeItem.id}
                collapsed={collapsed}
                items={item.items}
                itemRef={el => {
                  this.navItemRefs[`item_${item.id}`] = el
                }}
                setFocusedItemId={focusedItemId =>
                  this.setState({ focusedItemId, menu: null })
                }
                focusedItemId={focusedItemId}
                setMenu={this.setMenu}
              />
            ))}
            <ActiveItemIndicator
              height={activeItemHeight}
              position={activeItemPosition}
            />
          </NavItems>
        </Nav>
        {menu && (
          <Menu>
            <MenuInside>
              <MenuLabel>{menu.label}</MenuLabel>
              <MenuCategories>
                {menu.categories.map(cat => (
                  <MenuCategory key={cat.id}>
                    <MenuCategoryLabel>{cat.label}</MenuCategoryLabel>
                    {cat.items.map(catItem => (
                      <MenuItems key={catItem.id}>
                        <MenuItem>
                          <MenuItemLink to={catItem.route}>
                            {catItem.label}
                          </MenuItemLink>
                        </MenuItem>
                      </MenuItems>
                    ))}
                  </MenuCategory>
                ))}
              </MenuCategories>
            </MenuInside>
          </Menu>
        )}
        <NavToggle
          onClick={() =>
            this.setState({ collapsed: !collapsed }, () =>
              onChange(this.state.collapsed),
            )
          }
        />
      </NavWrap>
    )
  }
}

Navigation.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  style: PropTypes.object,
  theme: PropTypes.object,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
}

Navigation.defaultProps = { timeout: 200 }

export default withRouter(Navigation)
