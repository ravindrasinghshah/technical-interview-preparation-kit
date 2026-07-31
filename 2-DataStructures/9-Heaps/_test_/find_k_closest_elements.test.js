import { find_k_closest_elements } from "../Problems/find_k_closest_elements";

describe("find_k_closest_elements testcases", () => {
    it("Test case 1", () => {
        let nums = [1, 2, 3, 4, 5],
            k = 4,
            x = 3,
            expected_output = [1, 2, 3, 4];
        let result = find_k_closest_elements(nums, k, x);
        expect(result).toEqual(expected_output);
    });

    it("Test case 2", () => {
        let nums = [1, 1, 2, 3, 4, 5],
            k = 4,
            x = -1,
            expected_output = [1, 1, 2, 3];
        let result = find_k_closest_elements(nums, k, x);
        console.log(result)
        expect(result).toEqual(expected_output);
    })
})
