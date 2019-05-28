import React from 'react'
import styled from 'styled-components'

const ToolbarWrap = styled.div`
  height: 64px;
  background-color: #0095ff;
  padding: 8px 72px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`
const Title = styled.h2`
  font-size: 18px;
  color: #ffffff;
  flex: 1;
`

const Toolbar = ({ title }) => (
  <ToolbarWrap>
    <Title>{title}</Title>
  </ToolbarWrap>
)

export default Toolbar
