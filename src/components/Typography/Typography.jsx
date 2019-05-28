import styled from 'styled-components'

const H1 = styled.h1`
  font-family: 'Adobe Garamond Pro', serif;
  font-size: 32px;
  font-weight: 400;
  color: #007fa4;
  margin: 0;
  margin-bottom: ${props => (props.noMargin ? 0 : 24)}px;
`
const H2 = styled.h2`
  font-family: museo-sans, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #22282e;
  margin: 0;
  margin-bottom: ${props => (props.noMargin ? 0 : 20)}px;
`
const H3 = styled.h3`
  font-family: museo-sans, sans-serif;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
  margin-bottom: ${props => (props.noMargin ? 0 : 16)}px;
`

export { H1, H2, H3 }
