import styled from 'styled-components'
import Button from './Button'

const ButtonGroup = styled.div`
  margin: -4px;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  & ${Button} {
    margin: 4px;
  }
`

export default ButtonGroup
