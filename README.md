# Multi Value Map
_ES6 Multi Value Map for NodeJS_

A Multi Value Map is a decorated map, allowing it to have more than one value for a key.
Additionally, it has slightly different semantics. Putting a value into the map will add the value to a Array. Getting a value will return an Array, holding all the values put into that key.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

<!--START_SECTION:toc-->

## Table of contents
- [Multi Value Map](#multi-value-map)
  * [Installation Instructions](#installation-instructions)
  * [API](#api)
    + [Collection](#collection)
      - [Parameters](#parameters)
      - [setValue](#setvalue)
        * [Parameters](#parameters-1)
      - [getValue](#getvalue)
      - [iterator](#iterator)
    + [ArrayCollection](#arraycollection)
      - [setValue](#setvalue-1)
        * [Parameters](#parameters-2)
      - [getValue](#getvalue-1)
    + [SetCollection](#setcollection)
      - [setValue](#setvalue-2)
        * [Parameters](#parameters-3)
      - [getValue](#getvalue-2)
    + [MultiValuedMapOption](#multivaluedmapoption)
      - [Properties](#properties)
    + [MultiValuedMap](#multivaluedmap)
      - [Parameters](#parameters-4)
      - [Examples](#examples)
      - [set](#set)
        * [Parameters](#parameters-5)
        * [Examples](#examples-1)
      - [setAll](#setall)
        * [Parameters](#parameters-6)
        * [Examples](#examples-2)
      - [size](#size)
        * [Examples](#examples-3)
      - [has](#has)
        * [Parameters](#parameters-7)
        * [Examples](#examples-4)
      - [delete](#delete)
        * [Parameters](#parameters-8)
        * [Examples](#examples-5)
      - [clear](#clear)
        * [Examples](#examples-6)
      - [keys](#keys)
      - [values](#values)
      - [entries](#entries)
        * [Examples](#examples-7)
      - [get](#get)
        * [Parameters](#parameters-9)
        * [Examples](#examples-8)
  * [Example Usage](#example-usage)
  * [Deployment Steps](#deployment-steps)
  * [License](#license)

<!--END_SECTION:toc-->

<!--START_SECTION:file:INSTALLATION.md-->
## Installation Instructions

```bash
npm install @psenger/multivalue-map --save
```

or

```bash
yarn add @psenger/multivalue-map
```

<!--END_SECTION:file:INSTALLATION.md-->

<!--START_SECTION:jsdoc-->
## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Collection

Abstract class `Collection` must be implemented to be passed as the `option.valueType` in the
MultiValueMap class constructor. This abstract class defines the behavior of the values stored
in the MultiValueMap. When constructed, the `creator` parameter, a JavaScript Class,  will be
called with the `new` operator and stored in a private variable, a reference variable, called
`this._proxyObject`

#### Parameters

*   `creator` **Class** the class to construct internally

#### setValue

Setting the value hides the implementation and off loads the behavior to the Proxy
Object.Each backing proxy has different behaviors.

##### Parameters

*   `value` **any** Passing the value as Null or Undefined are ignored.

#### getValue

Get the values from the Proxy Object, as a shallow copy array.

Returns **[Array][1]\<any>** All sub classes return a shallow copy array of the values

#### iterator

Iterator

### ArrayCollection

**Extends Collection**

An Array Collection, is just that, an array. This means there can be duplicated values.

#### setValue

**Extends Collection**

Push a new value into the proxy array object.

##### Parameters

*   `value` **any** if you push null or undefined, it is ignored.

#### getValue

**Extends Collection**

Gets a shallow copied array of the array of objects.

Returns **[Array][1]\<any>** an array of objects.

### SetCollection

**Extends Collection**

A Set collection enforces uniqueness IFF the values are primitives ( sorry this is JavaScript
not Java ).

#### setValue

**Extends Collection**

Add a new Value to the Set.

##### Parameters

*   `value` **any** if you push null or undefined, it is ignored.

#### getValue

**Extends Collection**

Get an Array ( a shallow copy ) of the values of the Set.

Returns **[Array][1]\<any>** All sub classes return an array of the values

### MultiValuedMapOption

A MultiValuedMap constructor option

Type: [Object][2]

#### Properties

*   `valueType` **[Collection][3]** Indicates the value class and implements the `Collection`

### MultiValuedMap

*   **See**: [wikipedia][4] for further
    information on Advanced Data Types
*   **See**: [wikipedia][5] for further information on MultiMap

MultiValuedMap is an ADT ( Advanced Data Type ) and based on Apache Commons Collections.
While a Map or Dictionary's keys are associated with a single values, each MultiValueMap's
key has multiple values. The cardinality of the values stored can be composed with the
property `option.valueType` or building a class that extends the abstract class `Collection`.
The default `option.valueType` is an `ArrayCollection`.

Type: [MultiValuedMap][6]

#### Parameters

*   `iterable` **Iterable?** An Array or other iterable object whose elements are
    key-value pairs (arrays with two elements, e.g. \[\[ 1, \['one','two'] ],\[ 2, \['three'] ]]).
    Each key-value pair is added to the new Map; null values are treated as undefined.
*   `options` **[MultiValuedMapOption][7]** An option object literal. (optional, default `{}`)

    *   `options.valueType` **[Collection][3]** A decorator, that can be
        called to supply a value for the collection of values. Optional and defaults to Array (optional, default `{ArrayCollection}`)

#### Examples

```javascript
const ar = [['a',[1,2,2]],['b',[1,1]]];
const a = new MultiValueMap();
const a = new MultiValueMap( ar );
const a = new MultiValueMap( ar, { valueType: ArrayCollection });
const b = new MultiValueMap( ar, { valueType: SetCollection });
const b = new MultiValueMap( null, { valueType: SetCollection });
```

**Meta**

*   **version**: 1.1.1

#### set

Sets the value for the key in the Map object. Returns the Map object reference for chaining.

##### Parameters

*   `key` **any** the key
*   `value` **any** the value

##### Examples

```javascript
const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
mvm.set('D', 'E')
```

Returns **[MultiValuedMap][6]** 

#### setAll

Set All values.

##### Parameters

*   `key` **any** the key
*   `values` **Iterable** values to feed. (optional, default `[]`)

##### Examples

```javascript
const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
mvm.setAll('F',['G','H','H','H'])
```

Returns **[MultiValuedMap][6]** 

#### size

Returns the number of key/value pairs in the `MultiValueMap` object.

##### Examples

```javascript
const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
mvm.set('D', 'E')
mvm.set('D', 'E')
mvm.set('D', 'E')
mvm.setAll('F',['G','H','H','H'])
console.log('mvm.size=', mvm.size); // mvm.size= 3
```

Returns **[number][8]** 

#### has

Returns a boolean asserting whether a value has been associated to the key in the `MultiValueMap` object or not.

##### Parameters

*   `key` **any** the key

##### Examples

```javascript
if ( ! mvm.has('non existing') ) {
  console.log('not here');
}
if ( mvm.has('D') ) {
  console.log('here');
}
```

Returns **[boolean][9]** indicates a value exists in the MultiValueMap

#### delete

Returns true if an element in the `MultiValueMap` object existed and has been removed, or false if the element does not exist. It will return false afterwards.

##### Parameters

*   `key` **any** the key

##### Examples

```javascript
if ( ! mvm.delete('A') ) {
  console.log('A was not deleted');
}
```

Returns **[boolean][9]** true indicates the value was found and deleted

#### clear

Removes all key/value pairs from the Multi Value Map object.

##### Examples

```javascript
mvm.clear()
```

#### keys

Returns a new Iterator object that contains an array of \[key, \[value]] for each element in the Map object in insertion order.

Returns **IterableIterator\<any>** 

#### values

Return all the values in the Map.

Returns **IterableIterator\<any>** An iterable value, composed of what ever values or value
was inserted into the map.

#### entries

The entries in the map, key value pair.

##### Examples

```javascript
const data = [
   [ 'a', ['1','2','3'] ],
   [ 'b', ['4'] ],
   [ 'c', ['5','6'] ]
]
const mvn = new MultiValueMap(data);
for (let [key, values] of mvn.entries()) {
  console.log(key, values.getValue());
}
// a [ '1', '2', '3' ]
// b [ '4' ]
// c [ '5', '6' ]
```

Returns **IterableIterator<\[any, IterableIterator\<any>]>** 

#### get

get the values associated with the key.

##### Parameters

*   `key` **any** The key

##### Examples

```javascript
const mvm = new MultiValueMap([iterable])
mvm.set('Captain Marvel', 'Carol Danvers')
const value = mvm.get('Captain Marvel')
console.log( value ) // ['Carol Danvers']
```

Returns **(any | null)** 

[1]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[2]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[3]: #collection

[4]: https://en.wikipedia.org/wiki/Abstract_data_type

[5]: https://en.wikipedia.org/wiki/Multimap

[6]: #multivaluedmap

[7]: #multivaluedmapoption

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

<!--END_SECTION:jsdoc-->

<!--START_SECTION:file:TUTORIAL.md-->
## Example Usage

```javascript
const preData = [['A',['B','B','C']]]
const mvm = new MultiValueMap(preData,{ valueType: SetCollection })
mvm.set('D', 'E')
mvm.set('D', 'E')
const value = mvm.get('A')
console.log( value ) // [ 'B', 'C' ]
for (let [key, values] of mvm.entries()) {
  console.log(key, values.getValue());
}
// A [ 'B', 'C' ]
// D [ 'E' ]
```

<!--END_SECTION:file:TUTORIAL.md-->

## Deployment Steps

These are notes for deploying to NPM. I used `npmrc` to manage my NPM identities
(`npm i npmrc -g` to install ). Then I created a new profile called `public` with
(`npmrc -c public`) and then switch to it with `npmrc public`.

* create a pull request from `dev` to `main`
* check out `main`
* `npm version patch -m "message here" or minor`
* `npm publish --access public`
* Then switch to `dev` branch
* And then merge `main` into `dev` and push `dev` to origin

## License

<!--START_SECTION:file:LICENSE-->
MIT License

Copyright (c) 2021 Philip A Senger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

<!--END_SECTION:file:LICENSE-->

MIT © [psenger](https://github.com/psenger)
