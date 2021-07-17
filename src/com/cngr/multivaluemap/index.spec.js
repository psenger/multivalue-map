/*
 * Copyright (c) 2019, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */
'use strict'
const {MultiValueMap, Collection} = require('./index');
const {SetCollection,ArrayCollection} = Collection;

describe('MultiValueMap', () => {
  describe('constructor should not throw an exception', () => {
    [
      ['undefined', undefined],
      ['null', null],
      ['array object', []],
      ['array object', [[1, 2], [3, [4, 5]]]]
    ]
      .forEach(([msg, val]) => {
        test(`should construct with an initial state equal to ${msg}`, () => {
          expect(() => {
            const fixture = new MultiValueMap(val)
            expect(fixture).not.toBeNull()
          }).not.toThrow()
        })
      })
  })
  describe('constructor with Set',() => {
    const fixture = new MultiValueMap(undefined, { valueType: SetCollection })
    fixture.setAll('A', [ 1, 2, 2, 4] )
    expect(fixture.get('A') ).toEqual([1,2,4]);
  })
  describe('SetCollection with un mapped value return null',() => {
    const fixture = new MultiValueMap(undefined, { valueType: SetCollection })
    fixture.setAll('A', [ 1, 2, 2, 4] )
    expect(fixture.get('B') ).toBeNull();
  })
  describe('constructor with Set',() => {
    const fixture = new MultiValueMap(undefined, { valueType: ArrayCollection })
    fixture.setAll('A', [ 1, 2, 2, 4] )
    expect(fixture.get('A') ).toEqual([ 1, 2, 2, 4]);
  })
  describe('SetCollection with un mapped value return null',() => {
    const fixture = new MultiValueMap(undefined, { valueType: ArrayCollection })
    fixture.setAll('A', [ 1, 2, 2, 4] )
    expect(fixture.get('B') ).toBeNull();
  })
  describe('constructor should throw an exception', () => {
    [
      ['non-iterable', 100],
      ['string', 'a string'],
      ['number', 100.99],
      ['array literal with a single dimension', [1, 2, 3, 4]]
    ]
      .forEach(([msg, val]) => {
        test(`should construct with an initial state equal to ${msg}`, () => {
          expect(() => {
            const fixture = new MultiValueMap(val)
            expect(fixture).not.toBeNull()
          }).toThrow()
        })
      })
  })
  describe('constructor called', () => {
    [
      [
        '{ "A": 1 }',
        [['A', 1]],
        {
          size: 1,
          asserts: [
            { key: 'A', values: [1] }
          ]
        }
      ],
      [
        '{ "A": 1, "B": 2 }',
        [['A', 1], ['B', 2]],
        {
          size: 2,
          asserts: [
            { key: 'A', values: [1] },
            { key: 'B', values: [2] }
          ]
        }
      ],
      [
        '{ "A": [1], "B": [2,3] }',
        [['A', 1], ['B', [2, 3]]],
        {
          size: 2,
          asserts: [
            { key: 'A', values: [1] },
            { key: 'B', values: [2, 3] }
          ]
        }
      ],
      [
        '{ "A": [1,2], "B": [3,4] }',
        [['A', 1], ['B', [2, 3]]],
        {
          size: 2,
          asserts: [
            { key: 'A', values: [1] },
            { key: 'B', values: [2, 3] }
          ]
        }
      ]
    ]
      .forEach(([msg, val, { size, asserts }]) => {
        let fixture = null
        test(`should construct with an initial state equal to ${msg}`, () => {
          expect(() => {
            fixture = new MultiValueMap(val)
          }).not.toThrow()
        })
        test(`should have the correct size of ${size}`, () => {
          expect(fixture.size).toEqual(size)
        })
        test(`should have the correct keys set to the correct values`, () => {
          asserts.forEach(({ key, values }) => {
            expect(fixture.get(key)).toEqual(
              expect.arrayContaining(values)
            )
          })
        })
      })
  })
  describe('set', () => {
    [
      ['integer', 13],
      ['negative integer', -43],
      ['real number', 62.99],
      ['negative real number', -77.928],
      ['string', 'walt']
    ]
      .forEach(([keyMsg, key]) => {
        [
          ['integer', 4],
          ['negative integer', -7],
          ['real number', 54.12],
          ['negative real number', -56.928],
          ['string', 'The quick brown fox jumps over the lazy dog']
        ]
          .forEach(([valueMsg, values]) => {
            test(`should set with a key of type ${keyMsg} with ${valueMsg}`, () => {
              const fixture = new MultiValueMap()
              fixture.set(key, values)
              expect(fixture.size).toEqual(1)
              const result = fixture.get(key)
              expect(Array.isArray(result)).toBeTruthy()
              expect(result.length).toEqual(1)
              expect(fixture.get(key)).toEqual(
                expect.arrayContaining([values])
              )
            })
          })
      })
    test('should return this', () => {
      const fixture = new MultiValueMap()
      const key = 'captain'
      let builder = fixture.set(key, 'airplane');
      [
        'car',
        'boat',
        'train'
      ].forEach((value) => {
        builder = builder.set(key, value)
      })
      expect(builder.size).toEqual(1)
    })
  })
  describe('setAll', () => {
    [
      ['integer', 13],
      ['negative integer', -43],
      ['real number', 62.99],
      ['negative real number', -77.928],
      ['string', 'walt']
    ]
      .forEach(([keyMsg, key]) => {
        [
          ['integers', [1, 2, 3, 4]],
          ['negative integers', [-6, -7, -8, -9]],
          ['real numbers', [10.99, 20.34, 54.12, 62.75]],
          ['negative real numbers', [-23.426, -56.928, -69.928, -89.123]],
          ['strings', ['The quick brown', 'fox jumps over', 'the lazy', 'dog']]
        ]
          .forEach(([valueMsg, values]) => {
            test(`should setAll with a key of type ${keyMsg} with ${valueMsg}`, () => {
              const fixture = new MultiValueMap()
              fixture.setAll(key, values)
              expect(fixture.size).toEqual(1)
              const result = fixture.get(key)
              expect(Array.isArray(result)).toBeTruthy()
              expect(result.length).toEqual(4)
              expect(fixture.get(key)).toEqual(
                expect.arrayContaining(values)
              )
            })
          })
      })
  })
  describe('has', () => {
    const fixture = new MultiValueMap();
    [
      ['integer', 13],
      ['negative integer', -43],
      ['real number', 62.99],
      ['negative real number', -77.928],
      ['string', 'walt']
    ]
      .forEach(([msg, key]) => {
        test(`called has with a ${msg}`, () => {
          fixture.set(key, 'a')
          expect(fixture.has(key)).toBeTruthy()
        })
      })
    test('called on a missing key', () => {
      expect(fixture.has('this key does not exist')).toBeFalsy()
    })
  })
  describe('delete', () => {
    const fixture = new MultiValueMap();
    [
      ['integers', [1, 2, 3, 4]],
      ['negative integers', [-6, -7, -8, -9]],
      ['real numbers', [10.99, 20.34, 54.12, 62.75]],
      ['negative real numbers', [-23.426, -56.928, -69.928, -89.123]],
      ['strings', ['The quick brown', 'fox jumps over', 'the lazy dog']]
    ]
      .forEach(([valueMsg, values]) => {
        // test(`should delete with a ${keyMsg} key when values are ${valueMsg}`, () => {
        test(`should delete with a variety of key when values are mixed`, () => {
          const keys = [
            ['integer', 13],
            ['negative integer', -43],
            ['real number', 62.99],
            ['negative real number', -77.928],
            ['string', 'walt']
          ]
          keys.forEach(([keyMsg, key]) => {
            fixture.setAll(key, values)
          })
          expect(fixture.size).toEqual(keys.length)
          keys.forEach(([keyMsg, key]) => {
            expect(fixture.delete(key)).toBeTruthy()
          })
          expect(fixture.size).toEqual(0)
        })
      })
  })
  describe('clear', () => {
    test('should clear', () => {
      const fixture = new MultiValueMap();
      [
        13,
        -43,
        62.99,
        -77.928,
        'walt'
      ].forEach((key) => {
        fixture.setAll(key, [1, 2, 3, 4])
      })
      expect(fixture.size).toEqual(5)
      fixture.clear()
      expect(fixture.size).toEqual(0)
    })
    test('should clear when nothing is there', () => {
      expect(() => {
        const fixture = new MultiValueMap()
        fixture.clear()
        expect(fixture.size).toEqual(0)
      }).not.toThrow()
    })
  })
  describe('forEach', () => {
    test('should have proper scope and key, values, map passed to the function', () => {
      const fixture = new MultiValueMap()
      const values = [
        'airplane',
        'car',
        'boat',
        'train'
      ];
      [
        'captain',
        'driver'
      ].forEach((key) => {
        values.forEach((value) => {
          fixture.set(key, value)
        })
      })
      const scope = {
        msg: 'this is the scope'
      }
      const captured = new Map()
      const cbFn = jest.fn(function (value, key, mvm) {
        expect(mvm.has('captain')).toBeTruthy()
        expect(mvm.has('driver')).toBeTruthy()
        captured.set(key, value)
        expect(this).toBe(scope)
      })
      fixture.forEach(cbFn, scope)
      expect(cbFn).toHaveBeenCalledTimes(2)
      expect(captured.size).toEqual(2)
      expect(captured.get('captain')).toEqual(expect.arrayContaining(values))
      expect(captured.get('driver')).toEqual(expect.arrayContaining(values))
    })
  })
  describe('Iterator', () => {
    test('should return a key value iterator', () => {
      expect.assertions(3)
      const fixture = new MultiValueMap()
      const values = [
        'airplane',
        'car',
        'boat',
        'train'
      ];
      [
        'captain',
        'driver'
      ].forEach((key) => {
        values.forEach((value) => {
          fixture.set(key, value)
        })
      })
      fixture.set('robot', null);
      for (const [key, value] of fixture) {
        switch (key) {
          case 'captain':
            expect(value).toEqual(expect.arrayContaining(values))
            break
          case 'driver':
            expect(value).toEqual(expect.arrayContaining(values))
            break
          case 'robot':
            expect(value).toEqual(expect.arrayContaining([]))
            break
          default:
            expect(true).toBeFalsy()
        }
      }
    })
  })
  describe('keys, values, entries', () => {
    test('should return appropriate lengths', () => {
      const fixture = new MultiValueMap()
      const values = [
        'airplane',
        'car',
        'boat',
        'train'
      ];
      [
        'captain',
        'driver'
      ].forEach((key) => {
        values.forEach((value) => {
          fixture.set(key, value)
        })
      })
      expect(Array.from(fixture.keys()).length).toEqual(2)
      expect(Array.from(fixture.values()).length).toEqual(2)
      expect(Array.from(fixture.entries()).length).toEqual(2)
    })
  })
})
