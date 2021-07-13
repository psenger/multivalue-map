/*
 * Copyright (c) 2019, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */
'use strict'

/**
 * @module multivaluemap
 * @type {MultiValuedMap}
 */

module.exports = class MultiValuedMap {
  /**
   * Constructor, with optional initial state of iterable.
   *
   * @param [iterable] - An Array or other iterable object whose elements are key-value pairs (arrays with two elements, e.g. [[ 1, ['one','two'] ],[ 2, ['three'] ]]). Each key-value pair is added to the new Map; null values are treated as undefined.
   */
  constructor(iterable) {
    this.map = new Map()
    if (iterable) {
      if (typeof iterable[Symbol.iterator] !== 'function') {
        throw new TypeError(`${iterable} is not iterable`)
      } else {
        for (const kvp of iterable) {
          if (typeof (kvp.entries) === 'undefined') {
            throw new TypeError(`Iterator value a is not an entry object`)
          }
          const [key, values] = kvp
          if (Array.isArray(values)) {
            values.forEach(value => {
              this.set(key, value)
            })
          } else {
            this.set(key, values)
          }
        }
      }
    }
  }

  /**
   * Sets the value for the key in the Map object. Returns the Map object.
   * @param key
   * @param value
   * @returns {module.MultiValuedMap}
   */
  set(key, value) {
    const existingValue = this.map.get(key) || []
    existingValue.push(value)
    this.map.set(key, existingValue) // the only reason I need to do this, if the existingValue doesnt exist
    return this
  }

  /**
   * Set All values.
   * @param key
   * @param values
   * @returns {module.MultiValuedMap}
   */
  setAll(key, values) {
    values.forEach(value => {
      this.set(key, value)
    })
    return this
  }

  /**
   * Returns the number of key/value pairs in the Multi Value Map object.
   * @returns {number}
   */
  get size() {
    return this.map.size
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the Multi Value Map object or not.
   * @param key
   * @returns {boolean}
   */
  has(key) {
    return this.map.has(key)
  }

  /**
   * Returns true if an element in the Multi Value Map object existed and has been removed, or false if the element does not exist. It will return false afterwards.
   * @param {any} key
   * @returns {boolean}
   */
  delete(key) {
    return this.map.delete(key)
  }

  /**
   * Removes all key/value pairs from the Multi Value Map object.
   */
  clear() {
    this.map.clear()
  }

  /**
   * Returns a new Iterator object that contains an array of [key, [value]] for each element in the Map object in insertion order.
   * @returns {IterableIterator<K>}
   */
  keys() {
    return this.map.keys()
  }

  values() {
    return this.map.values()
  }

  entries() {
    return this.map.entries()
  }

  get(key) {
    return this.map.get(key)
  }

  forEach(callBackFunction, thisArg) {
    const cb = callBackFunction.bind(thisArg)
    const self = this
    this.map.forEach((value, key) => cb(value, key, self), thisArg)
  }

  [Symbol.iterator]() {
    const iterator = this.map.keys()
    const getValue = key => this.map.get(key)
    return {
      next() {
        const { value: key, done } = iterator.next()
        if (done) {
          return { value: [], done: true }
        }
        return { value: [key, getValue(key)], done: false }
      }
    }
  }
}
