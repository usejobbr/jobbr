import React from 'react'
import PropTypes from 'prop-types'
import Fade from '../Fade'

const styles = {
  root: {
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(26, 32, 37, 0.25)',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'none'
  },
  invisible: {
    backgroundColor: 'transparent'
  }
}

function Backdrop(props) {
  const { invisible, open, transitionDuration, onClick, ...other } = props
  const style = {
    ...styles.root,
    ...(invisible && styles.invisible)
  }
  return (
    <Fade in={open} timeout={transitionDuration} {...other}>
      <div style={style} onClick={onClick} aria-hidden="true" />
    </Fade>
  )
}

Backdrop.propTypes = {
  invisible: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number })
  ])
}

Backdrop.defaultProps = {
  invisible: false
}

export default Backdrop
