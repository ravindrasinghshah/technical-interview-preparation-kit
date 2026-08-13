import { describe, expect, it } from "vitest";
import { drills } from "../config/practiceCatalog.config";
import { validateDrill } from "./validator";
import type { TemplateDrill } from "../types";

const drillById = (id: string) => drills.find((drill) => drill.id === id)!;

describe("validateDrill", () => {
  it.each(drills.map((drill) => [drill.title, drill] as const))("accepts the canonical %s template", (_, drill) => {
    expect(validateDrill(drill.canonicalCode, drill)).toMatchObject({ valid: true, syntaxErrors: [] });
  });

  it("accepts alternate names and formatting", () => {
    const drill = drills.find((item) => item.id === "two-pointers-opposite-ends")!;
    const code = `const work = (items: number[]) => { let a = 0, b = items.length - 1; while (a < b) { if (items[a] > items[b]) { b--; } else { a++; } } return a; };`;
    expect(validateDrill(code, drill).valid).toBe(true);
  });

  it("reports missing concepts", () => {
    const drill = drills[0];
    const result = validateDrill("function solve() { return 0; }", drill);
    expect(result.valid).toBe(false);
    expect(result.checks.some((check) => !check.passed)).toBe(true);
  });

  it("reports syntax locations", () => {
    const result = validateDrill("function broken( {", drills[0]);
    expect(result.valid).toBe(false);
    expect(result.syntaxErrors[0]).toEqual(expect.objectContaining({ line: 1, column: expect.any(Number) }));
  });

  it("ignores decoy structures in nested helpers", () => {
    const code = `function solve(values: number[]) {
      function decoy() {
        let left = 0, right = values.length - 1;
        while (left < right) {
          if (values[left] < values[right]) left++;
          else right--;
        }
        return right;
      }
      return 0;
    }`;
    expect(validateDrill(code, drillById("two-pointers-opposite-ends")).valid).toBe(false);
  });

  it("requires updates to mutate the inferred pointer pair", () => {
    const code = `function solve(values: number[]) {
      let left = 0, right = values.length - 1, score = 0;
      while (left < right) {
        if (values[left] < values[right]) score++;
        else score--;
      }
      return score;
    }`;
    const result = validateDrill(code, drillById("two-pointers-opposite-ends"));
    expect(result.checks.find((check) => check.ruleId === "two-directional-updates")?.passed).toBe(false);
    expect(result.valid).toBe(false);
  });

  it("accepts compound pointer updates on the same inferred pointers", () => {
    const code = `function solve(items: number[]) {
      let start = 0, end = items.length - 1;
      while (start < end) {
        if (items[start] < items[end]) start += 1;
        else end -= 1;
      }
      return start;
    }`;
    expect(validateDrill(code, drillById("two-pointers-opposite-ends")).valid).toBe(true);
  });

  it("requires both binary-search boundaries to derive from the midpoint", () => {
    const code = `function search(values: number[], target: number) {
      let low = 0, high = values.length - 1;
      while (low <= high) {
        const mid = (low + high) >>> 1;
        if (values[mid] === target) return mid;
        if (values[mid] < target) low = mid + 1;
        else high--;
      }
      return -1;
    }`;
    const result = validateDrill(code, drillById("binary-search-exact"));
    expect(result.checks.find((check) => check.ruleId === "binary-boundary-updates")?.passed).toBe(false);
    expect(result.valid).toBe(false);
  });

  it("accepts bit-shift midpoint and commutative midpoint boundary syntax", () => {
    const code = `function search(items: number[], wanted: number) {
      let first = 0, last = items.length - 1;
      while (first <= last) {
        const center = (first + last) >>> 1;
        if (items[center] === wanted) return center;
        if (items[center] < wanted) first = 1 + center;
        else last = center - 1;
      }
      return -1;
    }`;
    expect(validateDrill(code, drillById("binary-search-exact")).valid).toBe(true);
  });

  it("requires frequency updates for both entering and leaving values", () => {
    const code = `function longestUnique(values: string) {
      let left = 0, best = 0;
      const counts = new Map<string, number>();
      for (let right = 0; right < values.length; right++) {
        counts.set(values[right], 1);
        while (counts.size > 2) {
          left++;
        }
        best = Math.max(best, right - left + 1);
      }
      return best;
    }`;
    const result = validateDrill(code, drillById("sliding-window-frequency"));
    expect(result.checks.find((check) => check.ruleId === "frequency-collection")?.passed).toBe(false);
    expect(result.valid).toBe(false);
  });

  it("accepts any feasibility predicate name when it receives the midpoint", () => {
    const code = `function minimize(low: number, high: number) {
      const works = (value: number) => value >= 0;
      let result = high;
      while (low <= high) {
        const center = (low + high) >> 1;
        if (works(center)) {
          result = center;
          high = center - 1;
        } else {
          low = center + 1;
        }
      }
      return result;
    }`;
    expect(validateDrill(code, drillById("binary-search-answer-space")).valid).toBe(true);
  });

  it("fails safely for an unknown validator variant", () => {
    const base = drillById("binary-search-exact");
    const misconfigured = {
      ...base,
      validation: { schemaVersion: 1, variant: "missing-variant" },
    } as unknown as TemplateDrill;
    const result = validateDrill(base.canonicalCode, misconfigured);
    expect(result.valid).toBe(false);
    expect(result.configurationErrors[0]).toMatch(/registered/);
  });
});
