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