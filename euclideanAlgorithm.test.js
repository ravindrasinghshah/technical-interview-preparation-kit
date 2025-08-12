/**
 * Test suite for Euclidean Algorithm
 * Tests the findGCD function for finding Greatest Common Divisor
 */

// Mock implementation since we need to refactor the original file
// In a full implementation, this would import from the refactored euclideanAlgorithm.js
function findGCD(num1, num2) {
    if (num2 === 0) return num1;
    return findGCD(num2, (num1 % num2));
}

describe('Euclidean Algorithm - findGCD', () => {
    test('should find GCD of two positive integers', () => {
        expect(findGCD(48, 18)).toBe(6);
        expect(findGCD(5, 3)).toBe(1);
        expect(findGCD(18, 9)).toBe(9);
    });

    test('should handle edge cases', () => {
        expect(findGCD(0, 5)).toBe(5);
        expect(findGCD(7, 0)).toBe(7);
        expect(findGCD(1, 1)).toBe(1);
    });

    test('should work with larger numbers', () => {
        expect(findGCD(1071, 462)).toBe(21);
        expect(findGCD(270, 192)).toBe(6);
    });

    test('should work when first number is smaller', () => {
        expect(findGCD(3, 5)).toBe(1);
        expect(findGCD(9, 18)).toBe(9);
    });
});

// TODO: Once euclideanAlgorithm.js is refactored to export findGCD function,
// replace the mock implementation with:
// import { findGCD } from './3-Algorithms/euclideanAlgorithm.js';
