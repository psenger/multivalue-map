# Multi Value Map

[![npm version](https://img.shields.io/npm/v/@psenger/multivalue-map.svg)](https://www.npmjs.com/package/@psenger/multivalue-map)
[![Node.js >= 22](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

A Multi Value Map is an ES6 `Map` where each key holds a collection of values rather than a single value. Putting a value into the map appends it to the key's collection. Getting a value returns the full collection as an `Array`.

The cardinality of each key's collection is controlled by a pluggable `Collection` class: use `ArrayCollection` to allow duplicates, or `SetCollection` to enforce uniqueness among primitives.

<!--START_SECTION:toc-->

## Table of contents
- [Multi Value Map](#multi-value-map)
  * [Installation Instructions](#installation-instructions)
  * [API](#api)
  * [Example Usage](#example-usage)
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
