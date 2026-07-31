import { numberOfSteps, numberOfSteps_s } from "../Problems/numberOfSteps";

it("counts reductions to zero", () => {
  expect(numberOfSteps(14)).toBe(6);
  expect(numberOfSteps_s(14)).toBe(6);
});
