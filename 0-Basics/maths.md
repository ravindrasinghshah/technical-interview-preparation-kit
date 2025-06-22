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

### Math log10

Returns the number of times can divide a number by 10 before we get 1.
Whenever want to find the length of the number can use this function with floor to get the length.

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
Step 1: find the length of number: Math.floor(Math.log10(12345)) = 4;
Step 2: Divide the number by 10 with power of n times: 12345 / Math.pow(10, 4) = 12345/10000 = 1.2
Step 3: Take the lowest number using floor(): Math.floor(1.2) = 1;

Formula: Math.floor(number / Math.pow(10, Math.floor(Math.log10(number))));
Math.floor(12345 / Math.pow(10, Math.floor(Math.log10(12345)))) = 1;
Math.floor(2345 / Math.pow(10, Math.floor(Math.log10(2345)))) = 2;
```
