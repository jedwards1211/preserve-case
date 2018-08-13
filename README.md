# preserve-case

[![Build Status](https://travis-ci.org/jedwards1211/preserve-case.svg?branch=master)](https://travis-ci.org/jedwards1211/preserve-case)
[![Coverage Status](https://codecov.io/gh/jedwards1211/preserve-case/branch/master/graph/badge.svg)](https://codecov.io/gh/jedwards1211/preserve-case)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

case-preserving `string.replace`

## Usage

```
npm install --save preserve-case
```

```js
import replace from 'preserve-case'

console.log(replace.all('foo bar FOO_BAR foo-bar fooBar foo-Bar', 'foo bar', 'baz qux'))
// baz qux BAZ_QUX baz-qux bazQux baz-Qux
```

## API

### `replace(str, query, replacement, [options])`

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
* if `query` is a string, it matches `query` in any case.  (Under the hood, it creates and uses
  a `RegExp` with all `caseTypes` of `query` joined together, e.g.
  `str.replace(/foo bar|FOO BAR|fooBar|FooBar|.../, ...)`)

`options.caseTypes` defaults to all types built into the [`case`](https://github.com/nbubna/Case) package.
This may be more than you want, so look into it.  For instance, the other cases of 'foo bar' include, but may not be
limited to:

```
'Foo Bar'
'Foo bar'
'FOO BAR'
'fooBar'
'FooBar'
'foo-bar'
'Foo-Bar'
'foo_bar'
'FOO_BAR'
```

### `replace.all(str, query, replacement, [options])`

Unlike `replace`, this replaces *all* occurrences of `query`, not just the first one, even if `query` is a `string` or
a `RegExp` without the `g` (global) flag.

## Acknowledgements

Thanks to Nathan Bubna for his [`case`](https://github.com/nbubna/Case) package, which powers `preserve-case`!
