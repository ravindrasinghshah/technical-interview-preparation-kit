import { skipWord } from "../Problems/skipWord";

it("removes every occurrence of a word", () => {
  expect(skipWord("recursion_is_noteasy", "not")).toBe("recursion_is_easy");
});
