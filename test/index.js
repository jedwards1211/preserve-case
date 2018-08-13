var Case = require('case')
var replace = require('..')
var expect = require('chai').expect

describe('replace', function () {
  it('works', function () {
    expect(
      replace('  foo bar   FOO_BAR  foo_bar FooBar ', 'foo bar', 'hello world')
    ).to.equal(
      '  hello world   FOO_BAR  foo_bar FooBar '
    )

    expect(
      replace(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/i,
        function (_, a, b) { return b + ' ' + a }
      )
    ).to.equal(
      '  bar foo   FOO_BAR  baz_bar  fooBaz '
    )

    expect(
      replace(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/i,
        '$2 $1 $0 $3'
      )
    ).to.equal(
      '  bar foo $0 $3   FOO_BAR  baz_bar  fooBaz '
    )

    expect(
      replace(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/i,
        '$2 $1 $$ $\' $` $&'
      )
    ).to.equal(
      '  bar foo $    foo_bar  baz_bar  foobaz     foo bar   FOO_BAR  baz_bar  fooBaz '
    )

    expect(
      replace(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/ig,
        function (_, a, b) { return b + ' ' + a }
      )
    ).to.equal(
      '  bar foo   BAR_FOO  bar_baz  bazFoo '
    )
  })
  it('works with custom caseTypes', function () {
    expect(
      replace('  foo bar   FOO_BAR  foo_bar FooBar ', 'foo bar', 'hello world', {caseTypes: ['snake', 'constant']})
    ).to.equal(
      '  foo bar   HELLO_WORLD  foo_bar FooBar '
    )
  })
  it("works when case can't be determined", function () {
    expect(
      replace('foo_ Bar', /foo_ bar/i, 'Hello World')
    ).to.equal(
      'Hello World'
    )
    expect(
      replace('foo_ Bar', /(foo)_ (bar)/i, function (_, foo, bar) {
        return Case[Case.of(foo)]('Hello') + ' ' + Case[Case.of(bar)]('world')
      })
    ).to.equal(
      'hello World'
    )
  })
})

describe('replace.all', function () {
  it('works', function () {
    expect(
      replace.all('  foo bar   FOO_BAR  foo_ Bar   foo_bar FooBar ', 'foo bar', 'hello world')
    ).to.equal(
      '  hello world   HELLO_WORLD  foo_ Bar   hello_world HelloWorld '
    )

    expect(
      replace.all(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/i,
        function (_, a, b) { return b + ' ' + a }
      )
    ).to.equal(
      '  bar foo   BAR_FOO  bar_baz  bazFoo '
    )
    expect(
      replace.all(
        '  foo bar   FOO_BAR  baz_bar  fooBaz ',
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/ig,
        function (_, a, b) { return b + ' ' + a }
      )
    ).to.equal(
      '  bar foo   BAR_FOO  bar_baz  bazFoo '
    )
  })
  it('works with custom caseTypes', function () {
    expect(
      replace.all('  foo bar   FOO_BAR  foo_bar FooBar ', 'foo bar', 'hello world', {caseTypes: ['snake', 'constant']})
    ).to.equal(
      '  foo bar   HELLO_WORLD  hello_world FooBar '
    )
  })
  it('works on non-string/RegExp query', function () {
    expect(
      replace.all('  null NULL  Null ', null, 'blah')
    ).to.equal(
      '  blah BLAH  Blah '
    )
  })
})
