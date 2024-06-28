
/**
 * Casts the input to a string.
 * 
 * ```jexl
 * string(123) // "123"
 * 123|string // "123"
 * ```
 * @param input The input can be any type.
 * @param prettify If true, the output will be pretty-printed.
 */
export const toString = (input: unknown, prettify = false) => {
    return JSON.stringify(input, null, prettify ? 2 : 0);
}

/**
 * Returns the number of characters in a string, or the length of an array.
 * 
 * ```jexl
 * length("hello") // 5
 * length([1, 2, 3]) // 3
 * ```
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

/*         /// <summary>
        /// Returns the substring before the first occurrence of the character sequence chars in str. 
        /// </summary>
        /// <example><code>substringBefore(str, chars)</code><code>$substringBefore(str, chars)</code><code>str|substringBefore(chars)</code></example>
        /// <returns>The substring before the first occurrence of the character sequence chars in str</returns>

        public static JsonNode SubstringBefore(JsonNode input, JsonNode chars)
        {
            if (input is JsonValue value && chars is JsonValue charsValue)
            {
                string str = value.ToString();
                string charsStr = charsValue.ToString();
                int index = str.IndexOf(charsStr);
                if (index == -1)
                {
                    return str;
                }
                return str.Substring(0, index);
            }
            return null;
        }

 */

/**
 * Returns the substring before the first occurrence of the character sequence chars in str. 
 * 
 * ```jexl
 * substringBefore("hello world", " ") // "hello"
 * ```
 * @param input The input string.
 * @param chars The character sequence to search for.
 * @returns The substring before the first occurrence of the character sequence chars in str.
 */
export const substringBefore = (input: unknown, chars: unknown) => {
    if (typeof input === 'string' && typeof chars === 'string') {
        const index = input.indexOf(chars);
        if (index === -1) {
            return input;
        }
        return input.substring(0, index);
    }
    return '';
}