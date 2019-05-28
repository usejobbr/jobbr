import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styled from 'styled-components'

import LinearProgress from '../LinearProgress'
import Icon from '../Icon'
import { POSITION, TYPE } from '../../utils/constants'
import { falseOrElement, falseOrDelay, objectValues } from '../../utils/propValidator'

function getX(e) {
  return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientX : e.clientX
}

function getY(e) {
  return e.targetTouches && e.targetTouches.length >= 1 ? e.targetTouches[0].clientY : e.clientY
}

const noop = () => {}

const ToastWrap = styled.div`
  padding-bottom: 8px;
  box-sizing: content-box;
  &:hover {
    position: relative;
    z-index: 1;
  }
`
const ToastInside = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 1px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15), 0 4px 16px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  max-height: 800px;
  overflow: hidden;
  font-family: museo-sans, sans-serif;
  cursor: pointer;
  direction: ltr;
  margin-right: 24px;
  transition: 200ms;
  ${ToastWrap}:hover & {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 16px 64px 0 rgba(0, 0, 0, 0.15);
  }
`
const ToastContentWrap = styled.div`
  display: flex;
`
const ToastContent = styled.div`
  flex: 1;
  padding: 22px 24px;
  align-self: center;
`
const ToastActions = styled.div`
  padding: 12px;
  opacity: 0.5;
  transition: 200ms;
  ${ToastWrap}:hover & {
    opacity: ;
  }
`
const Title = styled.h4`
  padding: 0;
  margin: 0 0 ${props => (props.hasContent ? '8px' : 0)} 0;
  font-family: museo-sans, sans-serif;
  font-size: 16px;
  font-weight: 600;
`
const Content = styled.div`
  font-family: museo-sans, sans-serif;
  font-size: 14px;
  line-height: 1.25;
