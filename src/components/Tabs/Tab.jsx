import { Component } from 'react'
import PropTypes from 'prop-types'

class Tab extends Component {}

Tab.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  omit: PropTypes.bool,
  preload: PropTypes.bool,
  width: PropTypes.string,
}

export default Tab
