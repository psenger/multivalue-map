'use strict';

/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */

const isNill = (value) => value === null || value === undefined;
const not = (fn) => (...args) => !fn(...args);
const isSet = not(isNill);

/**
 * Abstract class `Collection` must be implemented to be passed as the `option.valueType` in the
 * MulitValueMap class constructor. This abstract class defines the behavior of the values stored
 * in the MultiValueMap. When constructed, the `creator` parameter, a JavaScript Class,  will be
 * called with the `new` operator and stored in a private variable, a reference variable, called
 * `this._proxyObject`
 * @param {Class} creator - the class to construct internally
 * @version 1.1.1
 */
class Collection$1 {

  constructor(creator) {
    this._proxyObject = new creator();
  }

  /**
   * Setting the value hides the implementation and off loads the behavior to the Proxy
   * Object.Each backing proxy has different behaviors.
   * @abstract
   * @param {*} value - Passing the value as Null or Undefined are ignored.
   */
  setValue(value) {
    throw new Error("This method must be overwritten!");
  }

  /**
   * Get the values from the Proxy Object, as a shallow copy array.
   * @abstract
   * @returns {*[]} All sub classes return a shallow copy array of the values
   */
  getValue() {
    throw new Error("This method must be overwritten!");
  }

  /**
   * Iterator
   * @abstract
   */
  [Symbol.iterator]() {
    throw new Error("This method must be overwritten!");
  }
}

/**
 * An Array Collection, is just that, an array. This means there can be duplicated values.
 * @constructor
 */
class ArrayCollection$1 extends Collection$1 {

  constructor() {
    super(Array);
  }

  /**
   * Push a new value into the proxy array object.
   * @augments Collection
   * @param {*} value - if you push null or undefined, it is ignored.
   */
  setValue(value) {
     if ( isSet(value) ) {
       this._proxyObject.push(value);
     }
  }

  /**
   * Gets a shallow copied array of the array of objects.
   * @augments Collection
   * @return {*[]} - an array of objects.
   */
  getValue() {
    return [ ...this._proxyObject ];
  }

  [Symbol.iterator]() {
    return this._proxyObject[Symbol.iterator]();
  }
}

/**
 * A Set collection enforces uniqueness IFF the values are primitives ( sorry this is JavaScript
 * not Java ).
 * @constructor
 */
class SetCollection extends Collection$1 {

  constructor() {
    super(Set);
  }

  /**
   * Add a new Value to the Set.
   * @augments Collection
   * @param {*} value - if you push null or undefined, it is ignored.
   */
  setValue(value) {
    isSet(value) ? this._proxyObject.add(value) : undefined;
  }

  /**
   * Get an Array ( a shallow copy ) of the values of the Set.
   * @augments Collection
   * @returns {*[]} All sub classes return an array of the values
   */
  getValue() {
    return Array.from(this._proxyObject);
  }

  [Symbol.iterator]() {
    return this._proxyObject[Symbol.iterator]();
  }

}

var Collection_1 = {
  Collection: Collection$1,
  ArrayCollection: ArrayCollection$1,
  SetCollection,
};

/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */

const {ArrayCollection} = Collection_1;

/**
 * A MultiValuedMap constructor option
 * @typedef {Object} MultiValuedMapOption
 * @property {Collection} valueType - Indicates the value class and implements the `Collection`
 */

/**
 * MultiValuedMap is an ADT ( Advanced Data Type ) and based on Apache Commons Collections.
 * While a Map or Dictionary's keys are associated with a single values, each MultiValueMap's
 * key has multiple values. The cardinality of the values stored can be composed with the
 * property `option.valueType` or building a class that extends the abstract class `Collection`.
 * The default `option.valueType` is an `ArrayCollection`.
 * @version 1.1.1
 * @see {@link https://en.wikipedia.org/wiki/Abstract_data_type|wikipedia} for further
 * information on Advanced Data Types
 * @see {@link https://en.wikipedia.org/wiki/Multimap|wikipedia} for further information on MultiMap
 * @param {Iterable} [iterable] - An Array or other iterable object whose elements are
 * key-value pairs (arrays with two elements, e.g. [[ 1, ['one','two'] ],[ 2, ['three'] ]]).
 * Each key-value pair is added to the new Map; null values are treated as undefined.
 * @param {MultiValuedMapOption} [options={}] - An option object literal.
 * @param {Collection} [options.valueType={ArrayCollection}] - A decorator, that can be
 * called to supply a value for the collection of values. Optional and defaults to Array
 * @constructs MultiValuedMap
 * @class {MultiValuedMap}
 * @example
 * const ar = [['a',[1,2,2]],['b',[1,1]]];
 * const a = new MultiValueMap();
 * const a = new MultiValueMap( ar );
 * const a = new MultiValueMap( ar, { valueType: ArrayCollection });
 * const b = new MultiValueMap( ar, { valueType: SetCollection });
 * const b = new MultiValueMap( null, { valueType: SetCollection });
 */
class MultiValuedMap {

