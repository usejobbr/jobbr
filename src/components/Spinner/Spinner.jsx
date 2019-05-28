import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledWrapper = styled.span`
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: ${({ size }) => size === 'large' && '3rem'};
`

const StyledSVG = styled.svg`
  width: 1em;
  height: 1em;
`

export default function Spinner({ size }) {
  return (
    <StyledWrapper size={size} aria-hidden="true">
      <StyledSVG viewBox="0 0 24 24">
        <path
          opacity="0.2"
          d="M20.5 11a9.5 9.5 0 1 0-19 0 9.5 9.5 0 0 0 19 0zM0 11C0 4.925 4.925 0 11 0s11 4.925 11 11-4.925 11-11 11S0 17.075 0 11z"
        />
        <path d="M3.121 16.307c-.314-.473-.743-.684-1.166-.329-.423.355-.36.784.012 1.297.68.94 1.123 1.422 2.03 2.211.375.326.845.591 1.268.236.423-.355.367-.857-.094-1.22-.982-.77-1.564-1.463-2.05-2.195z">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 11 11"
            to="360 11 11"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </path>
      </StyledSVG>
    </StyledWrapper>
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['font-size', 'large']),
  spinnerClassName: PropTypes.string,
}

Spinner.defaultProps = {
  size: 'font-size',
}
