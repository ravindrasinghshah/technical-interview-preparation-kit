import { expect } from "vitest";
import isPalindromeStack from "../Problems/isPalindromeStack";

describe("Stack: Is Palindrome", () => {

    it("Test case 1", () => {
        const str = "10s01";
        const ans = isPalindromeStack(str);
        expect(ans).toBeTruthy();
    });

    it("Test case 2", () => {
        const str = "10s11";
        const ans = isPalindromeStack(str);
        expect(ans).toBeFalsy()
    });

    it("Test case 3", () => {
        const str = "LeetEel";
        const ans = isPalindromeStack(str);
        expect(ans).toBeFalsy()
    });
});