import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import warning from 'warning'
import debounce from 'debounce'
import EventListener from 'react-event-listener'
import ownerDocument from '../../utils/ownerDocument'
import ownerWindow from '../../utils/ownerWindow'
import Modal from '../Modal'
import Grow from '../Grow'

function getOffsetTop(rect, vertical) {
  let offset = 0

  if (typeof vertical === 'number') {
    offset = vertical
  } else if (vertical === 'center') {
    offset = rect.height / 2
  } else if (vertical === 'bottom') {
    offset = rect.height
  }

  return offset
}

function getOffsetLeft(rect, horizontal) {
  let offset = 0

  if (typeof horizontal === 'number') {
    offset = horizontal
  } else if (horizontal === 'center') {
    offset = rect.width / 2
  } else if (horizontal === 'right') {
    offset = rect.width
  }

  return offset
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => (typeof n === 'number' ? `${n}px` : n))
    .join(' ')
}

function getScrollParent(parent, child) {
  let element = child
  let scrollTop = 0

  while (element && element !== parent) {
    element = element.parentNode
    scrollTop += element.scrollTop
  }
  return scrollTop
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl
}

const containerStyles = {
  position: 'absolute',
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  outline: 'none',
}

class Popover extends Component {
  handleGetOffsetTop = getOffsetTop
  handleGetOffsetLeft = getOffsetLeft

  state = { style: {} }

  constructor() {
    super()

    if (typeof window !== 'undefined') {
      this.handleResize = debounce(() => {
        this.setPositioningStyles(this.containerRef)
      }, 166) // Corresponds to 10 frames at 60 Hz.
    }
  }

  componentDidMount() {
    if (this.props.action) {
      this.props.action({
        updatePosition: this.handleResize,
      })
    }
  }

  componentWillUnmount() {
    this.handleResize.clear()
  }

  setPositioningStyles = element => {
    const newStyle = this.getPositioningStyle(element)

    if (newStyle.top) this.setState({ style: newStyle })
  }

  getPositioningStyle = element => {
    const { anchorEl, anchorReference, marginThreshold } = this.props
    const contentAnchorOffset = this.getContentAnchorOffset(element)
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    }
    const transformOrigin = this.getTransformOrigin(
      elemRect,
      contentAnchorOffset,
    )

