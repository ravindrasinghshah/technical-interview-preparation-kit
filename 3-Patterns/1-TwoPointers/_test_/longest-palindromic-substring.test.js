import longest_palindromic_substring from "../Problems/longest-palindromic-substring"

it("Test case 1", () => {
    const ans = longest_palindromic_substring("babad");

    expect(ans).toBe("bab");
});

it("Test case 2", () => {
    const ans = longest_palindromic_substring("cbbd");

    expect(ans).toBe("bb");
});

it("Test case 3", () => {
    const ans = longest_palindromic_substring("aaabbbccc");

    expect(ans).toBe("aaa");
});