`
const IconWrap = styled.div`
  background-color: ${props => {
    if (props.type === TYPE.SUCCESS) return '#E5F6E8'
    if (props.type === TYPE.WARNING) return '#FEF3E2'
    if (props.type === TYPE.ERROR) return '#F9E8E8'
    return '#D4ECF0'
  }};
  color: ${props => {
    if (props.type === TYPE.SUCCESS) return '#235C35'
    if (props.type === TYPE.WARNING) return '#D07A00'
    if (props.type === TYPE.ERROR) return '#B80A0A'
    return '#006184'
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
`

class Toast extends Component {
  static propTypes = {
    closeButton: falseOrElement.isRequired,
    autoClose: falseOrDelay.isRequired,
    children: PropTypes.node.isRequired,
    closeToast: PropTypes.func.isRequired,
    position: PropTypes.oneOf(objectValues(POSITION)).isRequired,
    pauseOnHover: PropTypes.bool.isRequired,
    pauseOnFocusLoss: PropTypes.bool.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    transition: PropTypes.func.isRequired,
    draggable: PropTypes.bool.isRequired,
    draggablePercent: PropTypes.number.isRequired,
    in: PropTypes.bool,
    onExited: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    type: PropTypes.oneOf(objectValues(TYPE)),
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    bodyClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    progressClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    progressStyle: PropTypes.object,
    progress: PropTypes.number,
    isProgressDone: PropTypes.bool,
    updateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ariaLabel: PropTypes.string
  }

  static defaultProps = {
    type: TYPE.DEFAULT,
    in: true,
    onOpen: noop,
    onClose: noop,
    className: null,
    bodyClassName: null,
    progressClassName: null,
    updateId: null,
    role: 'alert'
  }

  state = {
    isRunning: true,
    preventExitTransition: false
  }

  flag = {
    canCloseOnClick: true,
    canDrag: false
  }

  drag = {
    start: 0,
    x: 0,
    y: 0,
    deltaX: 0,
    removalDistance: 0
  }

  ref = null

  componentDidMount() {
    this.props.onOpen(this.props.children.props)

    if (this.props.draggable) this.bindDragEvents()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.draggable !== this.props.draggable) {
      if (this.props.draggable) {
        this.bindDragEvents()
      } else {
        this.unbindDragEvents()
      }
    }
  }

  componentWillUnmount() {
    this.props.onClose(this.props.children.props)

    if (this.props.draggable) this.unbindDragEvents()
  }

  bindDragEvents() {
    document.addEventListener('mousemove', this.onDragMove)
    document.addEventListener('mouseup', this.onDragEnd)

    document.addEventListener('touchmove', this.onDragMove)
    document.addEventListener('touchend', this.onDragEnd)
  }

  unbindDragEvents() {
    document.removeEventListener('mousemove', this.onDragMove)
    document.removeEventListener('mouseup', this.onDragEnd)

    document.removeEventListener('touchmove', this.onDragMove)
    document.removeEventListener('touchend', this.onDragEnd)
  }

  onDragStart = e => {
    this.flag.canCloseOnClick = true
    this.flag.canDrag = true

    this.ref.style.transition = ''

    this.drag.start = this.drag.x = getX(e.nativeEvent)
    this.drag.removalDistance = this.ref.offsetWidth * (this.props.draggablePercent / 100)
  }

  onDragMove = e => {
    if (this.flag.canDrag) {
      if (this.state.isRunning) {
        this.props.pauseToast()
      }

      this.drag.x = getX(e)
      this.drag.deltaX = this.drag.x - this.drag.start

      // prevent false positif during a toast click
      this.drag.start !== this.drag.x && (this.flag.canCloseOnClick = false)

      this.ref.style.transform = `translateX(${this.drag.deltaX}px)`
      this.ref.style.opacity = 1 - Math.abs(this.drag.deltaX / this.drag.removalDistance)
    }
  }

  onDragEnd = e => {
    if (this.flag.canDrag) {
      this.flag.canDrag = false

      if (Math.abs(this.drag.deltaX) > this.drag.removalDistance) {
        this.setState(
          {
            preventExitTransition: true
          },
          this.props.closeToast
        )
        return
      }

      this.drag.y = getY(e)
      this.ref.style.transform = 'translateX(0)'
      this.ref.style.opacity = 1
    }
  }

  render() {
    const {
      closeButton,
      children,
      autoClose,
      type,
      closeToast,
      title,
      transition: Transition,
      position,
      onExited,
      onClick,
      bodyClassName,
      role
    } = this.props

    let icon = 'information-outline'

    if (type === TYPE.SUCCESS) icon = 'check-circle-outline'
    if (type === TYPE.WARNING) icon = 'alert-outline'
    if (type === TYPE.ERROR) icon = 'alert-circle-outline'

    return (
      <Transition
        in={this.props.in}
        appear
        unmountOnExit
        onExited={onExited}
        position={position}
        preventExitTransition={this.state.preventExitTransition}
        direction="left"
        el={this.state.el}
      >
        <ToastWrap>
          <ToastInside
            onClick={e => {
              onClick && onClick(e)
              this.flag.canCloseOnClick && closeToast()
            }}
            ref={ref => {
              console.log(this.ref)
              !this.ref && !this.state.el && this.setState({ el: ref })
              return (this.ref = ref)
            }}
            onMouseDown={this.onDragStart}
            onTouchStart={this.onDragStart}
          >
            <ToastContentWrap {...this.props.in && { role: role }} className={cx('Toastify__toast-body', bodyClassName)}>
              <IconWrap type={type}>
                <Icon name={icon} />
              </IconWrap>
              <ToastContent>
                {title && <Title hasContent={children}>{title}</Title>}
                {children && <Content>{children}</Content>}
              </ToastContent>
              <ToastActions>{closeButton && closeButton}</ToastActions>
            </ToastContentWrap>
            {autoClose && (
              <LinearProgress
                countdown={autoClose}
                pauseCountdown={!this.props.isRunning}
                onCountdown={closeToast}
                closeToast={closeToast}
                type={type}
              />
            )}
          </ToastInside>
        </ToastWrap>
      </Transition>
    )
  }
}

export default Toast
