'use strict'

var Case = require('case')

function replace(str, query, replacement, options) {
  var caseTypes = options && options.caseTypes || Case._.types
  if (typeof query === 'string') {
    query = new RegExp(caseTypes.map(function (type) { return Case[type](query) }).join('|'), 'g')
  }
  return str.replace(query, function (match) {
    return Case[Case.of(match)](
      typeof replacement === 'function'
        ? replacement.apply(this, arguments)
        : replacement
    )
  })
}

module.exports = replace

