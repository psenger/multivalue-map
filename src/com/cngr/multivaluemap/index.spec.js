/*
 * Copyright (c) 2019, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */

'use strict'

const { MultiValueMap, Collection, SetCollection, ArrayCollection } = require('./index')

describe('Test Suite', () => {
  describe('MultiValueMap', () => {
    const values = [
      'airplane',
      'car',
      'boat',
      'train'
    ]
    const keys = [
      'captain',
      'driver'
    ]
    const fillFixture = (fixture) => {
      keys.forEach((key) => {
        values.forEach((value) => {
          fixture.set(key, value)
        })
      })
      return fixture
    }
    describe('#constructor', () => {
      test.each([
        ['undefined', undefined],
        ['null', null],
        ['array object', []],
        ['array object', [[1, 2], [3, [4, 5]]]]
      ]
      )(
        'constructor should not throw an exception with an initial state equal to %s',
        (msg, val) => {
          expect.assertions(2)
          expect(() => {
            const fixture = new MultiValueMap(val)
            expect(fixture).not.toBeNull()
          }).not.toThrow()
        })
      test('with SetCollection', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(undefined, { valueType: SetCollection })
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('A')).toEqual([1, 2, 4])
      })
      test('with ArrayCollection', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(undefined, { valueType: ArrayCollection })
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('A')).toEqual([1, 2, 2, 4])
      })
      test('with default-undefined (ArrayCollection)', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(undefined, undefined)
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('A')).toEqual([1, 2, 2, 4])
      })
      test('with default-null (ArrayCollection)', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(null, null)
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('A')).toEqual([1, 2, 2, 4])
      })
      test('with default-not-set (ArrayCollection)', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap()
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('A')).toEqual([1, 2, 2, 4])
      })
      test.each(
        [
          ['non-iterable', 100],
          ['string', 'a string'],
          ['number', 100.99],
          ['array literal with a single dimension', [1, 2, 3, 4]]
        ]
      )(
        'constructor should throw an exception when passed %s',
        (msg, val) => {
          expect.assertions(1)
          expect(() => {
            const fixture = new MultiValueMap(val)
            expect(fixture).toBeNull()
          }).toThrow()
        }
      )
      test.each([
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
      ])(
        'with %s, should have the correct size and values',
        (msg, val, { size, asserts }) => {
          expect.assertions(size + 2)
          let fixture = null
          // `should construct with an initial state equal to ${msg}`
          expect(() => {
            fixture = new MultiValueMap(val)
          }).not.toThrow()
          // `should have the correct size of ${size}`
          expect(fixture.size).toEqual(size)
          // `should have the correct keys set to the correct values`
          asserts.forEach(({ key, values }) => {
            expect(fixture.get(key)).toEqual(
              expect.arrayContaining(values)
            )
          })
        })
    })
    describe('#get', () => {
      test('ArrayCollection to unmapped value should return null', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(undefined, { valueType: ArrayCollection })
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('B')).toBeNull()
      })
      test('SetCollection to unmapped value should return null', () => {
        expect.assertions(1)
        const fixture = new MultiValueMap(undefined, { valueType: SetCollection })
        fixture.setAll('A', [1, 2, 2, 4])
        expect(fixture.get('B')).toBeNull()
      })
    })
    describe('#set', () => {
      const val = [
        ['integer', 4],
        ['negative integer', -7],
        ['real number', 54.12],
        ['negative real number', -56.928],
        ['string', 'The quick brown fox jumps over the lazy dog']
      ]
      describe.each([
        ['integer', 13],
        ['negative integer', -43],
        ['real number', 62.99],
        ['negative real number', -77.928],
        ['string', 'walt']
      ])(
        'should set with a key of type %s with %s',
        (keyMsg, key) => {
          val.forEach(([valueMsg, values]) => {
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
        }
      )
    })
    describe('#setAll', () => {
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
      test('Non iterator passed should throw an exception', () => {
        const fixture = new MultiValueMap()
        expect(() => {
          fixture.setAll('A', null)
        }).toThrow()
        expect(() => {
          fixture.setAll('A', 100)
        }).toThrow()
        expect(() => {
          // turns out a string is iterable!
          fixture.setAll('A', 'ABCD')
        }).not.toThrow()
        expect(() => {
          fixture.setAll('A', ['a', 'b', 'c'])
        }).not.toThrow()
      })
    })
    describe('#has', () => {
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
    describe('#delete', () => {
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
          test('should delete with a variety of key when values are mixed', () => {
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
    describe('#clear', () => {
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
    describe('#forEach', () => {
      const scope = {
        msg: 'this is the scope'
      }
      test('proper scope, key, and values, map passed to the function for ArrayCollection', () => {
        const fixture = fillFixture(new MultiValueMap())
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
      test('proper scope, key, and values, map passed to the function for SetCollection', () => {
        const fixture = fillFixture(new MultiValueMap(null, { valueType: SetCollection }))
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
    describe('#Iterator', () => {
      test('should return a key value iterator for ArrayCollection', () => {
        expect.assertions(3)
        const fixture = fillFixture(new MultiValueMap())
        fixture.set('robot', null)
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
      test('should return a key value iterator for SetCollection', () => {
        expect.assertions(3)
        const fixture = fillFixture(new MultiValueMap(null, { valueType: SetCollection }))
        fixture.set('robot', null)
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
    describe('#keys', () => {
      test('should return appropriate length for ArrayCollection', () => {
        const fixture = fillFixture(new MultiValueMap())
        expect(Array.from(fixture.keys()).length).toEqual(2)
      })
      test('should return appropriate length for SetCollection', () => {
        const fixture = fillFixture(new MultiValueMap(null, { valueType: SetCollection }))
        expect(Array.from(fixture.keys()).length).toEqual(2)
      })
    })
    describe('#values', () => {
      test('should return appropriate lengths for ArrayCollection', () => {
        const fixture = fillFixture(new MultiValueMap())
        expect(Array.from(fixture.values()).length).toEqual(2)
      })
      test('should return appropriate lengths for SetCollection', () => {
        const fixture = fillFixture(new MultiValueMap(null, { valueType: SetCollection }))
        expect(Array.from(fixture.values()).length).toEqual(2)
      })
    })
    describe('#entries', () => {
      test('should return appropriate lengths for ArrayCollection', () => {
        const fixture = fillFixture(new MultiValueMap())
        expect(Array.from(fixture.entries()).length).toEqual(2)
      })
      test('should return appropriate lengths for SetCollection', () => {
        const fixture = fillFixture(new MultiValueMap(null, { valueType: SetCollection }))
        expect(Array.from(fixture.entries()).length).toEqual(2)
      })
      describe('entries of iterable values', () => {
        test.each([
          [
            'valueType: SetCollection',
            [
              ['3', ['1', '2', '2', '3']],
              ['4', ['1', '2', '2', '3', '3', '3', '4']]
            ],
            { valueType: SetCollection },
            {
              assertions: 2
            }
          ],
          [
            'valueType: ArrayCollection',
            [
              ['4', ['1', '2', '2', '3']],
              ['7', ['1', '2', '2', '3', '3', '3', '4']]
            ],
            { valueType: ArrayCollection },
            {
              assertions: 2
            }
          ]
        ])(
          'When MultiValueMap is set with \'%s\'',
          (subject, iterable, options, { assertions }) => {
            expect.assertions(assertions)
            const fixture = new MultiValueMap(iterable, options)
            for (const [key, values] of fixture.entries()) {
              const { length } = [...values]
              expect(length).toEqual(Number.parseInt(key))
            }
          }
        )
      })
    })
  })
  describe('Collection', () => {
    describe('extended', () => {
      class FooCollection extends Collection {
        constructor () {
          super(Set)
        }
      }
      test('#setValue', () => {
        expect.assertions(1)
        const fixture = new FooCollection()
        expect(() => {
          fixture.setValue('boom')
        }).toThrow()
      })
      test('#getValue', () => {
        expect.assertions(1)
        const fixture = new FooCollection()
        expect(() => {
          fixture.getValue('boom')
        }).toThrow()
      })
      test('#iterator', () => {
        expect.assertions(1)
        const fixture = new FooCollection()
        expect(() => {
          for (const x of fixture) {
            console.log('boom', x)
          }
        }).toThrow()
      })
    })
    describe('setValue', () => {
      test('setting null', () => {
        const ac = new ArrayCollection()
        ac.setValue(null)
        expect(ac.getValue()).toHaveLength(0)
      })
      test('setting undefined', () => {
        const ac = new ArrayCollection()
        ac.setValue()
        expect(ac.getValue()).toHaveLength(0)
      })
      test('setting a value', () => {
        const ac = new ArrayCollection()
        ac.setValue('A')
        expect(ac.getValue()).toHaveLength(1)
      })
    })
  })
})
