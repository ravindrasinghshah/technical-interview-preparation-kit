import { expect } from "vitest";
import { last_stone_weight } from "../Problems/last_stone_weight";

describe("last_stone_weight testcases", () => {
    it("Test case 1", () => {
        let stones = [2, 7, 4, 1, 8, 1],
            expected_output = 1;
        let result = last_stone_weight(stones);
        expect(result).toBe(expected_output);
    });

    it("Test case 2", () => {
        let stones = [4, 3, 4, 3, 2],
            expected_output = 2;
        let result = last_stone_weight(stones);
        expect(result).toBe(expected_output);
    });
});