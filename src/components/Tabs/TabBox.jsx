import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Box = styled.div`
  /* padding: 0 80px; */
  position: relative;
`

export default class TabBox extends Component {
  render() {
    const { tabs, value } = this.props
    const tab =
      tabs.length > 1
        ? tabs.filter((tab, i) =>
            tab.props.value ? tab.props.value === value : 'tab' + i === value,
          )[0]
        : tabs[0]

    return <Box>{tab && tab.props.children}</Box>
  }
}

TabBox.propTypes = {
  tabs: PropTypes.array,
  value: PropTypes.string,
  preload: PropTypes.bool,
}
