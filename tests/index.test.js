import merge from '..'

describe('merge', () => {
  it('plain value', () => {
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 })
  })

  it('plain undefined', () => {
    expect(merge({ a: 1 }, { a: undefined })).toEqual({ a: undefined })
  })

  it('plain null', () => {
    expect(merge({ a: 1 }, { a: null })).toEqual({ a: null })
  })

  it('deep object value', () => {
    expect(merge({ a: 1 }, { a: { b: 2 } })).toEqual({ a: { b: 2 } })
  })

  it('deep object undefined', () => {
    expect(merge({ a: 1 }, { a: { b: undefined } })).toEqual({ a: { b: undefined } })
  })

  it('deep object null', () => {
    expect(merge({ a: 1 }, { a: { b: null } })).toEqual({ a: { b: null } })
  })

  it('deep array value', () => {
    expect(merge({ a: 1 }, { a: [ 2 ] })).toEqual({ a: [ 2 ] })
  })

  it('deep array undefined', () => {
    expect(merge({ a: 1 }, { a: [ undefined ] })).toEqual({ a: [ undefined ] })
  })

  it('deep array null', () => {
    expect(merge({ a: 1 }, { a: [ null ] })).toEqual({ a: [ null ] })
  })

  it('keep function', () => {
    const f = () => {}
    expect({ f, a: 'a' }).toEqual(merge({ f }, { a: 'a' }))
  })

  it('replace function w/ function', () => {
    const f1 = () => {}
    const f2 = () => {}
    expect(merge({ f: f1 }, { f: f2 })).toEqual({ f: f2 })
  })

  it('replace function w/ value', () => {
    expect(merge({ f: () => {} }, { f: 2 })).toEqual({ f: 2 })
  })

  it('replace function w/ undefined', () => {
    expect(merge({ f: () => {} }, { f: undefined })).toEqual({ f: undefined })
  })

  it('extended example', () => {
    const a = { a: 1, a1: 1, a2: undefined, b: 1, c: 1, arr: [ 1, 1, 1 ], obj: { x: 1 } }
    const b = { b: 2, b1: 2, b2: undefined, arr: [ 2, 2 ], obj: { x: 2 } }
    const c = { c: 3, c1: 3, c2: undefined, arr: [ 3 ], obj: { x: 3 } }
    expect(merge(a, b, c)).toEqual({
      a   : 1,
      a1  : 1,
      a2  : undefined,
      b   : 2,
      b1  : 2,
      b2  : undefined,
      c   : 3,
      c1  : 3,
      c2  : undefined,
      arr : [ 3, 2, 1 ],
      obj : { x: 3 },
    })
  })

  it('simple with undefined', () => {
    const a = { a: 1, b: 1, c: 1 }
    const b = { b: 2, c: undefined, d: 2, e: undefined }
    const c = { d: undefined, e: 3, f: undefined, g: 3 }
    expect(merge(a, b, c)).toEqual({
      a: 1,
      b: 2,
      c: undefined,
      d: undefined,
      e: 3,
      f: undefined,
      g: 3,
    })
  })

  it('deep with undefined', () => {
    const a = {
      a: 1,
      b: 1,
      c: 1,
      obj: {
        a: 1,
        b: 1,
        c: 1,
        arr: [ { a: 1, b: 1, c: 1 }, undefined, 1, undefined, 1, undefined, 1 ],
      },
      arr: [ { a: 1, b: 1, c: 1 }, undefined, 1, undefined, 1, undefined, 1 ],
    }
    const b = {
      b: 2,
      c: undefined,
      d: 2,
      e: undefined,
      obj: {
        b: 2,
        c: undefined,
        d: 2,
        e: undefined,
      },
    }
    const c = {
      obj: {
        arr: [ { b: 3, c: undefined, d: 3, e: undefined }, 3, undefined, 3, 3 ],
      },
      arr: [ { b: 3, c: undefined, d: 3, e: undefined }, 3, undefined, 3, 3 ],
    }
    expect(merge(a, b, c)).toEqual({
      a: 1,
      b: 2,
      c: undefined,
      d: 2,
      e: undefined,
      obj: {
        a: 1,
        b: 2,
        c: undefined,
        d: 2,
        e: undefined,
        arr: [ { a: 1, b: 3, c: undefined, d: 3, e: undefined }, 3, undefined, 3, 3, undefined, 1 ],
      },
      arr: [ { a: 1, b: 3, c: undefined, d: 3, e: undefined }, 3, undefined, 3, 3, undefined, 1 ],
    })
  })

  it('replace object with deep undefined', () => {
    const target   = { a: 'any' };
    const source   = { a: { b: undefined } }
    const expected = { a: { b: undefined } }
    expect(merge(target, source)).toEqual(expected)
  })

  it('deep deep object', () => {
    const a = { x: 1, y: 1,         deep: { x: 1, y: 1, deeper: { x: 1, y: 1,         deepest: { x: 1, y: 1 } } } }
    const b = {                     deep: {             deeper: { x: 2, y: undefined, deepest: { x: 2, y: undefined } } } }
    const c = { x: 3, y: undefined, deep: { x: 3,       deeper: {               z: 3, deepest: {               z: 3 } } } }
    expect(merge(a, b, c)).toEqual({
      x: 3,
      y: undefined,
      deep: {
        x: 3,
        y: 1,
        deeper: {
          x: 2,
          y: undefined,
          z: 3,
          deepest: {
            x: 2,
            y: undefined,
            z: 3,
          }
        }
      }
    })
  })

})
