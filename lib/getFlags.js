'use strict'

// istanbul ignore next
function getFlags(rx) {
  if (rx.flags != null) return rx.flags
  var flags = ''
  if (rx.global) flags += 'g'
  if (rx.ignoreCase) flags += 'i'
  if (rx.multiline) flags += 'm'
  if (rx.sticky) flags += 'y'
  if (rx.unicode) flags += 'u'
  return flags
}

module.exports = getFlags

