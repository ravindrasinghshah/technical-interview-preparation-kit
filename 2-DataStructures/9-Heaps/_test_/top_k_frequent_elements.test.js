import { top_k_frequent_elements } from "../Problems/top_k_frequent_elements";

describe("top_k_frequent_elements test cases", () => {
    it("Test case 1", () => {
        let nums = [1, 1, 1, 2, 2, 3],
            k = 2,
            expected_output = [1, 2];
        let result = top_k_frequent_elements(nums, k);
        expect(result).toEqual(expected_output);
    });
    it("Test case 2", () => {
        let nums = [1],
            k = 1,
            expected_output = [1];
        let result = top_k_frequent_elements(nums, k);
        expect(result).toEqual(expected_output);
    });
    it("Test case 3", () => {
        let nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2],
            k = 2,
            expected_output = [1, 2];
        let result = top_k_frequent_elements(nums, k);
        expect(result).toEqual(expected_output);
    });
})