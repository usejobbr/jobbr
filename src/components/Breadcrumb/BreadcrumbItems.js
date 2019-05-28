import React from 'react'
import styled from 'styled-components'

const _sharedStyles = `
  text-transform: uppercase;
  padding:        0 3px;
`
const Link = styled.div`
  ${({ theme }) => theme.fontSize(400)};
  ${_sharedStyles};
`
const Label = styled.div`
  ${({ theme }) => theme.fontSize(400)};
  ${_sharedStyles};
`

const BreadcrumbItems = ({ items }) =>
  items.length
    ? items.reduce((acc, item, i, array) => {
        let val = [...acc]
        if (item.link) {
          val = [
            ...val,
            <Link route={item.link} key={`link-${i}`}>
              {item.label}
            </Link>,
          ]
        } else {
          val = [...val, <Label key={`label-${i}`}>{item.label}</Label>]
        }
        if (i < array.length - 1) {
          val = [...val, <Label key={`divider-${i}`}>/</Label>]
        }
        return val
      }, [])
    : []

export default BreadcrumbItems
