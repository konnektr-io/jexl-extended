---
title: Data Types
description: Understanding data types in JEXL expressions
---

# JEXL Data Types

JEXL supports all JavaScript data types and provides seamless integration with JavaScript's dynamic typing system. Understanding how JEXL handles different data types is crucial for writing effective expressions.

## Primitive Types

### String

Strings represent textual data and are enclosed in single or double quotes.

```javascript
// String literals
"hello world"
'single quotes'
"embedded 'quotes'"
'embedded "quotes"'

// Escape sequences
"line 1\nline 2"     // Newline
"tab\tseparated"     // Tab
"quote: \"hello\""   // Escaped quote
"backslash: \\"      // Escaped backslash
```

**String Operations:**
```javascript
// Concatenation
"hello" + " " + "world"        // "hello world"

// Length
length("hello")                // 5

// Case conversion
"Hello" | uppercase            // "HELLO"
"Hello" | lowercase            // "hello"

// Substring operations
"hello world" | substring(0, 5)    // "hello"
"hello world" | split(" ")         // ["hello", "world"]
```

### Number

Numbers can be integers, decimals, or scientific notation.

```javascript
// Integer literals
42
-17
0

// Decimal literals
3.14159
-2.5
0.001

// Scientific notation
1.23e5      // 123000
4.56e-3     // 0.00456

// Special values
Infinity
-Infinity
```

**Number Operations:**
```javascript
// Arithmetic
10 + 5      // 15
10 - 3      // 7
10 * 2      // 20
10 / 3      // 3.333...
10 % 3      // 1
2 ^ 3       // 8

// Math functions
abs(-5)         // 5
round(3.7)      // 4
floor(3.7)      // 3
ceil(3.2)       // 4
max([1,2,3])    // 3
min([1,2,3])    // 1
```

### Boolean

Booleans represent logical true/false values.

```javascript
// Boolean literals
true
false

// Boolean expressions
age >= 18           // true/false
name == "John"      // true/false
!isActive          // negation
active && verified  // logical AND
admin || moderator  // logical OR
```

**Truthiness in JEXL:**
- `true` → true
- `false` → false  
- `0` → false
- `""` (empty string) → false
- `null` → false
- `undefined` → false
- Everything else → true

### Null

Represents the absence of a value.

```javascript
// Null literal
null

// Null checks
value == null       // Check if null
value != null       // Check if not null

// Default values
name || "Anonymous"  // Use "Anonymous" if name is null/empty
```

## Complex Types

### Array

Arrays are ordered collections of values.

```javascript
// Array literals
[]                    // Empty array
[1, 2, 3]            // Number array
["a", "b", "c"]      // String array
[true, 1, "mixed"]   // Mixed types
[user.name, user.age] // Expression elements
```

**Array Access:**
```javascript
// Index access
users[0]           // First element
users[-1]          // Last element
users[1].name      // Property of array element

// Dynamic access
users[index]       // Using variable
```

**Array Operations:**
```javascript
// Length
length([1, 2, 3])            // 3

// Transform operations
[1, 2, 3] | map("value * 2")     // [2, 4, 6]
[1, 2, 3, 4] | filter("value > 2")  // [3, 4]
["c", "a", "b"] | sort           // ["a", "b", "c"]

// Aggregation
[1, 2, 3, 4] | sum              // 10
[1, 2, 3, 4] | average          // 2.5
[1, 2, 3, 4] | max              // 4

// Array manipulation
[1, 2] | append(3)              // [1, 2, 3]
[1, 2, 3] | reverse             // [3, 2, 1]
[1, 2, 2, 3] | distinct         // [1, 2, 3]
```

### Object

Objects are collections of key-value pairs.

```javascript
// Object literals
{}                          // Empty object
{name: "John", age: 30}    // Simple object
{x: 1, y: 2, sum: x + y}  // Computed values
{"key-with-dash": value}   // Quoted keys
{[dynamicKey]: value}      // Computed keys
```

**Object Access:**
```javascript
// Property access
user.name              // Dot notation
user["name"]           // Bracket notation
user[propertyName]     // Dynamic property

// Nested access
user.profile.email
user.settings.theme.dark
```

