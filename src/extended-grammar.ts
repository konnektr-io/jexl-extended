
/**
 * Casts the input to a string.
 * @param input 
 * @param prettify 
 * @returns 
 */
export const toString = (input: unknown, prettify = false) => {
    return JSON.stringify(input, null, prettify ? 2 : 0);
}

/**
 * Returns the number of characters in a string, or the length of an array.
 * @param input 
 * @returns 
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

/*         /// <summary>
        /// Gets a substring of a string.
        /// </summary>
        /// <example><code>substring(arg, start, length)</code><code>$substring(arg, start, length)</code><code>arg|substring(start, length)</code></example>
        /// <returns>The substring of the input</returns>
        public static JsonNode Substring(JsonNode input, JsonNode start, JsonNode length)
        {
            if (input is JsonValue value && start is JsonValue startValue)
            {
                string str = value.ToString();
                int startNum = startValue.ToInt32();
                int len = length?.AsValue().ToInt32() ?? str.Length;

                if (startNum < 0)
                {
                    startNum = str.Length + startNum;
                    if (startNum < 0)
                    {
                        startNum = 0;
                    }
                };
                if (startNum + len > str.Length)
                {
                    len = str.Length - startNum;
                };
                if (len < 0)
                {
                    len = 0;
                };
                return str.Substring(startNum, len);
            }
            return null;
        } */

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