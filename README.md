# case-preserving-replace

[![Build Status](https://travis-ci.org/jedwards1211/case-preserving-replace.svg?branch=master)](https://travis-ci.org/jedwards1211/case-preserving-replace)
[![Coverage Status](https://coveralls.io/repos/github/jedwards1211/case-preserving-replace/badge.svg?branch=master)](https://coveralls.io/github/jedwards1211/case-preserving-replace?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

case-preserving `string.replace`

## Usage

```
npm install --save case-preserving-replace
```

```js
import replace from 'case-preserving-replace'

console.log(replace('foo bar FOO_BAR foo-bar fooBar foo-Bar', 'foo bar', 'baz qux'))
// baz qux BAZ_QUX baz-qux bazQux baz-Qux
```

### API

```js
replace(
  str: string,
  query: string | RegExp,
  replacement: string | Function,
  options?: {
      caseTypes?: Array<string>
  }
): string`
```

Works exactly like `str.replace(query, replacement)`, except that:
* it preserves the case of what it replaces (using the marvelous `case` package)
* if `query` is a `string` it replaces *all* occurrences of it in *any case* (i.e. any of `caseTypes`)

`options.caseTypes` defaults to `require('case')._.types`.

