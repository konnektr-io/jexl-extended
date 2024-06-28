import { Jexl } from 'jexl';
import {
    toString,
    length,
    substring,
    substringBefore
} from './extended-grammar';

export class JexlExtended extends Jexl {
    constructor () {
        super();
        // String
        this.addFunction('string', toString);
        this.addFunction('$string', toString);
        this.addTransform('string', toString);
        // toString causes issues in javascript
        // this.addTransform('toString', toString);
        // Length
        this.addFunction('length', length);
        this.addFunction('$length', length);
        this.addTransform('length', length);
        this.addFunction('count', length);
        this.addFunction('$count', length);
        this.addTransform('count', length);
        this.addFunction('size', length);
        this.addFunction('$size', length);
        this.addTransform('size', length);
        // Substring
        this.addFunction('substring', substring);
        this.addFunction('$substring', substring);
        this.addTransform('substring', substring);
        // SubstringBefore
        this.addFunction('substringBefore', substringBefore);
        this.addFunction('$substringBefore', substringBefore);
        this.addTransform('substringBefore', substringBefore);



        this.addTransform('toUpper', (value: string) => value.toUpperCase());
    }
}

export default new JexlExtended();