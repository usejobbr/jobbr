import warning from 'warning'

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */

export const camelToKebabCase = string =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

export const kebabToCamelCase = string =>
  string.replace(/-([a-z])/g, g => g[1].toUpperCase())

export function createChainedFunction(...funcs) {
  return funcs.reduce(
    (acc, func) => {
      if (func == null) {
        return acc
      }

      warning(
        typeof func === 'function',
        'Invalid Argument Type, must only provide functions, undefined, or null.',
      )

      return function chainedFunction(...args) {
        acc.apply(this, args)
        func.apply(this, args)
      }
    },
    () => {},
  )
}

export function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export function queryStringToJSON(search) {
  const pairs = search.slice(1).split('&')
  let result = {}

  pairs.forEach(pair => {
    pair = pair.split('=')
    result[pair[0]] = decodeURIComponent(pair[1] || '')
  })

  return JSON.parse(JSON.stringify(result))
}
