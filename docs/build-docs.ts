import jexl from '../src'
import typedoc from './typedoc.json'

interface Grammar {
    elements: { [symbol: string]: Element };
    functions: { [name: string]: (...args: unknown[]) => unknown };
    transforms: { [name: string]: (...args: [unknown, ...unknown[]]) => unknown }; // There's a typo in the official types
}

const transforms = (jexl._grammar as unknown as Grammar).transforms
const functions = jexl._grammar.functions

enum GrammarType {
    Function = 'Function',
    Transform = 'Transform'
}

const docs: {
    type: GrammarType
    name: string;
    description?: string | undefined;
    args?: string | undefined;
    returns?: string | undefined;
    code?: string | undefined;
}[] = []



for (const key in transforms) {
    const functionName = transforms[key].name
    const doc = typedoc.children.find(child => child.name === functionName)
    const docsJson = {
        type: GrammarType.Transform,
        name: functionName,
        description: doc.comment?.summary[0]?.text,
        args: (doc.signatures[0] as unknown as { parameters: { name: string }[] })?.parameters?.map(param => param.name).join(', ')
        //returns: 'unknown',
        //code: transform.toString()
    }
    console.log(docsJson)
}