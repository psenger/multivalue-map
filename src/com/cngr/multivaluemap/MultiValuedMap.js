/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */
'use strict'

const {ArrayCollection} = require("./Collection");

/**
 * MMultiValuedMap is an ADT ( Advanced Data Type ) and based on Apache Commons Collections.
 * While a Map or Dictionary's keys are associated with a single values, each MultiValueMap's
 * key has multiple values. The behavior of the values stored can be composed with the
 * `option.valueType` or building a class that extends the abstract class `Collection`. The
 * default `option.valueType` is an `ArrayCollection`.
 * @see https://en.wikipedia.org/wiki/Abstract_data_type
 * @type {MultiValuedMap}
 */
module.exports = class MultiValuedMap {

  /**
   * Constructor, with optional initial state of iterable.
   *
   * @param {Iterable} [iterable] - An Array or other iterable object whose elements are
   * key-value pairs (arrays with two elements, e.g. [[ 1, ['one','two'] ],[ 2, ['three'] ]]).
   * Each key-value pair is added to the new Map; null values are treated as undefined.
   * @param {{valueType: Collection}} [options={}] - A decorator, that can be called to supply a
   * value for the collection of values. Optional and defaults to Array
   */
  constructor(iterable, options = {} ) {
    this._valueType = options?.valueType || ArrayCollection;
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
   * Sets the value for the key in the Map object. Returns the Map object reference for chaining.
   * @param {*} key - the key
   * @param {*} value - the value
   * @returns {MultiValuedMap}
   */
  set(key, value) {
    const existingValue = this.map.get(key) || new this._valueType()
    existingValue.setValue(value)
    this.map.set(key, existingValue) // the only reason I need to do this, if the existingValue doesnt exist
    return this
  }

  /**
   * Set All values.
   * @param {*} key - the key
   * @param {Iterable} values - values to feed.
   * @returns {MultiValuedMap}
   */
  setAll(key, values = []) {
    if (typeof values[Symbol.iterator] !== 'function') {
      throw new TypeError(`values is not iterable`)
    }
    for(let value of values) {
      this.set(key, value)
    }
    return this
  }

  /**
   * Returns the number of key/value pairs in the `MultiValueMap` object.
   * @returns {number}
   */
  get size() {
    return this.map.size
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the `MultiValueMap` object or not.
   * @param {*} key - the key
   * @returns {boolean}
   */
  has(key) {
    return this.map.has(key)
  }

  /**
   * Returns true if an element in the `MultiValueMap` object existed and has been removed, or false if the element does not exist. It will return false afterwards.
   * @param {*} key - the key
   * @returns {boolean} - true indicates the value was found and deleted
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
    return this.map.get(key)?.getValue() || null;
  }

  forEach(callBackFunction, thisArg) {
    const cb = callBackFunction.bind(thisArg)
    const self = this
    this.map.forEach((value, key) => cb(value.getValue(), key, self), thisArg)
  }

  [Symbol.iterator]() {
    const iterator = this.map.keys()
    const getValue = key => {
      return this.map.get(key).getValue()
    }
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
