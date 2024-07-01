import { expect, test } from 'vitest'
import jexl from '../src'

test('convert to string', () => {
    expect(jexl.evalSync('string(123)')).toBe('123')
    expect(jexl.evalSync('123456|string')).toBe('123456')
    expect(jexl.evalSync(`{a:123456}|string`)).toBe('{"a":123456}')
})

test('length', () => {
    expect(jexl.evalSync('\'test123\'|length')).toBe(7)
    expect(jexl.evalSync('["a",1,"b"]|length')).toBe(3)
    expect(jexl.evalSync('$length(["a",1,"b"])')).toBe(3)
})

test('substring', () => {
    expect(jexl.evalSync('substring(123456,2,2)')).toBe('34')
    expect(jexl.evalSync('$substring(\'test\',(-2))')).toBe('st')
    expect(jexl.evalSync('$substring($string({a:123456}, true),0,1)')).toBe('{')
})

test('substringBefore', () => {
    expect(jexl.evalSync('"hello world"|substringBefore(" ")')).toBe('hello')
    expect(jexl.evalSync('substringBefore("hello world", "o")')).toBe('hell')
    expect(jexl.evalSync('substringBefore("hello world", "x")')).toBe('hello world')
    expect(jexl.evalSync('substringBefore(123456,2)')).toBe('1')
})

test('substringAfter', () => {
    expect(jexl.evalSync('"hello world"|substringAfter(" ")')).toBe('world')
    expect(jexl.evalSync('substringAfter("hello world", "o")')).toBe(' world')
    expect(jexl.evalSync('substringAfter("hello world", "x")')).toBe('')
    expect(jexl.evalSync('substringAfter(123456,2)')).toBe('3456')
})

test('uppercase', () => {
    expect(jexl.evalSync('uppercase("hello world")')).toBe('HELLO WORLD')
    expect(jexl.evalSync('uppercase(123456)')).toBe('123456')
    expect(jexl.evalSync('\'baz\'|uppercase')).toBe('BAZ')
})

test('lowercase', () => {
    expect(jexl.evalSync('lowercase("HELLO WORLD")')).toBe('hello world')
    expect(jexl.evalSync('lowercase(123456)')).toBe('123456')
    expect(jexl.evalSync('$lowercase(\'FOObar\')')).toBe('foobar')
})

test('camelPascalCase', () => {
    expect(jexl.evalSync('\'foo bar \'|camelCase')).toBe('fooBar')
    expect(jexl.evalSync('$camelCase(\'Foo_bar\')')).toBe('fooBar')
    expect(jexl.evalSync('\'FooBar\'|toCamelCase')).toBe('fooBar')
    expect(jexl.evalSync('\'foo bar\'|toPascalCase')).toBe('FooBar')
    expect(jexl.evalSync('\'fooBar\'|toPascalCase')).toBe('FooBar')
    expect(jexl.evalSync('\'Foo_bar\'|toPascalCase')).toBe('FooBar')
})

test('trimPad', () => {
    expect(jexl.evalSync('trim(" baz  ")')).toBe('baz')
    expect(jexl.evalSync('trim("  baz  ")')).toBe('baz')
    expect(jexl.evalSync('pad("foo",5)')).toBe('foo  ')
    expect(jexl.evalSync('pad("foo",(-5),0)')).toBe('00foo')
})

test('contains', () => {
    expect(jexl.evalSync('\'foo-bar\'|contains(\'bar\')')).toBe(true)
    expect(jexl.evalSync('\'foo-bar\'|contains(\'baz\')')).toBe(false)
    expect(jexl.evalSync('["foo-bar"]|contains("bar")')).toBe(false)
    expect(jexl.evalSync('["foo-bar"]|contains("foo-bar")')).toBe(true)
    expect(jexl.evalSync('["baz", "foo", "bar"]|contains("bar")')).toBe(true)
})

test('replace', () => {
    expect(jexl.evalSync('replace("foo-bar", "-", "_")')).toBe('foo_bar')
    expect(jexl.evalSync('replace("foo-bar", "-", "")')).toBe('foobar')
    expect(jexl.evalSync('replace("foo-bar", "-", "")')).toBe('foobar')
    expect(jexl.evalSync('replace("foo-bar", "-", "")')).toBe('foobar')
    expect(jexl.evalSync('replace("foo-bar", "-", "")')).toBe('foobar')
})

test('split', () => {
    expect(jexl.evalSync('split("foo-bar", "-")')).toEqual(['foo', 'bar'])
})

test('join', () => {
    expect(jexl.evalSync('join(["foo", "bar"], "-")')).toBe('foo-bar')
    expect(jexl.evalSync('join(["foo", "bar"], "")')).toBe('foobar')
})

test('convertBase64', () => {
    expect(jexl.evalSync('\'foobar\'|base64Encode')).toBe('Zm9vYmFy')
    expect(jexl.evalSync('\'Zm9vYmFy\'|base64Decode')).toBe('foobar')
})

test('number', () => {
    expect(jexl.evalSync('$number("1")')).toBe(1)
    expect(jexl.evalSync('$number("1.1")')).toBe(1.1)
    expect(jexl.evalSync('$number("-1.1")')).toBe(-1.1)
    expect(jexl.evalSync('$number(-1.1)')).toBe(-1.1)
    expect(jexl.evalSync('$number(-1.1)|floor')).toBe(-2)
    expect(jexl.evalSync('$number("10.6")|ceil')).toBe(11)
    expect(jexl.evalSync('10.123456|round(2)')).toBe(10.12)
    expect(jexl.evalSync('3|power(2)')).toBe(9)
    expect(jexl.evalSync('3|power')).toBe(9)
    expect(jexl.evalSync('9|sqrt')).toBe(3)
})

