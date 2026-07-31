import { findGCD } from "../Problems/euclideanAlgorithm"

describe('Euclidean Algorithm - findGCD', () => {
    it('should find GCD of two positive integers', () => {
        expect(findGCD(48, 18)).toBe(6);
        expect(findGCD(5, 3)).toBe(1);
        expect(findGCD(18, 9)).toBe(9);
    });

    it('should handle edge cases', () => {
        expect(findGCD(0, 5)).toBe(5);
        expect(findGCD(7, 0)).toBe(7);
        expect(findGCD(1, 1)).toBe(1);
    });

    it('should work with larger numbers', () => {
        expect(findGCD(1071, 462)).toBe(21);
        expect(findGCD(270, 192)).toBe(6);
    });

    it('should work when first number is smaller', () => {
        expect(findGCD(3, 5)).toBe(1);
        expect(findGCD(9, 18)).toBe(9);
    });
});