export const args = function () { return arguments }.apply(undefined, [ 1, 2, 3 ])
export const typedArrays = [
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
]
export const stubTrue = function () { return true }
export const defineProperty = Object.defineProperty
export const document = global.document
export const root = global