**Object Operations:**
```javascript
// Object inspection
keys({a: 1, b: 2})          // ["a", "b"]
values({a: 1, b: 2})        // [1, 2]
entries({a: 1, b: 2})       // [["a", 1], ["b", 2]]

// Object merging
merge({a: 1}, {b: 2})       // {a: 1, b: 2}

// Property existence
"name" in user              // true if property exists
```

## Type Conversion

JEXL handles automatic type conversion in many contexts.

### String Conversion

```javascript
// Automatic string conversion
"Score: " + 95              // "Score: 95"
"Items: " + 3               // "Items: 3"

// Explicit conversion
string(42)                  // "42"
string(true)                // "true"
string([1, 2, 3])          // "1,2,3"
```

### Number Conversion

```javascript
// Automatic number conversion
"10" * 2                   // 20
"3.14" + 1                 // 4.14

// Explicit conversion
number("42")               // 42
number("3.14")             // 3.14
number(true)               // 1
number(false)              // 0

// Parsing integers
parseInteger("42")         // 42
parseInteger("42.7")       // 42
parseInteger("42px")       // 42
```

### Boolean Conversion

```javascript
// Automatic boolean conversion
!!"hello"                  // true
!0                         // true
!"" (empty string)         // true

// Explicit conversion
boolean(1)                 // true
boolean(0)                 // false
boolean("hello")           // true
boolean("")                // false
```

## Working with JSON

JEXL can parse and generate JSON strings.

```javascript
// Parse JSON
json('{"name": "John", "age": 30}')  // {name: "John", age: 30}

// Generate JSON (automatic)
{name: "John", age: 30}              // Becomes JSON when serialized
```

## Type Checking

While JEXL is dynamically typed, you can check types when needed.

```javascript
// Type-specific operations indicate type
length(value)           // Works with strings and arrays
keys(value)             // Works with objects
value + ""              // Convert to string
value * 1               // Convert to number
!!value                 // Convert to boolean
```

## Special Values

### Undefined vs Null

```javascript
// Undefined properties
user.nonexistentProperty    // undefined

// Explicit null
user.optionalField = null   // null

// Both are falsy
!undefined                  // true
!null                       // true
```

### Infinity and NaN

```javascript
// Infinity
1 / 0                      // Infinity
-1 / 0                     // -Infinity

// Not a Number (NaN)
"hello" * 2                // NaN
sqrt(-1)                   // NaN
```

## Array vs Object Distinction

Understanding when to use arrays vs objects:

### Use Arrays When:
- You have ordered data
- You need indexed access
- You want to use array transforms (`map`, `filter`, etc.)

```javascript
scores = [85, 92, 78, 96]
scores | average                    // Calculate average
scores | filter("value > 80")      // Filter high scores
```

### Use Objects When:
- You have key-value relationships
- You need named properties
- You want to group related data

```javascript
user = {name: "John", age: 30, email: "john@example.com"}
user.name                          // Access by property name
keys(user)                         // Get all property names
```

## Common Type Patterns

### Safe Property Access
```javascript
// Handle missing properties
user.profile?.email || "No email"
user && user.profile && user.profile.email

// Using in operator
"email" in user ? user.email : "No email"
```

### Type-Safe Operations
```javascript
// Ensure array before using array operations
length(users) > 0 ? users | map("value.name") : []

// Ensure string before string operations
typeof name == "string" ? name | uppercase : name
```

### Default Values
```javascript
// Provide defaults for missing values
name || "Anonymous"
age || 0
tags || []
settings || {}
```

## Best Practices

### 1. Be Explicit with Types
```javascript
// Good - clear intent
string(value) | uppercase

// Less clear - relies on conversion
value + "" | uppercase
```

### 2. Handle Missing Data
```javascript
// Good - safe access
users && users | length > 0 ? users[0].name : "No users"

// Risky - might throw error
users[0].name
```

### 3. Use Appropriate Data Structures
```javascript
// Good - use array for ordered data
scores | sort | reverse

// Good - use object for key-value data
settings.theme.primaryColor
```


Next: Learn about [JEXL Operators](./operators) and how they work with different data types.