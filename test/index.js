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
      replace.all('  foo bar   FOO_BAR  foo_ Bar   foo_bar FooBar ', 'foo bar', 'hello world')
    ).to.equal(
      '  hello world   HELLO_WORLD  foo_ Bar   hello_world HelloWorld '
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
        /(foo|bar|baz)[-_ ]?(foo|bar|baz)/ig,
        function (_, a, b) { return b + ' ' + a }
      )
    ).to.equal(
      '  bar foo   BAR_FOO  bar_baz  bazFoo '
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
  })
})

