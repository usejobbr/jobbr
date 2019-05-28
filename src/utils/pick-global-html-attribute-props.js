import pick from 'lodash-es/pick'
import pickBy from 'lodash-es/pickBy'

// region Private Constants

const EVENT_HANDLER_REGEX = /^on[A-Z]/

// endregion

export const GLOBAL_HTML_ATTRIBUTE_NAMES = [
  'accessKey',
  'autoCapitalize',
  'children',
  'className',
  'contentEditable',
  'contextMenu',
  'dir',
  'draggable',
  'dropzone',
  'hidden',
  'id',
  'is',
  'itemID',
  'itemProp',
  'itemRef',
  'itemScope',
  'itemType',
  'lang',
  'slot',
  'spellCheck',
  'style',
  'styleName',
  'tabIndex',
  'title',
  'translate',
]

export function pickGlobalHtmlAttributeProps(obj) {
  return {
    ...pick(obj, GLOBAL_HTML_ATTRIBUTE_NAMES),
    ...pickBy(obj, propertyIsDataAttributeOrEventHandler),
  }
}

export function propertyIsDataAttributeOrEventHandler(_, propName) {
  return (
    propName.match(EVENT_HANDLER_REGEX) != null || propName.startsWith('data-')
  )
}
