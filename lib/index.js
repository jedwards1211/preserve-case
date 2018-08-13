'use strict'

var Case = require('case')
var getFlags = require('./getFlags')

function doReplace(str, query, replacement) {
  if (typeof replacement === 'function') {
    return str.replace(query, function (match) {
      var replaced = replacement.apply(this, arguments)
      var type = Case.of(match)
      return type ? Case[type](replaced) : replaced
    })
  } else if (replacement.indexOf('$') >= 0) {
    return str.replace(query, function (match) {
      var submatches = arguments
      var offset = arguments[arguments.length - 2]
      var convertedReplacement = replacement.replace(/\$([$&`']|\d{1,2})/g, function (specialPattern, controlChars) {
        switch (controlChars) {
        case '$': return '$'
        case '&': return match
        case '`': return str.substring(0, offset)
        case '\'': return str.substring(offset + match.length)
        }
        var submatchIndex = parseInt(controlChars)
        if (submatchIndex < 1 || submatchIndex >= submatches.length - 2) {
          return specialPattern
        }
        return submatches[submatchIndex]
      })
      var type = Case.of(match)
      return type ? Case[type](match.replace(query, convertedReplacement)) : match.replace(query, convertedReplacement)
    })
  } else {
    return str.replace(query, function (match) {
      var type = Case.of(match)
      return type ? Case[type](replacement) : replacement
    })
  }
}

function replace(str, query, replacement, options) {
  var caseTypes = options && options.caseTypes || Case._.types
  if (typeof query === 'string') {
    query = new RegExp(caseTypes.map(function (type) { return Case[type](query) }).join('|'))
  }
  return doReplace(str, query, replacement)
}

replace.all = function replaceAll(str, query, replacement, options) {
  var caseTypes = options && options.caseTypes || Case._.types
  if (query instanceof RegExp) {
    if (!query.global) {
      query = new RegExp(query.source, getFlags(query) + 'g')
    }
  } else {
    query = new RegExp(caseTypes.map(function (type) {
      return Case[type](String(query))
    }).join('|'), 'g')
  }
  return doReplace(str, query, replacement)
}

module.exports = replace
