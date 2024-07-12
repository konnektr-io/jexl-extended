import { parse as dateParse, add as dateAdd } from 'date-fns';

import { v4 as uuidv4 } from 'uuid';
import jexl from '.';

/**
 * Casts the input to a string.
 * 
 * @example
 * ```jexl
 * string(123) // "123"
 * 123|string // "123"
 * ```
 * @group Type Conversion
 *
 * @param input The input can be any type.
 * @param prettify If true, the output will be pretty-printed.
 */
export const toString = (input: unknown, prettify = false) => {
    return JSON.stringify(input, null, prettify ? 2 : 0);
}

/**
 * Returns the number of characters in a string, or the length of an array.
 * 
 * @example
 * ```jexl
 * length("hello") // 5
 * length([1, 2, 3]) // 3
 * ```
 * 
 * @param input The input can be a string, an array, or an object.
 * @returns The number of characters in a string, or the length of an array.
 */
export const length = (input: unknown) => {
    if (typeof input === 'string') {
        return input.length;
    }
    if (Array.isArray(input)) {
        return input.length;
    }
    if (typeof input === 'object' && input !== null) {
        return Object.keys(input).length;
    }
    return 0;
}

/**
 * Gets a substring of a string.
 * 
 * @example
 * ```jexl
 * substring("hello world", 0, 5) // "hello"
 * ```
 * 
 * @param input The input string.
 * @param start The starting index of the substring.
 * @param length The length of the substring.
 * @returns The substring of the input string.
 */
export const substring = (input: unknown, start: number, length: number | undefined) => {
    let str = input;
    if (typeof str !== 'string') {
        str = JSON.stringify(str);
    }
    if (typeof str === 'string') {
        let startNum = start;
        let len = length ?? str.length;

        if (startNum < 0) {
            startNum = str.length + start;
            if (startNum < 0) {
                startNum = 0;
            }
        }
        if (startNum + len > str.length) {
            len = str.length - startNum;
        }
        if (len < 0) {
            len = 0;
        }
        return str.substring(startNum, startNum + len);
    }
    return '';
}

/**
 * Returns the substring before the first occurrence of the character sequence chars in str. 
 * 
 * @example
 * ```jexl
 * substringBefore("hello world", " ") // "hello"
 * ```
 * @param input The input string.
 * @param chars The character sequence to search for.
 * @returns The substring before the first occurrence of the character sequence chars in str.
 */
export const substringBefore = (input: unknown, chars: unknown) => {
    const str = typeof input === 'string' ? input : JSON.stringify(input);
    const charsStr = typeof chars === 'string' ? chars : JSON.stringify(chars);
    const index = str.indexOf(charsStr);
    if (index === -1) {
        return str;
    }
    return str.substring(0, index);
}

/**
 * Returns the substring after the first occurrence of the character sequence chars in str. 
 * 
 * @example
 * ```jexl
 * substringAfter("hello world", " ") // "world"
 * ```
 * 
 * @param input The input string.
 * @param chars The character sequence to search for.
 * @returns The substring after the first occurrence of the character sequence chars in str.
 */
export const substringAfter = (input: unknown, chars: unknown) => {
    const str = typeof input === 'string' ? input : JSON.stringify(input);
    const charsStr = typeof chars === 'string' ? chars : JSON.stringify(chars);
    const index = str.indexOf(charsStr);
    if (index === -1) {
        return '';
    }
    return str.substring(index + charsStr.length);
}

/** Converts the input string to uppercase. */
export const uppercase = (input: unknown) => {
    const str = typeof input === 'string' ? input : JSON.stringify(input);
    return str.toUpperCase();
}

