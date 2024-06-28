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
    /* expect(jexl.evalSync('substringBefore("hello world", "o")')).toBe('hell')
    expect(jexl.evalSync('substringBefore("hello world", "x")')).toBe('hello world')
    expect(jexl.evalSync('substringBefore(123456,2)')).toBe('1') */
})