    if (anchorReference === 'none') {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(transformOrigin),
      }
    }

    const anchorOffset = this.getAnchorOffset(contentAnchorOffset)
    let top = anchorOffset.top - transformOrigin.vertical
    let left = anchorOffset.left - transformOrigin.horizontal
    const bottom = top + elemRect.height
    const right = left + elemRect.width
    const containerWindow = ownerWindow(getAnchorEl(anchorEl))
    const heightThreshold = containerWindow.innerHeight - marginThreshold
    const widthThreshold = containerWindow.innerWidth - marginThreshold

    if (top < marginThreshold) {
      const diff = top - marginThreshold
      top -= diff
      transformOrigin.vertical += diff
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold
      top -= diff
      transformOrigin.vertical += diff
    }

    warning(
      element.height < heightThreshold || !element.height || !heightThreshold,
      [
        'The Popover component is too tall.',
        `Some part of it can not be seen on the screen (${(element.height = heightThreshold)}px).)`,
        'Please consider adding a `max-height` to improve the user-experience.',
      ].join('\n'),
    )

    if (left < marginThreshold) {
      const diff = left - marginThreshold
      left -= diff
      transformOrigin.horizontal += diff
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold
      left -= diff
      transformOrigin.horizontal += diff
    }

    const elemStyles = {
      top: `${top}px`,
      left: `${left}px`,
      transformOrigin: getTransformOriginValue(transformOrigin),
    }

    return elemStyles
  }

  getAnchorOffset(contentAnchorOffset) {
    const {
      anchorEl,
      anchorOrigin,
      anchorReference,
      anchorPosition,
    } = this.props

    if (anchorReference === 'anchorPosition') {
      warning(
        anchorPosition,
        'You need to provide a `anchorPosition` property when using <Popover anchorReference="anchorPosition" />',
      )
      return anchorPosition
    }

    const anchorElement =
      getAnchorEl(anchorEl) || ownerDocument(this.containerRef).body
    const anchorRect = anchorElement.getBoundingClientRect()
    const anchorVertical =
      contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center'

    return {
      top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
      left:
        anchorRect.left +
        this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal),
    }
  }

  getContentAnchorOffset(element) {
    const { getContentAnchorEl, anchorReference } = this.props
    let contentAnchorOffset = 0

    if (getContentAnchorEl && anchorReference === 'anchorEl') {
      const contentAnchorEl = getContentAnchorEl(element)

      if (contentAnchorEl && element.contains(contentAnchorEl)) {
        const scrollTop = getScrollParent(element, contentAnchorEl)
        contentAnchorOffset =
          contentAnchorEl.offsetTop +
            contentAnchorEl.clientHeight / 2 -
            scrollTop || 0
      }

      warning(
        this.props.anchorOrigin.vertical === 'top',
        [
          'You can not chanch the default `anchorOrigin.vertical` value ',
          'when also providing the `getContentAnchorEl` property to the popover component.',
          'Only use one of the two properties.',
          'Set `getContentAnchorEl` to `null | undefined` or leave `anchorOrigin.vertical` unchanged.',
        ].join('\n'),
      )
    }

    return contentAnchorOffset
  }

  getTransformOrigin(elemRect, contentAnchorOffset = 0) {
    const { transformOrigin } = this.props
    return {
      vertical:
        this.handleGetOffsetTop(elemRect, transformOrigin.vertical) +
        contentAnchorOffset,
      horizontal: this.handleGetOffsetLeft(
        elemRect,
        transformOrigin.horizontal,
      ),
    }
  }

  handleEntering = element => {
    if (this.props.onEntering) this.props.onEntering(element)
    this.setPositioningStyles(element)
  }

  render() {
    const {
      anchorEl,
      children,
      container: containerProp,
      modalClasses,
      onEnter,
      onEntered,
      onExit,
      onExited,
      onExiting,
      open,
      role,
      TransitionComponent,
      transitionDuration: transitionDurationProp,
      TransitionProps,
      ...other
    } = this.props

    const { style } = this.state
    let transitionDuration = transitionDurationProp
    const container =
      containerProp ||
      (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined)

    return (
      <Modal
        classes={modalClasses}
        container={container}
        open={open}
        BackdropProps={{ invisible: true }}
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          onEnter={onEnter}
          onEntered={onEntered}
          onEntering={this.handleEntering}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          role={role}
          style={style}
          timeout={transitionDuration}
          {...TransitionProps}
        >
          <div
            style={containerStyles}
            ref={ref => {
              this.containerRef = ReactDOM.findDOMNode(ref)
            }}
          >
            <EventListener target="window" onResize={this.handleResize} />
            {children}
          </div>
        </TransitionComponent>
      </Modal>
    )
  }
}

Popover.propTypes = {
  action: PropTypes.func,
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]).isRequired,
    vertical: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['top', 'center', 'bottom']),
    ]).isRequired,
  }),
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
  children: PropTypes.node,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  elevation: PropTypes.number,
  getContentAnchorEl: PropTypes.func,
  marginThreshold: PropTypes.number,
  ModalClasses: PropTypes.object,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onEntered: PropTypes.func,
  onEntering: PropTypes.func,
  onExit: PropTypes.func,
  onExited: PropTypes.func,
  onExiting: PropTypes.func,
  open: PropTypes.bool.isRequired,
  PaperProps: PropTypes.object,
  role: PropTypes.string,
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]).isRequired,
    vertical: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['top', 'center', 'bottom']),
    ]).isRequired,
  }),
  TransitionComponent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
  ]),
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
  TransitionProps: PropTypes.object,
}

Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  elevation: 8,
  marginThreshold: 16,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  TransitionComponent: Grow,
  transitionDuration: 200,
}

export default Popover
