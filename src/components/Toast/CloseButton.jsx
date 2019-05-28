import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { IconButton } from '../Button'

const CloseBtn = styled(IconButton).attrs({ name: 'close' })`
  align-self: flex-start;
`

function CloseButton({ closeToast, type, ariaLabel }) {
  return (
    <CloseBtn
      className={`Toastify__close-button Toastify__close-button--${type}`}
      type="button"
      onClick={e => {
        e.stopPropagation()
        closeToast()
      }}
      aria-label={ariaLabel}
    />
  )
}

CloseButton.propTypes = {
  closeToast: PropTypes.func,
  arialLabel: PropTypes.string
}

CloseButton.defaultProps = {
  ariaLabel: 'close'
}

export default CloseButton
