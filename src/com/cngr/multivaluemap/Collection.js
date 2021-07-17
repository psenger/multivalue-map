/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */
'use strict'

const isNill = (value) => value === null || value === undefined;
const not = (fn) => (...args) => !fn(args);
const isNotNill = not(isNill);

/**
 * Abstract class `Collection` must be implemented to be passed as the `option.valueType` in the
 * MulitValueMap class constructor. This abstract class defines the behavior of the values stored
 * in the MultiValueMap. When constructed, the `creator` parameter, a JavaScript Class,  will be
 * called with the `new` operator and stored in a private variable, a reference variable, called
 * `this._proxyObject`
 */
class Collection {
  /**
   * @constructor
   * @param {Class} creator - the class to construct internally
   */
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
}

/**
 * An Array Collection, is just that, an array. This means there can be duplicated values.
 */
class ArrayCollection extends Collection {
  /**
   * @constructor
   */
  constructor() {
    super(Array);
  }

  /**
   * Push a new value into the proxy array object.
   * @param {*} value - if you push null or undefined, it is ignored.
   */
  setValue(value) {
    isNotNill(value) ? this._proxyObject.push(value) : undefined;
  }

  /**
   * Gets a shallow copied array of the array of objects.
   * @return {*[]} - an array of objects.
   */
  getValue() {
    return [ ...this._proxyObject ];
  }
}

/**
 * A Set collection enforces uniqueness IFF the values are primitives ( sorry this is JavaScript
 * not Java ).
 */
class SetCollection extends Collection {
  /**
   * @constructor
   */
  constructor() {
    super(Set);
  }

  /**
   * Add a new Value to the Set.
   * @param {*} value - if you push null or undefined, it is ignored.
   */
  setValue(value) {
    isNotNill(value) ? this._proxyObject.add(value) : undefined;
  }

  /**
   * Get an Array ( a shallow copy ) of the values of the Set.
   * @returns {*[]} All sub classes return an array of the values
   */
  getValue() {
    return Array.from(this._proxyObject);
  }
}

module.exports = {
  Collection,
  ArrayCollection,
  SetCollection,
};
