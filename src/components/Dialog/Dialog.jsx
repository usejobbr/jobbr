import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../Modal'
import Grow from '../Grow'
import Slide from '../Slide'
import { IconButton } from '../Button'

import styled from 'styled-components'

const DialogWrap = styled.div`
  background-color: white;
  outline: none;
  ${props =>
    !props.width && props.position.x !== 'stretch' && `min-width: 400px;`}
  ${props =>
    !props.width && props.position.x !== 'stretch' && `max-width: 640px;`}
  ${props => props.width && `width: ${props.width};`}
  box-shadow:
    ${props => {
      if (props.position.x === 'center') return 0
      if (props.position.x === 'left') return 4
      if (props.position.x === 'right') return -4
      if (props.position.x === 'stretch') return 0
    }}px ${props => {
  if (props.position.y === 'center') return 4
  if (props.position.y === 'top') return 4
  if (props.position.y === 'bottom') return -4
  if (props.position.y === 'stretch') return 0
}}px 16px rgba(0, 0, 0, 0.2), ${props => {
  if (props.position.x === 'center') return 0
  if (props.position.x === 'left') return 16
  if (props.position.x === 'right') return -16
  if (props.position.x === 'stretch') return 0
}}px ${props => {
  if (props.position.y === 'center') return 16
  if (props.position.y === 'top') return 16
  if (props.position.y === 'bottom') return -16
  if (props.position.y === 'stretch') return 0
}}px 64px rgba(0, 0, 0, 0.15);
${props => props.position.x === 'stretch' && `flex: 1;`}
`
const Header = styled.div`
  justify-content: space-between;
  align-items: center;
`
const H1 = styled.h1`
  color: #007fa4;
  font-family: museo-sans, sans-serif;
  font-weight: normal;
  line-height: 1em;
  padding: 40px ${props => (props.hasCloseButton ? 104 : 40)}px
    ${props => (props.hasContent ? 32 : 40)}px 40px;
  margin: 0;
`
const CloseButton = styled(IconButton).attrs({ name: 'close' })`
  position: absolute;
  top: 32px;
  right: 32px;
`
const DialogContent = styled.div`
  padding: ${props => (props.hasTitle || props.noPadding ? 0 : 40)}px
    ${props => {
      if (props.hasCloseButton && !props.hasTitle && !props.noPadding)
        return 104
      if (props.noPadding) return 0
      return 40
    }}px
    ${props => {
      if (props.noPadding) return 0
      if (props.hasActions) return 32
      return 40
    }}px
    ${props => (props.noPadding ? 0 : 40)}px;
`
const DialogActions = styled.div`
  padding: 32px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: flex-end;
`

class Dialog extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
  }

  handleBackdropClick = event => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(event)
    }

    if (!this.props.disableBackdropClick && this.props.onClose) {
      this.props.onClose(event, 'backdropClick')
    }
  }

  render() {
    const {
      open,
      title,
      actions,
      onClose,
      children,
      hideCloseButton,
      transitionDuration,
      BackdropProps,
      disableBackdropClick,
      disableEscapeKeyDown,
      noPadding,
      onEscapeKeyDown,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      position,
      TransitionProps,
      width,
      zIndex,
      ...other
    } = this.props

    let { TransitionComponent } = this.props

    if (
      position.x === 'left' ||
      position.x === 'right' ||
      position.y === 'top' ||
      position.y === 'bottom'
    ) {
      TransitionComponent = Slide
    }

    let direction = null

    if (position.x === 'left') direction = 'right'
    if (position.x === 'right') direction = 'left'
    if (position.y === 'top') direction = 'down'
    if (position.y === 'bottom') direction = 'up'

    return (
      <Modal
        BackdropProps={{
          transitionDuration,
          ...BackdropProps,
        }}
        disableBackdropClick={disableBackdropClick}
        disableEscapeKeyDown={disableEscapeKeyDown}
        onBackdropClick={this.handleBackdropClick}
        onEscapeKeyDown={onEscapeKeyDown}
        onClose={onClose}
        open={open}
        position={position}
        role="dialog"
        zIndex={zIndex}
        {...other}
      >
        <TransitionComponent
          appear
          in={open}
          timeout={transitionDuration}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          direction={direction}
          {...TransitionProps}
        >
          <DialogWrap width={width} position={position}>
            <Header>
              {title && (
                <H1 hasContent={children} hasCloseButton={!hideCloseButton}>
                  {title}
                </H1>
              )}
              {!hideCloseButton && <CloseButton onClick={onClose} />}
            </Header>
            <DialogContent
              noPadding={noPadding}
              hasTitle={title}
              hasActions={actions}
              hasCloseButton={!hideCloseButton}
            >
              {children}
            </DialogContent>
            {actions && <DialogActions>{actions}</DialogActions>}
          </DialogWrap>
        </TransitionComponent>
      </Modal>
    )
  }
}

Dialog.defaultProps = {
  TransitionComponent: Grow,
  transitionDuration: 200,
  position: { x: 'center', y: 'center' },
}

export default Dialog
