import isPalindrome from "../Problems/isPalindrome";

it("Test case 1", () => {
    const ans = isPalindrome("1001");
    expect(ans).toBe(true);
});

it("Test case 1", () => {
    const ans = isPalindrome("100");
    expect(ans).toBe(false);
});