---
title: Operators
description: Complete reference for all JEXL operators including precedence and usage examples
---

# JEXL Operators

JEXL provides a comprehensive set of operators for performing calculations, comparisons, logical operations, and data transformations. Understanding operator precedence and behavior is essential for writing correct expressions.

## Arithmetic Operators

Perform mathematical calculations on numbers.

### Addition (`+`)
```javascript
5 + 3           // 8
1.5 + 2.5       // 4.0
-10 + 5         // -5

// String concatenation
"Hello" + " " + "World"    // "Hello World"
"Score: " + 95             // "Score: 95"
```

### Subtraction (`-`)
```javascript
10 - 3          // 7
5.5 - 2.2       // 3.3
0 - 5           // -5
```

### Multiplication (`*`)
```javascript
4 * 3           // 12
2.5 * 4         // 10.0
-3 * 2          // -6
```

### Division (`/`)
```javascript
10 / 2          // 5
7 / 3           // 2.333...
10 / 0          // Infinity
```

### Modulus (`%`)
```javascript
10 % 3          // 1
7 % 2           // 1
12 % 4          // 0
```

### Exponentiation (`^`)
```javascript
2 ^ 3           // 8
4 ^ 0.5         // 2 (square root)
10 ^ 2          // 100
```

### Unary Minus (`-`)
```javascript
-5              // -5
-(3 + 2)        // -5
-(-5)           // 5
```

## Comparison Operators

Compare values and return boolean results.

### Equality (`==`)
```javascript
5 == 5          // true
"hello" == "hello"    // true
true == true    // true
5 == "5"        // true (type coercion)
null == null    // true
```

### Inequality (`!=`)
```javascript
5 != 3          // true
"a" != "b"      // true
true != false   // true
5 != "5"        // false (type coercion)
```

### Less Than (`<`)
```javascript
3 < 5           // true
"a" < "b"       // true (lexicographic)
10 < 10         // false
```

### Less Than or Equal (`<=`)
```javascript
3 <= 5          // true
5 <= 5          // true
10 <= 9         // false
```

### Greater Than (`>`)
```javascript
5 > 3           // true
"b" > "a"       // true
10 > 10         // false
```

### Greater Than or Equal (`>=`)
```javascript
5 >= 3          // true
5 >= 5          // true
3 >= 5          // false
```

## Logical Operators

Perform logical operations and combine boolean expressions.

### Logical AND (`&&`)
```javascript
true && true           // true
true && false          // false
false && true          // false
false && false         // false

// Short-circuit evaluation
age >= 18 && hasLicense     // Only checks hasLicense if age >= 18
user && user.name           // Safe property access
```

### Logical OR (`||`)
```javascript
true || true           // true
true || false          // true
false || true          // true
false || false         // false

// Default values
name || "Anonymous"    // Use "Anonymous" if name is falsy
config.timeout || 5000 // Default timeout
```

### Logical NOT (`!`)
```javascript
!true              // false
!false             // true
!"hello"           // false (truthy string)
!""                // true (empty string is falsy)
!0                 // true (zero is falsy)
!null              // true (null is falsy)
```

## Membership Operator

Test if a value exists within another value.

### In Operator (`in`)
```javascript
// Array membership
"apple" in ["apple", "banana", "orange"]     // true
5 in [1, 2, 3, 4, 5]                        // true

// Object property existence
"name" in {name: "John", age: 30}           // true
"email" in {name: "John", age: 30}          // false

// String substring
"ell" in "hello"                            // true
"xyz" in "hello"                            // false
```

## Conditional (Ternary) Operator

Provide conditional logic with the `? :` operator.

### Basic Ternary (`? :`)
```javascript
age >= 18 ? "adult" : "minor"
score >= 60 ? "pass" : "fail"
user ? user.name : "Guest"
```

### Nested Ternary
```javascript
// Grade calculation
score >= 90 ? "A" :
score >= 80 ? "B" :
score >= 70 ? "C" :
score >= 60 ? "D" : "F"

// Status determination
errors > 0 ? "error" :
warnings > 0 ? "warning" : "success"
```

## Transform (Pipe) Operator

Apply functions to values using the pipe operator (`|`).

### Basic Transforms
```javascript
"hello" | uppercase           // "HELLO"
[1, 2, 3] | length           // 3
"  text  " | trim            // "text"
```

### Chained Transforms
```javascript
// String processing
"  Hello World  " | trim | lowercase | split(" ") | join("-")
// Result: "hello-world"

// Array processing
[1, 2, 3, 4, 5] | filter("value > 2") | map("value * 2") | sum
// Result: 24 (sum of [6, 8, 10])
```

### Transforms with Arguments
```javascript
"hello world" | substring(0, 5)        // "hello"
[1, 2, 3] | map("value * " + multiplier)  // Multiply by variable
users | filter("value.age > " + minAge)   // Filter with variable
```

## Property Access Operators

Access properties and array elements.

