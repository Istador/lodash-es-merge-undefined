# lodash-es-merge-undefined [![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/lodash-es-merge-undefined.svg
[npm-url]: https://npmjs.org/package/lodash-es-merge-undefined

This is an alternative to the lodash's merge function, but it does overwrite values with `undefined`.

## Example
```js
import { merge as classic } from 'lodash-es'
import { merge as project } from 'lodash-es-merge-undefined'

const plain1 = { a: 1, b: 1 }
const plain2 = { a: 2, b: undefined }
console.log(classic(plain1, plain2))  //> { a: 2, b: 1 }
console.log(project(plain1, plain2))  //> { a: 2, b: undefined }

const deep1  = { sub: { a: 1, b: 1 } }
const deep2  = { sub: { a: 2, b: undefined } }
console.log(classic(deep1,  deep2 ))  //> { sub: { a: 2, b: 1 } }
console.log(project(deep1,  deep2 ))  //> { sub: { a: 2, b: undefined } }
```
