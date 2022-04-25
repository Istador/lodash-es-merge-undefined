import merge from '.'

describe('merge', () => {
  it('basic', () => {
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

})