  constructor(iterable, options = {} ) {
    this._valueType = options?.valueType || ArrayCollection;
    this.map = new Map();
    if (iterable) {
      if (typeof iterable[Symbol.iterator] !== 'function') {
        throw new TypeError(`${iterable} is not iterable`)
      } else {
        for (const kvp of iterable) {
          if (typeof (kvp.entries) === 'undefined') {
            throw new TypeError(`Iterator value a is not an entry object`)
          }
          const [key, values] = kvp;
          if (Array.isArray(values)) {
            values.forEach(value => {
              this.set(key, value);
            });
          } else {
            this.set(key, values);
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
   * @example
   * const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
   * mvm.set('D', 'E')
   */
  set(key, value) {
    const existingValue = this.map.get(key) || new this._valueType();
    existingValue.setValue(value);
    this.map.set(key, existingValue); // the only reason I need to do this, if the existingValue doesnt exist
    return this
  }

  /**
   * Set All values.
   * @param {*} key - the key
   * @param {Iterable} values - values to feed.
   * @returns {MultiValuedMap}
   * @example
   * const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
   * mvm.setAll('F',['G','H','H','H'])
   */
  setAll(key, values = []) {
    if (typeof values[Symbol.iterator] !== 'function') {
      throw new TypeError(`values is not iterable`)
    }
    for(let value of values) {
      this.set(key, value);
    }
    return this
  }

  /**
   * Returns the number of key/value pairs in the `MultiValueMap` object.
   * @returns {number}
   * @example
   * const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
   * mvm.set('D', 'E')
   * mvm.set('D', 'E')
   * mvm.set('D', 'E')
   * mvm.setAll('F',['G','H','H','H'])
   * console.log('mvm.size=', mvm.size); // mvm.size= 3
   */
  get size() {
    return this.map.size
  }

  /**
   * Returns a boolean asserting whether a value has been associated to the key in the `MultiValueMap` object or not.
   * @param {*} key - the key
   * @returns {boolean} - indicates a value exists in the MultiValueMap
   * @example
   * if ( ! mvm.has('non existing') ) {
   *   console.log('not here');
   * }
   * if ( mvm.has('D') ) {
   *   console.log('here');
   * }
   */
  has(key) {
    return this.map.has(key)
  }

  /**
   * Returns true if an element in the `MultiValueMap` object existed and has been removed, or false if the element does not exist. It will return false afterwards.
   * @param {*} key - the key
   * @returns {boolean} - true indicates the value was found and deleted
   * @example
   * if ( ! mvm.delete('A') ) {
   *   console.log('A was not deleted');
   * }
   */
  delete(key) {
    return this.map.delete(key)
  }

  /**
   * Removes all key/value pairs from the Multi Value Map object.
   * @example
   * mvm.clear()
   */
  clear() {
    this.map.clear();
  }

  /**
   * Returns a new Iterator object that contains an array of [key, [value]] for each element in the Map object in insertion order.
   * @returns {IterableIterator<K>}
   */
  keys() {
    return this.map.keys()
  }

  /**
   * Return all the values in the Map.
   * @return {IterableIterator<any>} - An iterable value, composed of what ever values or value
   * was inserted into the map.
   */
  values() {
    return this.map.values()
  }

  /**
   * The entries in the map, key value pair.
   * @return {IterableIterator<[any, IterableIterator<any>]>}
   * @example
   * const data = [
   *    [ 'a', ['1','2','3'] ],
   *    [ 'b', ['4'] ],
   *    [ 'c', ['5','6'] ]
   * ]
   * const mvn = new MultiValueMap(data);
   * for (let [key, values] of mvn.entries()) {
   *   console.log(key, values.getValue());
   * }
   * > a [ '1', '2', '3' ]
   * > b [ '4' ]
   * > c [ '5', '6' ]
   */
  entries() {
    return this.map.entries()
  }

  /**
   * get the values associated with the key.
   * @param {*} key - The key
   * @return {*|null}
   * @example
   * const mvm = new MultiValueMap([iterable])
   * mvm.set('Captain Marvel', 'Carol Danvers')
   * const value = mvm.get('Captain Marvel')
   * console.log( value ) // ['Carol Danvers']
   */
  get(key) {
    return this.map.get(key)?.getValue() || null;
  }

  forEach(callBackFunction, thisArg) {
    const cb = callBackFunction.bind(thisArg);
    const self = this;
    this.map.forEach((value, key) => cb(value.getValue(), key, self), thisArg);
  }

  [Symbol.iterator]() {
    const iterator = this.map.keys();
    const getValue = key => {
      return this.map.get(key).getValue()
    };
    return {
      next() {
        const { value: key, done } = iterator.next();
        if (done) {
          return { value: [], done: true }
        }
        return { value: [key, getValue(key)], done: false }
      }
    }
  }
}

var MultiValuedMap_1 = MultiValuedMap;

/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */

const Collection = Collection_1;
const MultiValueMap = MultiValuedMap_1;

var multivaluemap = {
  MultiValueMap,
  ArrayCollection: Collection.ArrayCollection,
  SetCollection: Collection.SetCollection,
  Collection: Collection.Collection,
};

module.exports = multivaluemap;
//# sourceMappingURL=index.js.map
