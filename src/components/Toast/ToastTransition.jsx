import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'

class Slide extends React.Component {
  state = {
    elHeight: null,
  }

  componentDidMount() {
    if (this.props.el) this.setElHeight(this.props.el)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.el && this.props.el) this.setElHeight(this.props.el)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleEnter = node => {
    if (this.props.onEnter) this.props.onEnter(node)
  }

  handleExit = node => {
    if (this.props.onExit) this.props.onExit(node)
  }

  elHeight = null

  setElHeight = el =>
    this.setState(
      { elDimensions: el.getBoundingClientRect() },
      () => (this.elHeight = el.getBoundingClientRect().height),
    )

  render() {
    const {
      children,
      style: styleProp,
      timeout,
      direction,
      ...other
    } = this.props
    const styles = {
      default: {
        transform: `translateY(${(() => {
          if (this.props.direction === 'down') return `-100%`
          if (this.props.direction === 'up') return `100%`
          return 0
        })()}) translateX(${(() => {
          if (this.props.direction === 'right') return `-100%`
          if (this.props.direction === 'left') return `100%`
          return 0
        })()})`,
        height: 0,
        paddingBottom: 0,
        transition: `transform 200ms cubic-bezier(0.4, 0, 0.2, 1), height 200ms cubic-bezier(0.4, 0, 0.2, 1), padding-bottom 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms`,
      },
      entering: {
        transform: `translateY(${(() => {
          if (this.props.direction === 'down') return `-100%`
          if (this.props.direction === 'up') return `100%`
          return 0
        })()}) translateX(${(() => {
          if (this.props.direction === 'right') return `-100%`
          if (this.props.direction === 'left') return `100%`
          return 0
        })()})`,
        height: 0,
        paddingBottom: 0,
      },
      entered: {
        transform: `translateX(0) translateY(0)`,
        height: this.props.el && this.props.el.offsetHeight,
        paddingBottom: 8,
      },
      exiting: {
        transform: `translateY(${(() => {
          if (this.props.direction === 'down') return `-100%`
          if (this.props.direction === 'up') return `100%`
          return 0
        })()}) translateX(${(() => {
          if (this.props.direction === 'right') return `-100%`
          if (this.props.direction === 'left') return `100%`
          return 0
        })()})`,
        height: 0,
        paddingBottom: 0,
      },
      exited: {
        transform: `translateY(${(() => {
          if (this.props.direction === 'down') return `-100%`
          if (this.props.direction === 'up') return `100%`
          return 0
        })()}) translateX(${(() => {
          if (this.props.direction === 'right') return `-100%`
          if (this.props.direction === 'left') return `100%`
          return 0
        })()})`,
        height: 0,
        paddingBottom: 0,
      },
    }

    const style = {
      ...styleProp,
      ...styles.default,
      ...(React.isValidElement(children) ? children.props.style : {}),
    }

    return (
      <Transition
        appear
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        timeout={timeout === 'auto' ? null : timeout}
        {...other}
      >
        {(state, childProps) => {
          console.log(state, this.props.el)
          return React.cloneElement(children, {
            style: { ...style, ...styles[state] },
            ...childProps,
          })
        }}
      </Transition>
    )
  }
}

Slide.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  style: PropTypes.object,
  theme: PropTypes.object,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
}

Slide.defaultProps = { timeout: 200, direction: 'down' }

export default Slide
