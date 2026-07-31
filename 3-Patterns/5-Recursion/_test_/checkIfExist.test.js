import { checkIfExist } from "../Problems/checkIfExist";

it("finds an existing target", () => {
  expect(checkIfExist([1, 2, 4, 8], 8)).toBe(true);
  expect(checkIfExist([1, 2], 3)).toBe(false);
});
