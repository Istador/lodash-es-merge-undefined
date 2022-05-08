import mapValues from 'lodash-es/mapValues.js'
import mergeWith from 'lodash-es/mergeWith.js'

// marker object to return undefined from mergeWith, without it triggering the default merge algorithm
const UNDEFINED = new Object()

// transform UNDEFINED to undefined
const toUndefined = v => (
  v === UNDEFINED
  ? undefined
  : (
    Array.isArray(v)
    ? v.map(toUndefined)
    : (
      typeof v === 'object' && v !== null
      ? mapValues(v, toUndefined)
      : v
    )
  )
)

export const merge = (...args) => mapValues(
  mergeWith(
    ...args,
    (a, b) => {
      if (b === undefined) { return UNDEFINED }
      if (Array.isArray(a) || Array.isArray(b)) { return undefined }
      if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) { return merge(a, b) }
      return undefined
    }
  ),
  toUndefined
)

export default merge