### Dot Notation (`.`)
```javascript
user.name              // Simple property
user.profile.email     // Nested property
config.database.host   // Deep nesting
```

### Bracket Notation (`[]`)
```javascript
user["name"]           // Property access
user[propertyName]     // Dynamic property
array[0]               // Array index
array[index]           // Dynamic index
array[-1]              // Negative index (last element)
```

## Operator Precedence

Operators are evaluated in the following order (highest to lowest precedence):

| Precedence | Operators | Description | Associativity |
|------------|-----------|-------------|---------------|
| 1 | `.` `[]` `()` | Property access, function calls | Left-to-right |
| 2 | `!` `-` (unary) | Logical NOT, unary minus | Right-to-left |
| 3 | `^` | Exponentiation | Right-to-left |
| 4 | `*` `/` `%` | Multiplication, division, modulus | Left-to-right |
| 5 | `+` `-` | Addition, subtraction | Left-to-right |
| 6 | `<` `<=` `>` `>=` | Comparison | Left-to-right |
| 7 | `==` `!=` | Equality | Left-to-right |
| 8 | `in` | Membership | Left-to-right |
| 9 | `&&` | Logical AND | Left-to-right |
| 10 | `\|\|` | Logical OR | Left-to-right |
| 11 | `? :` | Ternary conditional | Right-to-left |
| 12 | `\|` | Transform (pipe) | Left-to-right |

### Precedence Examples
```javascript
// Arithmetic precedence
2 + 3 * 4        // 14, not 20 (multiplication first)
(2 + 3) * 4      // 20 (parentheses override)

// Comparison and logical precedence
age > 18 && hasLicense    // Comparison first, then AND
!(age > 18)               // NOT applied to comparison result

// Transform precedence
users | length > 0        // Transform first: (users | length) > 0
users | (length > 0)      // Would be invalid syntax
```

## Associativity

When operators have the same precedence, associativity determines evaluation order.

### Left-to-right (Left Associative)
```javascript
10 - 5 - 2       // (10 - 5) - 2 = 3
a | b | c        // (a | b) | c
```

### Right-to-left (Right Associative)  
```javascript
2 ^ 3 ^ 2        // 2 ^ (3 ^ 2) = 2 ^ 9 = 512
a ? b : c ? d : e // a ? b : (c ? d : e)
```

## Operator Overloading

Some operators work differently based on operand types.

### Addition (`+`)
```javascript
// Numeric addition
5 + 3            // 8

// String concatenation
"Hello" + " World"    // "Hello World"

// Mixed types (converts to string)
"Count: " + 5    // "Count: 5"
```

### Comparison with Type Coercion
```javascript
// Numeric comparison
5 > 3            // true

// String comparison (lexicographic)
"b" > "a"        // true
"10" > "2"       // false (string comparison)

// Mixed type comparison
"10" > 2         // true (converts to number)
```

## Best Practices

### 1. Use Parentheses for Clarity
```javascript
// Good - clear intent
(score >= 90) && (attendance >= 0.8)

// Less clear - relies on precedence
score >= 90 && attendance >= 0.8
```

### 2. Avoid Complex Precedence Mixing
```javascript
// Good - explicit grouping
result = (a + b) * (c - d)

// Harder to read
result = a + b * c - d
```

### 3. Use Meaningful Variable Names in Complex Expressions
```javascript
// Good
isEligibleStudent = (age >= 18) && (gpa >= 3.0) && (creditsCompleted >= 60)

// Less readable  
result = a >= 18 && b >= 3.0 && c >= 60
```

### 4. Break Down Complex Ternary Operations
```javascript
// Good - readable chain
grade = score >= 90 ? "A" :
        score >= 80 ? "B" :
        score >= 70 ? "C" :
        score >= 60 ? "D" : "F"

// Harder to read - nested ternary
grade = score >= 90 ? "A" : (score >= 80 ? "B" : (score >= 70 ? "C" : (score >= 60 ? "D" : "F")))
```

### 5. Use Short-Circuit Evaluation Safely
```javascript
// Good - safe property access
user && user.profile && user.profile.email

// Good - provide defaults
config.timeout || 5000

// Be careful with falsy values
count || 0  // Wrong if count should be 0
count != null ? count : 0  // Safer
```

## Common Patterns

### Safe Navigation
```javascript
// Check existence before access
user && user.address && user.address.city

// Using in operator
"address" in user && "city" in user.address ? user.address.city : null
```

### Default Value Assignment
```javascript
// Simple defaults
name = inputName || "Anonymous"
timeout = config.timeout || 5000

// More specific defaults
port = config.port != null ? config.port : 3000
```

### Range Checks
```javascript
// Age range
isValidAge = age >= 0 && age <= 120

// Score range
isValidScore = score >= 0 && score <= 100
```

### Type Checking with Operations
```javascript
// Check if numeric
isNumber = typeof value == "number" && !isNaN(value)

// Check if non-empty string
isValidString = typeof value == "string" && value.length > 0
```

Next: Learn how to build complex [JEXL Expressions](./expressions) using these operators.