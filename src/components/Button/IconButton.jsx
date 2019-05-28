import React from 'react'
import styled from 'styled-components'
import Icon from '../Icon'

export const IconBtn = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 0;
  outline: 0;
  border-radius: 40px;
  cursor: pointer;
  transition: 200ms;
  opacity: 0.65;
  &:hover {
    opacity: 1;
  }
  &:active {
    background: rgba(0, 0, 0, 0.15);
  }

  & * {
    pointer-events: none;
  }
`

const IconButton = ({ name, ...other }) => (
  <IconBtn {...other}>
    <Icon name={name} />
  </IconBtn>
)

export default IconButton