test('formatting', () => {
    expect(jexl.evalSync('16325.62|formatNumber("0,0.000")')).toBe('16,325.620')
    expect(jexl.evalSync('16325.62|formatNumber("0.000")')).toBe('16325.620')
    expect(jexl.evalSync('12|formatBase(16)')).toBe('c')
    expect(jexl.evalSync('16325.62|formatInteger("0000000")')).toBe('0016325')
})

test('integers', () => {
    expect(jexl.evalSync('\'16325\'|toInt')).toBe(16325)
    expect(jexl.evalSync('(9/2)|toInt')).toBe(4)
})

test('numericAggregations', () => {
    expect(jexl.evalSync('[1,2,3]|sum')).toBe(6)
    expect(jexl.evalSync('sum(1,2,3,4,5)')).toBe(15)
    expect(jexl.evalSync('[1,3]|sum(1,2,3,4,5)')).toBe(19)
    expect(jexl.evalSync('[1,3]|sum([1,2,3,4,5])')).toBe(19)
    expect(jexl.evalSync('[1,3]|max([1,2,3,4,5])')).toBe(5)
    expect(jexl.evalSync('[2,3]|min([1,2,3,4,5])')).toBe(1)
    expect(jexl.evalSync('[4,5,6]|avg')).toBe(5)
})

test('booleans', () => {
    expect(jexl.evalSync('1|toBoolean')).toBe(true)
    expect(jexl.evalSync('3|toBoolean')).toBe(true)
    expect(jexl.evalSync('\'1\'|toBoolean')).toBe(true)
    expect(jexl.evalSync('\'2\'|toBoolean')).toBe(undefined)
    expect(jexl.evalSync('\'a\'|toBool')).toBe(undefined)
    expect(jexl.evalSync('\'\'|toBool')).toBe(undefined)
    expect(jexl.evalSync('0|toBool')).toBe(false)
    expect(jexl.evalSync('0.0|toBool')).toBe(false)
    expect(jexl.evalSync('\'false\'|toBool')).toBe(false)
    expect(jexl.evalSync('\'False\'|toBool')).toBe(false)
    expect(jexl.evalSync('\'fALSE\'|toBool')).toBe(false)
    expect(jexl.evalSync('\'tRUE       \'|toBoolean')).toBe(true)
    expect(jexl.evalSync('\'False\'|toBool|not')).toBe(true)
    expect(jexl.evalSync('\'TRUE\'|toBool|not')).toBe(false)
})

/*     [InlineData("['foo', 'bar', 'baz'] | append('tek')")]
    [InlineData("['foo', 'bar'] | append(['baz','tek'])")]
    [InlineData("'foo' | append(['bar', 'baz','tek'])")]
    [InlineData("'foo' | append('bar', 'baz','tek')")]
    [InlineData("['tek', 'baz', 'bar', 'foo']|reverse")]
    [InlineData("['tek', 'baz', 'bar', 'foo', 'foo']|reverse|distinct")]
    [InlineData("{'foo':0, bar:1, 'baz':2, tek:3}|keys")]
    [InlineData("{a:'foo', b:'bar', c:'baz', d:'tek'}|values")]
    [InlineData("[{name:'foo'}, {name:'bar'}, {name:'baz'}, {name:'tek'}]|mapField('name')")]
    [InlineData("[{name:'tek',age:32}, {name:'bar',age:34}, {name:'baz',age:33}, {name:'foo',age:35}]|sort('age',true)|mapField('name')")]
    [InlineData("['foo']|append(['tek','baz','bar']|sort)")]
    [InlineData("['foo']|append(['tek', 'baz', 'bar', 'foo', 'foo']|filter('value != \\'foo\\'')|sort)")]
     */

test('arrays', () => {
    expect(jexl.evalSync('["foo", "bar", "baz"]|append("tek")')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('["foo", "bar"]|append(["baz","tek"])')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('"foo"|append(["bar", "baz","tek"])')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('"foo"|append("bar", "baz","tek")')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('["tek", "baz", "bar", "foo"]|reverse')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('["tek", "baz", "bar", "foo", "foo"]|reverse|distinct')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('{foo:0, bar:1, baz:2, tek:3}|keys')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('{a:"foo", b:"bar", c:"baz", d:"tek"}|values')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('[{name:"foo"}, {name:"bar"}, {name:"baz"}, {name:"tek"}]|mapField("name")')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('[{name:"tek",age:32}, {name:"bar",age:34}, {name:"baz",age:33}, {name:"foo",age:35}]|sort("age",true)|mapField("name")')).toEqual(['tek', 'baz', 'bar', 'foo'])
    expect(jexl.evalSync('["foo"]|append(["tek","baz","bar"]|sort)')).toEqual(['foo', 'bar', 'baz', 'tek'])
    expect(jexl.evalSync('["foo"]|append(["tek", "baz", "bar", "foo", "foo"]|filter("value != \'foo\'")|sort)')).toEqual(['foo', 'bar', 'baz', 'tek'])
})