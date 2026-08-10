import isValidPalindrome from "../Problems/isValidPalindrome";

it("Test case 1", () => {
    const ans = isValidPalindrome("A man, a plan, a canal: Panama");
    expect(ans).toBe(true);
});

it("Test case 2", () => {
    const ans = isValidPalindrome("race a car");
    expect(ans).toBe(false);
});

it("Test case 3", () => {
    const ans = isValidPalindrome(" ");
    expect(ans).toBe(true);
});

it("Test case 4", () => {
    const ans = isValidPalindrome("Hello");
    expect(ans).toBe(false);
});