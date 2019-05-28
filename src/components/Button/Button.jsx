import styled from 'styled-components'

const Button = styled.button`
  font-family: museo-sans, sans-serif;
  font-size: ${props => {
    if (props.size === 'sm') return 14
    if (props.size === 'lg') return 18
    return 16
  }}px;
  font-weight: 700;
  text-align: center;
  border-radius: 128px;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: ${props => {
    if (props.size === 'sm') return '8px 16px'
    if (props.size === 'lg') return '16px 28px'
    return '12px 24px'
  }};
  transition: 200ms;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15);
  background-color: ${props => {
    if (props.primary) {
      if (props.type === 'success') return '#2D9F43'
      if (props.type === 'warning') return '#FFB81C'
      if (props.type === 'error') return '#CC1B1B'
      return '#0095FF'
    } else {
      if (props.type === 'success') return '#E5F6E8'
      if (props.type === 'info') return '#D4ECF0'
      if (props.type === 'warning') return '#FEF3E2'
      if (props.type === 'error') return '#F9E8E8'
      return '#EAEAEA'
    }
  }};
  color: ${props => {
    if (props.primary) {
      return '#FFFFFF'
    } else {
      if (props.type === 'success') return '#235C35'
      if (props.type === 'info') return '#006184'
      if (props.type === 'warning') return '#D07A00'
      if (props.type === 'error') return '#B80A0A'
      return '#22282E'
    }
  }};
  &:hover {
    background-color: ${props => {
      if (props.primary) {
        if (props.type === 'success') return '#38B350'
        if (props.type === 'warning') return '#FFC139'
        if (props.type === 'error') return '#DD2929'
        return '#00C6E3'
      } else {
        if (props.type === 'success') return '#EDFBF0'
        if (props.type === 'info') return '#E0F2F5'
        if (props.type === 'warning') return '#FFF8ED'
        if (props.type === 'error') return '#FEEEEE'
        return '#F2F2F2'
      }
    }};

    // background-color: ${props => (props.primary ? '#00C6E3' : '#F2F2F2')};
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05);
  }
  &:focus {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.25);
  }
  &:focus:hover {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.25);
    background-color: ${props => {
      if (props.primary) {
        if (props.type === 'success') return '#287E3C'
        if (props.type === 'warning') return '#E8990E'
        if (props.type === 'error') return '#AF1212'
        return '#008DAF'
      } else {
        if (props.type === 'success') return '#C5F1CE'
        if (props.type === 'info') return '#BDE7EE'
        if (props.type === 'warning') return '#FFEACB'
        if (props.type === 'error') return '#FAD7D7'
        return '#DDDDDD'
      }
    }};
  }
  &:active,
  &:active:focus {
    background-color: ${props => {
      if (props.primary) {
        if (props.type === 'success') return '#287E3C'
        if (props.type === 'warning') return '#E8990E'
        if (props.type === 'error') return '#AF1212'
        return '#008DAF'
      } else {
        if (props.type === 'success') return '#C5F1CE'
        if (props.type === 'info') return '#BDE7EE'
        if (props.type === 'warning') return '#FFEACB'
        if (props.type === 'error') return '#FAD7D7'
        return '#DDDDDD'
      }
    }};
  }
`

export default Button
