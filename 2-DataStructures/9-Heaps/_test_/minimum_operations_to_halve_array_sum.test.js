import { minimum_operations_to_halve_array_sum } from "../Problems/minimum_operations_to_halve_array_sum";

describe("minimum_operations_to_halve_array_sum testcases", () => {
    it("Test case 1", () => {
        let nums = [5, 19, 8, 1],
            expected_output = 3;
        let result = minimum_operations_to_halve_array_sum(nums);
        expect(result).toBe(expected_output);
    });
     it("Test case 2", () => {
        let nums = [3, 8, 20],
            expected_output = 3;
        let result = minimum_operations_to_halve_array_sum(nums);
        expect(result).toBe(expected_output);
    });
})