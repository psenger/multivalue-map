
# Multi Value Map
_ES6 Multi Value Map for NodeJS_

A Multi Value Map is a decorated map, allowing it to have more than one value for a key.
Additionally, it has slightly different semantics. Putting a value into the map will add the value to a Array. Getting a value will return an Array, holding all the values put into that key.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Table of contents

- [Multi Value Map](#multi-value-map)
  * [Table of contents](#table-of-contents)
  * [Installation](#installation)
    + [Yarn](#yarn)
    + [NPM](#npm)
  * [Usage](#usage)
  * [API](#api)
    + [Constructor](#constructor)
      - [Parameters](#parameters)
  * [License](#license)

## Installation

### Yarn

```bash
yarn add multivaluemap --save
```

### NPM

```bash
npm install multivaluemap --save
```

## Usage

Multi value map is effectively a Map, with the values as an array.

## API

### Constructor

```javascript
new MultiValueMap([iterable])
```

#### Parameters

### set

```javascript
const mvm = new MultiValueMap([iterable])
mvm.set('Captain Marvel', 'Carol Danvers')
const value = mvm.get('Captain Marvel')
console.log( value ) // ['Carol Danvers']

```

#### Parameters


## License
