import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TabContainer from './TabContainer'
import TabBox from './TabBox'

class Tabs extends Component {
  constructor(props) {
    super(props)
    const tabs = this.getTabs()
    const value = this.props.value || (tabs.length && tabs[0].value)

    this.state = { tabs, value }
  }

  componentDidUpdate(prevProps) {
    const { children, value } = this.props
    if (children && prevProps.value !== value) {
      this.setState({ value })
    }
  }

  getTabs = () => {
    const { children } = this.props
    const tabs = React.Children.map(children, (tab, i) => {
      if (tab && !tab.props.omit) {
        const { label, value, onChange } = tab.props

        return { label, value: value ? value : `tab${i}`, onChange }
      }
    })

    return tabs
  }

  onTabChange = value => this.setState({ value }, () => this.props.onChange && this.props.onChange(value))

  render() {
    const { children, preload, width, useRouter } = this.props
    const { value, tabs } = this.state

    return (
      <div data-qa="tabs">
        <TabContainer useRouter={useRouter} tabs={tabs} value={value} onChange={this.onTabChange} />
        <TabBox tabs={React.Children.toArray(children)} value={value} width={width} preload={preload} />
      </div>
    )
  }
}

Tabs.propTypes = {
  preload: PropTypes.bool
}

export default Tabs
