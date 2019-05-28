import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Breadcrumb from '../Breadcrumb'
import { TabBox, TabContainer } from '../Tabs'
import { IconButton } from '../Button'
import Spinner from '../Spinner'

let PageMargin = styled.div``
let PageHeaderWrap = styled.div`
  background-color: #eff0f0;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  min-height: 64px;
  padding: 0 80px;
  justify-content: center;
  box-sizing: border-box;
`
let PageHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  flex: 1;
`
let TitleWrap = styled.div`
  align-items: baseline;
  display: flex;
  width: 100%;
`
let Title = styled.div`
  font-family: museo-sans, sans-serif;
  font-size: 24px;
  color: #4a5055;
  line-height: 1.4;
  min-width: max-content;
  margin-top: 4px;
`
let TitleAndBreadcrumbs = styled.div`
  flex: 1;
`
let ActionsWrap = styled.div`
  margin-right: -16px;
`
let TabsWrap = styled.div`
  margin: -16px -16px 0 -16px;
`
let SpinnerWrapper = styled.div`
  display: ${props => (props.showSpinner ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
`
let BreadcrumbWrap = styled.div`
  margin-top: 5px;
`
let ContentBox = styled.div`
  /* padding: 0 80px; */
  position: relative;
`

class Page extends React.Component {
  constructor(props) {
    super(props)
    const { tabs, value, onChange, useRouter } = this.getTabsProps()

    this.state = { tabs, value, onChange, useRouter }
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props

    if (
      children &&
      children.type &&
      (children.type.name === 'Tabs' || children.type.name === 'Tabs_Tabs') &&
      prevProps.children.props.value !== children.props.value
    ) {
      this.setState({ value: children.props.value })
    }
  }

  getTabsProps = () => {
    const { children } = this.props

    if (children && children.type && (children.type.name === 'Tabs' || children.type.name === 'Tabs_Tabs')) {
      const tabs = React.Children.map(children.props.children, (tab, i) => {
        if (!tab) return null

        const { label, value, omit } = tab.props

        return {
          label,
          value: value ? value : `tab${i}`,
          omit
        }
      }).filter(tab => !tab.omit)

      if (tabs.length === 0) return { tabs: null, value: null, onChange: null, useRouter: null }

      const useRouter = children.props.useRouter !== undefined ? children.props.useRouter : true
      const value = children.props.value

      return {
        tabs,
        value: value !== null && tabs.some(tab => tab.value === value) ? value : tabs[0].value,
        useRouter,
        onChange: children.props.onChange
      }
    }

    return { tabs: null, value: null, onChange: null, useRouter: null }
  }

  onTabChange = value =>
    value !== this.state.value && this.setState({ value }, () => this.state.onChange && this.state.onChange(value))

  hasBreadcrumb = breadcrumb => breadcrumb && breadcrumb.length > 0

  render() {
    const { breadcrumbs, children, loading, actions, title, width } = this.props
    const { value, tabs, useRouter } = this.state
    const childComponentName = React.Children.toArray(children)[0].type.name
    const hasTabs = children && (childComponentName === 'Tabs' || childComponentName === 'Tabs_Tabs')

    return (
      <PageMargin>
        <PageHeaderWrap>
          <PageHeader>
            <TitleAndBreadcrumbs>
              <BreadcrumbWrap>
                <Breadcrumb breadcrumb={breadcrumbs} />
              </BreadcrumbWrap>
              <TitleWrap>
                <Title>{title}</Title>
              </TitleWrap>
            </TitleAndBreadcrumbs>
            <ActionsWrap>
              {actions && actions}
              <>
                <IconButton name="magnify" onClick={() => {}} />
                <IconButton name="earth" onClick={() => {}} />
              </>
            </ActionsWrap>
          </PageHeader>
          {!loading && hasTabs && (
            <TabsWrap>
              <TabContainer useRouter={useRouter} tabs={tabs} value={value} onChange={value => this.onTabChange(value)} />
            </TabsWrap>
          )}
        </PageHeaderWrap>
        {!loading ? (
          hasTabs ? (
            <TabBox tabs={React.Children.toArray(children.props.children)} value={value} width={width} />
          ) : (
            <ContentBox>{children}</ContentBox>
          )
        ) : (
          <SpinnerWrapper showSpinner>
            <Spinner size="large" />
          </SpinnerWrapper>
        )}
      </PageMargin>
    )
  }
}

Page.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  breadcrumb: PropTypes.array,
  renderQuickSearch: PropTypes.func,
  loading: PropTypes.bool,
  width: PropTypes.string
}

export default Page
