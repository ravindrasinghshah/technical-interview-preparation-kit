# Maths for solving algorithms

### Minimum Number

Use `Number.MIN_SAFE_INTEGER` to assign minimum negative number.
It's value is -9007199254740991, which is equal to -(2^53 - 1).

### Maximum Number

Use `Number.MAX_SAFE_INTEGER` to assign maximum positive number.
It's value is 9007199254740991, which is equal to (2^53 - 1).

### Math floor()

Return the nearest small number of value.
Whenever we want to calculate the prefix of the digits then we can use this function as a trick.

```
Example 1:
2/3 = 0.6666
Math.floor(2/3) = 0;

Example 2:
123/10 = 12.3;
Math.floor(123/10) = 12;
```

### Math ceil()

Return the nearest large number of value.

```
Example 1:
2/3 = 0.6666
Math.ceil(2/3) = 1;

Example 2:
123/10 = 12.3;
Math.ceil(123/10) = 13;
```

### Modulo

Modulo is used to get the remainder of the division.
Whenever we want to get the last digit from the number, then we can use this trick.

```
Example 1:
12 % 10 = 2;
1 % 10 = 1;
0 % 10 = 0;
```

If number can be negative then use this formula to calculate mod: (((X % K) + K ) % K);
Example: (((-3 % 5) + 5) % 5) = 2;

### Math log10

Returns the number of times can divide a number by 10 before we get 1.
Whenever want to [find the length](../4-Algorithms/Bitwise/Problems/NumberSystem/findNoOfDigits.ts) of the number can use this function with floor to get the length.

```
Example:
Math.floor(Math.log10(9)) + 1 = 1;
Math.floor(Math.log10(19)) + 1 = 2;
Math.floor(Math.log10(199)) + 1 = 3;
```

### Math pow

Returns the value of base times n.

```
Example:
Math.pow(10,2) = 10 * 10 = 100;
Math.pow(10,3) = 10 * 10 * 10 = 1000;
```

```
Trick!
Find the left most digit in the number: 12345
Step 1: find the length of number: Math.floor(Math.log10(12345)) + 1 = 5;
Step 2: Divide the number by 10 with power of n-1 times: 12345 / Math.pow(10, (5 - 1)) = 12345/10000 = 1.2
Step 3: Take the lowest number using floor(): Math.floor(1.2) = 1;

Formula: Math.floor(number / Math.pow(10, Math.floor(Math.log10(number))));
Math.floor(12345 / Math.pow(10, Math.floor(Math.log10(12345)))) = 1;
Math.floor(2345 / Math.pow(10, Math.floor(Math.log10(2345)))) = 2;
```

### Is number even or odd?

To find this we can do a bitwise comparison. `(num & 1) === 0`.

```
Example: (2 & 1) === 0 ==> true
(3 & 1) === 0 ==> false
```

### Convert binary number to decimal

Use parseInt function in javscript with value and base 2.

```
Example: parseInt(101, 2) = 5
Example: parseInt("101", 2) = 5

```

### Bitwise operator

1. **AND** if any one condition is false then expression is false.

   _Observation_: if `& 1` applied to any number then digit remains the same `Example: 0 & 1 = 0; 1 & 1 = 1;`

2. **OR** if any one condition is true then expression is true. `Example: 0 || 1 = 1;`

3. **XOR (^) [if and only if]** - Only one should be true in expression.

```
Example: (0 ^ 1) = 1;
(1 ^ 0) = 1;
(1 ^ 1) = 0;
(0 ^ 0) = 0;
```

_Observation_: num ^ 1 = complement of num; num ^ 0 = num; num ^ num = 0;

**_Complement (~)_** number inverted: 011001 => 100110

4. **Left Shift (<<)** - Every time number left shift is done, number converted into binary and 0 is added in the last which in turn doubles the number.
   `Example: (4 << 1) => 8; (4 << 2) => 16`

   _Observation_: (a << b) ==> (a \* 2^b);

5. **Right Shift (>>)** - Right most number is removed from the binary number. It helps dividing number by 2.
   `Example: (4 >> 1) ==> 2`

   _Observation_: (a >> b) ==> (a / 2^b);

### Number Systems - Can only use numbers allowed in the system

1. Decimal - 0,1,2,3,4,5,6,7,8,9 - represents in Base 10. `Example: (551)10 , (10)10`.
2. [Binary](../4-Algorithms//Bitwise/Problems/Conversions/decimalToBase2.ts) - 0 & 1 - Base 2 `Example: (10)10 ==> (1010)2`.
3. [Octal](../4-Algorithms//Bitwise/Problems/Conversions/decimalToOctal.ts) - 0,1,2,3,4,5,6,7 - represents in Base 8. `Example: (9)10 ==> (11)8`.
4. Hexadecimal - 0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F - represents in Base 16. `Example: 10(10) ==> (A)16`

#### Conversions:

1. [Decimal to base b](../4-Algorithms//Bitwise/Problems/Conversions/decimalToBase2.ts): Keep dividing number by base and write remainder in opposite.
2. [Base b to decimal](../4-Algorithms//Bitwise/Problems/Conversions/binaryToDecimal.ts): Multiple and add power of base with digit in reverse order and increment power of base with every number.
