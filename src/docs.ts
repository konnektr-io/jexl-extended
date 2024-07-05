import jexl from '.'
import typedoc from '../docs/typedoc.json'
import fs from 'fs'

interface Grammar {
    elements: { [symbol: string]: Element };
    functions: { [name: string]: (...args: unknown[]) => unknown };
    transforms: { [name: string]: (...args: [unknown, ...unknown[]]) => unknown }; // There's a typo in the official types
}

export enum GrammarType {
    Function = 'Function',
    Transform = 'Transform'
}

const libs = {
    [GrammarType.Function]: jexl._grammar.functions,
    [GrammarType.Transform]: (jexl._grammar as unknown as Grammar).transforms
}

export const docs: {
    type: GrammarType
    name: string;
    description?: string | undefined;
    args?: string | undefined;
    returns?: string | undefined;
    code?: string | undefined;
}[] = []

for (const [type, lib] of Object.entries(libs)) {
    for (const key in lib) {
        const functionName = lib[key].name
        const doc = typedoc.children.find(child => child.name === functionName)
        if (!doc) {
            console.error(`No documentation found for ${functionName}`)
            continue
        }
        const docsJson = {
            type: type as GrammarType,
            name: key,
            description: doc.comment?.summary[0]?.text,
            args: (doc.signatures[0] as unknown as { parameters: { name: string }[] })?.parameters?.map(param => param.name).join(', '),
            returns: (doc.signatures[0].type as { type: string; name: string; }).name || doc.signatures[0].type.type,
            code: lib[key].toString()
        }
        docs.push(docsJson)
    }
}
console.log(docs)

// Save output as json file
fs.writeFileSync('./dist/docs.json', JSON.stringify(docs, null, 2))