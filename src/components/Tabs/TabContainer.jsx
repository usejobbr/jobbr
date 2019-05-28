import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { queryStringToJSON } from '../../utils/helpers'

const StyledTabs = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`
const StyledTab = styled.div`
  font-family: 'Proxima Nova' sans-serif;
  text-align: center;
  margin: 0 16px 0 16px;
  vertical-align: middle;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0px;
  outline: none;
  color: #22282e;
  transition: 200ms;
  box-shadow: inset 0 0 0 transparent;
`
const StyledLabel = styled.div`
  min-width: 50px;
  white-space: nowrap;
`
const ActiveTabIndicator = styled.div`
  height: 3px;
  width: ${props => (props.width ? props.width : 0)}px;
  position: absolute;
  left: ${props => (props.position ? props.position : 0)}px;
  bottom: 0;
  background-color: #0095ff;
  transition: 200ms;
`

class TabContainer extends Component {
  state = {
    activeTabWidth: null,
    activeTabPosition: null,
  }

  tabRefs = {}

  componentDidMount() {
    const { tabs, useRouter, location, value } = this.props

    if (
      useRouter &&
      location.query &&
      location.query.tab &&
      tabs.filter(tab => tab.value === location.query.tab).length
    ) {
      this.props.onChange(location.query.tab)
    } else if (value) {
      this.handleTabChange(value)
    } else {
      this.handleTabChange(tabs && tabs[0] && tabs[0].value)
    }
  }

  componentDidUpdate() {
    const { location, useRouter, value } = this.props

    if (
      useRouter &&
      location.query &&
      location.query.tab &&
      location.query.tab !== value
    )
      this.handleTabChange(value)
  }

  handleTabChange = value => {
    this.moveActiveTabIndicator(value)
    if (this.props.useRouter) {
      const { pathname, search } = this.props.location
      const query = queryStringToJSON(search)

      if (value !== query.tab && this.props.tabs.length > 1) {
        let search = '?'

        // search += Object.keys(query).reduce((acc, current) => {
        //   if (current !== 'tab') {
        //     acc += `${current}=${query[current]}&`
        //   }
        //   return acc
        // }, '')

        search += `tab=${value}`

        this.props.history.replace({ pathname, search })
        this.props.onChange(value)
      }
    } else {
      this.props.onChange(value)
    }
  }

  moveActiveTabIndicator = value => {
    const activeTab = this.tabRefs[`tab_${value}`]

    this.setState({
      activeTabWidth: activeTab.offsetWidth,
      activeTabPosition: activeTab.offsetLeft,
    })
  }

  handleKeyDown = (value, event) =>
    (event.keyCode === 13 || event.keyCode === 32) &&
    this.handleTabChange(value)

  render() {
    const { activeTabWidth, activeTabPosition } = this.state
    const { tabs, value } = this.props

    return tabs && tabs.length > 1 ? (
      <StyledTabs>
        {tabs.map(
          (tab, i) =>
            !tab.omit && (
              <StyledTab
                data-qa={`tab-${tab.value}`}
                active={tab.value === value}
                key={`tab-${tab.value}-${i}`}
                onClick={() => this.handleTabChange(tab.value)}
                onKeyDown={event => this.handleKeyDown(tab.value, event)}
                ref={el => {
                  this.tabRefs[`tab_${tab.value}`] = el
                }}
                tabIndex="0"
              >
                <StyledLabel>{tab.label}</StyledLabel>
              </StyledTab>
            ),
        )}
        <ActiveTabIndicator
          width={activeTabWidth}
          position={activeTabPosition}
        />
      </StyledTabs>
    ) : null
  }
}

TabContainer.propTypes = {
  tabs: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default withRouter(TabContainer)