/** Converts the input string to lowercase. */
export const lowercase = (input: unknown) => {
    const str = typeof input === 'string' ? input : JSON.stringify(input);
    return str.toLowerCase();
}
const splitRegex = /(?<!^)(?=[A-Z])|[`~!@#%^&*()|+\\\-=?;:'.,\s_']+/;

/** Converts the input string to camel case. */
export const camelCase = (input: unknown) => {
    if (typeof input !== 'string') return '';
    return input.split(splitRegex).map((word, index) => {
        if (index === 0) return word.toLowerCase();
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
}

/** Converts the input string to pascal case. */
export const pascalCase = (input: unknown) => {
    if (typeof input !== 'string') return '';
    return input.split(splitRegex).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
}

/** Trims whitespace from both ends of a string. */
export const trim = (input: unknown) => {
    if (typeof input === 'string') {
        return input.trim();
    }
    return '';
}

/** Pads the input string on both sides to center it. */
export const pad = (input: unknown, width: number, char: string = ' ') => {
    const str = typeof input !== 'string' ? JSON.stringify(input) : input;
    if (width > 0) {
        return str.padEnd(width, char);
    } else {
        return str.padStart(-width, char);
    }
}

/** Checks if the input string contains the specified substring. */
export const contains = (input: unknown, search: string) => {
    if (typeof input === 'string' || Array.isArray(input)) {
        return input.includes(search);
    }
    return false;
}

/** Splits the input string into an array of substrings. */
export const split = (input: unknown, separator: string) => {
    if (typeof input === 'string') {
        return input.split(separator);
    }
    return [];
}

/** Joins elements of an array into a string. */
export const arrayJoin = (input: unknown, separator?: string) => {
    if (Array.isArray(input)) {
        return input.join(separator);
    }
    return undefined;
}

/** Replaces occurrences of a specified string. */
export const replace = (input: unknown, search: string, replacement: string) => {
    if (typeof input === 'string' && typeof search === 'string') {
        const _replacement = replacement === undefined ? '' : replacement;
        return input.replace(new RegExp(search, 'g'), _replacement);
    }
    return undefined;
}

/** Encodes a string to Base64. */
export const base64Encode = (input: unknown) => {
    if (typeof input === 'string') {
        return Buffer.from(input).toString('base64');
    }
    return '';
}

/** Decodes a Base64 encoded string. */
export const base64Decode = (input: unknown) => {
    if (typeof input === 'string') {
        return Buffer.from(input, 'base64').toString('utf-8');
    }
    return '';
}

/** Converts the input to a number. */
export const toNumber = (input: unknown) => {
    if (typeof input === 'number') return input;
    if (typeof input === 'string') return parseFloat(input);
    return NaN;
}

/** Parses a string and returns an integer. */
export const parseInteger = (input: unknown) => {
    if (typeof input === 'string') {
        return parseInt(input, 10);
    } else if (typeof input === 'number') {
        return Math.floor(input);
    }
    return NaN;
}

/** Returns the absolute value of a number. */
export const absoluteValue = (input: unknown) => {
    const num = toNumber(input);
    return isNaN(num) ? NaN : Math.abs(num);
}

/** Rounds a number down to the nearest integer. */
export const floor = (input: unknown) => {
    const num = toNumber(input);
    return isNaN(num) ? NaN : Math.floor(num);
}

/** Rounds a number up to the nearest integer. */
export const ceil = (input: unknown) => {
    const num = toNumber(input);
    return isNaN(num) ? NaN : Math.ceil(num);
}

/** Rounds a number to the nearest integer. */
export const round = (input: unknown, decimals?: number) => {
    const num = toNumber(input);
    return isNaN(num) ? NaN : decimals ? Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals) : Math.round(num);
}

/** Returns the value of a number raised to a power. */
export const power = (input: unknown, exponent?: number) => {
    const num = toNumber(input);
    const exp = exponent === undefined ? 2 : exponent;
    return isNaN(num) ? NaN : Math.pow(num, exp);
}

/** Returns the square root of a number. */
export const sqrt = (input: unknown) => {
    const num = toNumber(input);
    return isNaN(num) ? NaN : Math.sqrt(num);
}

/** Generates a random number between 0 (inclusive) and 1 (exclusive). */
export const randomNumber = () => {
    return Math.random();
}

/** Casts the number to a string and formats it to a decimal representation as specified by the format string. */
export const formatNumber = (input: unknown, format: string) => {
    const num = typeof input === 'number' ? input : parseInt(toNumber(input).toString(), 10);
    return isNaN(num) ? '' : num.toLocaleString('en-us', {
        minimumFractionDigits: format.split('.')[1]?.length,
        maximumFractionDigits: format.split('.')[1]?.length,
        useGrouping: format.split('.')[0]?.includes(',')
    });
}

/** Formats a number as a string in the specified base. */
export const formatBase = (input: unknown, base: number) => {
    const num = typeof input === 'number' ? input : parseInt(toNumber(input).toString(), 10);
    return isNaN(num) ? '' : num.toString(base);
}

/** Formats a number as an integer. */
export const formatInteger = (input: unknown, format: string) => {
    const num = toNumber(input);
    return isNaN(num) ? '' : pad(Math.floor(num).toString(), -format.length, '0');
}

/** Calculates the sum of an array of numbers. */
export const sum = (...input: unknown[]) => {
    if (!Array.isArray(input)) return NaN;
    return input.flat().reduce<number>((acc, val) => acc + toNumber(val), 0);
}

/** Finds the maximum value in an array of numbers. */
export const max = (...input: unknown[]) => {
    if (!Array.isArray(input)) return NaN;
    return Math.max(...input.flat().map(toNumber));
}

/** Finds the minimum value in an array of numbers. */
export const min = (...input: unknown[]) => {
    if (!Array.isArray(input)) return NaN;
    return Math.min(...input.flat().map(toNumber));
}

/** Calculates the average of an array of numbers. */
export const average = (...input: unknown[]) => {
    if (!Array.isArray(input)) return NaN;
    const total = sum(...input);
    return total / input.flat().length;
}

/** Converts the input to a boolean. */
export const toBoolean = (input: unknown) => {
    if (typeof input === 'boolean') return input;
    if (typeof input === 'number') return input !== 0;
    if (typeof input === 'string') {
        if (input.trim().toLowerCase() === 'true' || input.trim() === '1') return true;
        if (input.trim().toLowerCase() === 'false' || input.trim() === '0') return false;
        else return undefined
    }
    return Boolean(input);
}

/** Returns the logical NOT of the input. */
export const not = (input: unknown) => {
    return !toBoolean(input);
}

/** Appends an element to an array. */
export const arrayAppend = (...input: unknown[]) => {
    if (!Array.isArray(input)) return [];
    return [...input.flat()];
}

/** Reverses the elements of an array. */
export const arrayReverse = (...input: unknown[]) => {
    if (!Array.isArray(input)) return [];
    return [...input.flat()].reverse();
}

/** Shuffles the elements of an array. */
export const arrayShuffle = (input: unknown[]) => {
    if (!Array.isArray(input)) return [];
    for (let i = input.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [input[i], input[j]] = [input[j], input[i]];
    }
    return input;
}

/** Sorts the elements of an array. */
export const arraySort = (input: unknown[], expression?: string, descending?: boolean) => {
    if (!Array.isArray(input)) return [];
    if (!expression) return [...input].sort();
    const expr = jexl.compile(expression);
    const compareFunction = (a: unknown, b: unknown) => {
        const aValue = expr.evalSync(a);
        const bValue = expr.evalSync(b);
        if (aValue < bValue) return descending ? -1 : 1;
        if (aValue > bValue) return descending ? 1 : -1;
        return 0;
    };
    return [...input].sort(compareFunction);
}

/** Returns a new array with the elements of the input array with duplicates removed. */
export const arrayDistinct = (input: unknown[]) => {
    if (!Array.isArray(input)) return [];
    return [...new Set(input)];
}

/** Create a new object based on an array of key-value pairs. */
export const arrayToObject = (input: unknown, val?: unknown) => {
    if (typeof input === 'string') return { [input]: val };
    if (!Array.isArray(input)) return {};
    return input.reduce((acc, kv) => {
        if (Array.isArray(kv) && kv.length === 2) {
            acc[kv[0]] = kv[1];
            return acc;
        } else if (typeof kv === 'string') {
            acc[kv] = val;
            return acc;
        }
        return acc;
    }, {});
}

/** Returns a new array with the elements of the input array transformed by the specified map function. */
export const mapField = (input: unknown[], field: string) => {
    if (!Array.isArray(input)) return [];
    return input.map(item => item[field]);
}

/** 
 * Returns an array containing the results of applying the expression parameter to each value in the array parameter.
 * The expression must be a valid JEXL expression string, which is applied to each element of the array.
 * The relative context provided to the expression is an object with the properties value, index and array (the original array). 
 */
export const arrayMap = (input: unknown[], expression: string) => {
    if (!Array.isArray(input)) return undefined;
    const expr = jexl.compile(expression);
    return input.map((value, index, array) => {
        return expr.evalSync({ value, index, array });
    });
}

/**
 * Checks whether the provided array has any elements that match the specified expression.
 * The expression must be a valid JEXL expression string, and is applied to each element of the array.
 * The relative context provided to the expression is an object with the properties value and array (the original array).
 */
export const arrayAny = (input: unknown[], expression: string) => {
    if (!Array.isArray(input)) return false;
    const expr = jexl.compile(expression);
    return input.some((value, index, array) => {
        return expr.evalSync({ value, index, array });
    });
}

/**
 * Checks whether the provided array has all elements that match the specified expression.
 * The expression must be a valid JEXL expression string, and is applied to each element of the array.
 * The relative context provided to the expression is an object with the properties value and array (the original array).
 */
export const arrayEvery = (input: unknown[], expression: string) => {
    if (!Array.isArray(input)) return false;
    const expr = jexl.compile(expression);
    return input.every((value, index, array) => {
        return expr.evalSync({ value, index, array });
    });
}


/**
 * Returns a new array with the elements of the input array that match the specified expression.
 * The expression must be a valid JEXL expression string, and is applied to each element of the array.
 * The relative context provided to the expression is an object with the properties value and array (the original array).
 */
export const arrayFilter = (input: unknown[], expression: string) => {
    if (!Array.isArray(input)) return [];
    const expr = jexl.compile(expression);
    return input.filter((value, index, array) => {
        return expr.evalSync({ value, index, array });
    });
}

/**
 * Finds the first element in an array that matches the specified expression.
 * The expression must be a valid JEXL expression string, and is applied to each element of the array.
 * The relative context provided to the expression is an object with the properties value and array (the original array).
 */
export const arrayFind = (input: unknown[], expression: string) => {
    if (!Array.isArray(input)) return undefined;
    const expr = jexl.compile(expression);
    return input.find((value, index, array) => {
        return expr.evalSync({ value, index, array });
    });
}

/**
 * Returns an aggregated value derived from applying the function parameter successively to each value in array in combination with the result of the previous application of the function.
 * The expression must be a valid JEXL expression string, and behaves like an infix operator between each value within the array.
 * The relative context provided to the expression is an object with the properties accumulator, value, index and array (the original array).
 */
export const arrayReduce = (input: unknown[], expression: string, initialValue: unknown) => {
    if (!Array.isArray(input)) return undefined;
    const expr = jexl.compile(expression);
    return input.reduce((accumulator, value, index, array) => {
        return expr.evalSync({ accumulator, value, index, array });
    }, initialValue);
}

/**
 * Returns the keys of an object.
 */
export const objectKeys = (input: unknown) => {
    if (typeof input === 'object' && input !== null) {
        return Object.keys(input);
    }
    return undefined;
}

/**
 * Returns the values of an object.
 */
export const objectValues = (input: unknown) => {
    if (typeof input === 'object' && input !== null) {
        return Object.values(input);
    }
    return undefined;
}

/**
 * Returns an array of key-value pairs from the input object.
 */
export const objectEntries = (input: unknown) => {
    if (typeof input === 'object' && input !== null) {
        return Object.entries(input);
    }
    return undefined;
}

/**
 * Returns a new object with the properties of the input objects merged together.
 */
export const objectMerge = (...args: unknown[]) => {
    return args.reduce<Record<string, unknown>>((acc, obj) => {
        if (typeof obj === 'object' && obj !== null) {
            return { ...acc, ...obj };
        }
        return acc;
    }, {});
}

/**
 * Returns the current date and time in the ISO 8601 format.
 */
export const now = () => {
    return new Date().toISOString();
}

/**
 * Returns the current date and time in milliseconds since the Unix epoch.
 */
export const millis = () => {
    return Date.now();
}

/**
 * Parses the number of milliseconds since the Unix epoch or parses a string (with or without specified format) and returns the date and time in the ISO 8601 format.
 */
export const toDateTime = (input?: number | string, format?: string) => {
    if (typeof input === 'number') {
        return new Date(input).toISOString();
    }
    if (typeof input === 'string') {
        if (format) {
            // Add UTC as timezone if not provided
            const _format = (format.includes('x') || format.includes('X')) ? format : `${format} X`;
            const _input = (format.includes('x') || format.includes('X')) ? input : `${input} Z`;
            return dateParse(_input, _format, new Date()).toISOString();
        }
        return new Date(input).toISOString();
    }
    if (input === undefined) {
        return new Date().toISOString();
    }
    return undefined;
}

/**
 * Parses the date and time in the ISO 8601 format and returns the number of milliseconds since the Unix epoch.
 */
export const dateTimeToMillis = (input: string) => {
    return new Date(input).getTime();
}

/**
 * Adds a time range to a date and time in the ISO 8601 format.
 */
export const dateTimeAdd = (input: string, unit: string, value: number) => {
    // if unit doesn't end with 's' add it
    const _unit = unit.toLowerCase().endsWith('s') ? unit.toLowerCase() : `${unit.toLowerCase()}s`;
    const returnDate = dateAdd(new Date(input), { [_unit]: value });
    return returnDate.toISOString();
    // dateAdd(new Date(input), { [unit]: value });
}

/**
 * Evaluate provided and return the result.
 * If only one argument is provided, it is expected that the first argument is a JEXL expression.
 * If two arguments are provided, the first argument is the context (must be an object) and the second argument is the JEXL expression.
 * The expression uses the default JEXL extended grammar and can't use any custom defined functions or transforms.
 */
export const _eval = (input: unknown, expression: string) => {
    if (expression === undefined) {
        const _input = typeof input === 'string' ? input : JSON.stringify(input);
        return jexl.evalSync(_input);
    }
    if (typeof input === 'object') {
        return jexl.evalSync(expression, input);
    }
    return undefined;
}

/**
 * Generate a new UUID (Universally Unique Identifier).
 */
export const uuid = () => {
    return uuidv4();
}
