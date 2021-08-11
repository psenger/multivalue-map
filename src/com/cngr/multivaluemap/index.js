/*
 * Copyright (c) 2021, Philip A Senger (https://github.com/psenger/multivaluemap/blob/development/LICENSE)
 */

'use strict'

const Collection = require('./Collection')
const MultiValueMap = require('./MultiValuedMap')

module.exports = {
  MultiValueMap,
  ArrayCollection: Collection.ArrayCollection,
  SetCollection: Collection.SetCollection,
  Collection: Collection.Collection
}
