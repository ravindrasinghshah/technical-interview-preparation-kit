/** cd to 2-GeneralAlgorithms and run node euclideanAlgorithm.js
 * Euclidean Algorithm - is an efficient method for finding the Greatest Common Divisor (GCD) of two integers.
 * What is GCD? A largest number which can divide given numbers without any remainder.
 * Base rule: GCD(a, b) = GCD(b, a % b) --> Repeat until b = 0. Then, GCD = a.
 * Why does it work? If a number divides both `a` and `b` then it must also divide `a % b` 
 * Example:
 * Step 1: gcd(48, 18)
   Step 2: gcd(18, 48 % 18) = gcd(18, 12)
   Step 3: gcd(12, 18 % 12) = gcd(12, 6)
   Step 4: gcd(6, 12 % 6) = gcd(6, 0)
   Step 5: return 6
 */

function findGCD(num1, num2) {
    if (num2 == 0) return num1; //= base case
    return findGCD(num2, (num1 % num2));
}

let num1 = 5, num2 = 3;
let result = findGCD(num1, num2);
console.log(`GCD of ${num1} and ${num2} is ${result}`);

num1 = 18, num2 = 9;
result = findGCD(num1, num2);
console.log(`GCD of ${num1} and ${num2} is ${result}`);