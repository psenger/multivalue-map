<div align="center">

# @psenger/multivalue-map

**An ES6 Map where each key holds a collection of values, not just one.**

[![Node.js CI](https://github.com/psenger/multivalue-map/actions/workflows/test.yml/badge.svg)](https://github.com/psenger/multivalue-map/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/@psenger/multivalue-map.svg)](https://www.npmjs.com/package/@psenger/multivalue-map)
[![Node.js >= 22](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

[Installation](#installation-instructions) • [API](#api) • [Usage](#example-usage) • [Contributing](./CONTRIBUTING.md) • [Security](./SECURITY.md)

</div>

---

`@psenger/multivalue-map` is a lightweight ES6 `Map` extension where each key maps to a _collection_ of values rather than a single one. Based on the [Multimap](https://en.wikipedia.org/wiki/Multimap) abstract data type, it lets you `set` multiple values per key and `get` them back as an array. The collection type is pluggable: use `ArrayCollection` (default) to preserve duplicates, or `SetCollection` to enforce uniqueness among primitive values.

<!--START_SECTION:toc-->

## Table of contents
- [@psenger/multivalue-map](#psengermultivalue-map)
  * [Installation Instructions](#installation-instructions)
  * [API](#api)
  * [Example Usage](#example-usage)
  * [Development](#development)
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

## Development

```bash
git clone https://github.com/psenger/multivalue-map.git
cd multivalue-map
nvm use
npm install
npm test
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full development and contribution guide.

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

---

<div align="center">

**A multi-value map for Node.js — when one value per key is not enough.**

[Report Bug](https://github.com/psenger/multivalue-map/issues/new?template=bug_report.yml) • [Request Feature](https://github.com/psenger/multivalue-map/issues/new?template=feature_request.yml) • [npm](https://www.npmjs.com/package/@psenger/multivalue-map)

</div>
