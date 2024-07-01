import { expect, test } from 'vitest'
import jexl from '../src'

interface Grammar {
    elements: { [symbol: string]: Element };
    functions: { [name: string]: (...args: unknown[]) => unknown };
    transforms: { [name: string]: (...args: [unknown, ...unknown[]]) => unknown }; // There's a typo in the official types
}

test('docs', () => {
    console.log('test')

    const transforms = (jexl._grammar as unknown as Grammar).transforms
    const functions = jexl._grammar.functions

    console.log('functions', functions)
    console.log('transforms', transforms)
    for (const key in transforms) {
        console.log(key, transforms[key].name)
    }
})
