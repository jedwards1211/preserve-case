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
      return type ? Case[type](convertedReplacement) : convertedReplacement
    })
  } else {
    return str.replace(query, function (match) {
      var type = Case.of(match)
      return type ? Case[type](replacement) : replacement
    })
  }
}

function replace(str, query, replacement, options) {
  if (typeof query === 'string') {
    query = replace.createSearchRegExp(query, options)
  }
  return doReplace(str, query, replacement)
}

replace.createSearchRegExp = function createSearchRegExp(query, options) {
  query = String(query)
  var caseTypes = options && options.caseTypes || Case._.types
  var flags = options && options.flags || ''
  if (flags.indexOf('u') < 0) {
    for (var i = 0, length = query.length; i < length; i++) {
      if (query.charCodeAt(i) >= 128) {
        flags += 'u'
        break
      }
    }
  }
  return new RegExp(caseTypes.map(function (type) { return Case[type](query) }).join('|'), flags)
}

replace.all = function replaceAll(str, query, replacement, options) {
  var caseTypes = options && options.caseTypes || Case._.types
  if (query instanceof RegExp) {
    if (!query.global) {
      query = new RegExp(query.source, getFlags(query) + 'g')
    }
  } else {
    query = replace.createSearchRegExp(query, {caseTypes: caseTypes, flags: 'g'})
  }
  return doReplace(str, query, replacement)
}

module.exports = replace
