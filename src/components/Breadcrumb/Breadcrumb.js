import React from 'react'
import styled from 'styled-components'

import BreadcrumbItems from './BreadcrumbItems'

let BreadcrumbWrapper = styled.div`
  display: flex;
  margin: 0 0 0 -3px;
`

class Breadcrumb extends React.Component {
  render() {
    const { breadcrumb } = this.props

    if (!breadcrumb) return null

    return (
      <BreadcrumbWrapper>
        <BreadcrumbItems items={breadcrumb.items} />
      </BreadcrumbWrapper>
    )
  }
}

export default Breadcrumb
