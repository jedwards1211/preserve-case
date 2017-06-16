var replace = require('..')
var expect = require('chai').expect

describe('replace', function () {
  it('works', function () {
    expect(
      replace('  foo bar   FOO_BAR  foo_bar FooBar ', 'foo bar', 'hello world')
    ).to.equal(
      '  hello world   HELLO_WORLD  hello_world HelloWorld '
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
})

