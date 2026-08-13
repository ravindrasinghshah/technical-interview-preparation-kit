import { describe, expect, it } from "vitest";
import ts from "typescript";
import requirementsMarkdown from "../data/code-templates.md?raw";
import { codeTemplateRequirementDrillIds, drills } from "../config/practiceCatalog.config";
import { validateDrill } from "./validator";
import type { TemplateDrill } from "../types";

const drillById = (id: string) => drills.find((drill) => drill.id === id)!;

const renamedRequirementVariants = [
  ["two-input exhaustion", "two-pointers-two-inputs", `const walk = (a: number[], b: number[]) => {
    let x = 0, y = 0, total = 0;
    while (x < a.length && y < b.length) { if (a[x] < b[y]) x += 1; else y = y + 1; }
    while (x < a.length) x++;
    while (y < b.length) y++;
    return total;
  };`],
  ["prefix construction", "prefix-sum-build", `const accumulate = (items: number[]) => {
    const totals = [items[0]];
    for (let position = 1; position < items.length; position += 1) {
      totals.push(items[position] + totals[totals.length - 1]);
    }
    return totals;
  };`],
  ["prefix-frequency counting", "prefix-sum-exact-subarrays", `const count = (items: number[], goal: number) => {
    const seen = new Map<number, number>(); seen.set(0, 1);
    let matches = 0, sum = 0;
    for (const item of items) {
      sum = sum + item;
      matches = matches + (seen.get(sum - goal) ?? 0);
      seen.set(sum, 1 + (seen.get(sum) ?? 0));
    }
    return matches;
  };`],
  ["array string building", "string-building-array-join", `const assemble = (items: string[]) => {
    const buffer: string[] = [];
    for (const item of items) buffer.push(item);
    return buffer.join("");
  };`],
  ["string concatenation", "string-building-concatenation", `const assemble = (items: string[]) => {
    let output = "";
    for (const item of items) output = output + item;
    return output;
  };`],
  ["fast and slow pointers", "linked-list-fast-slow", `const inspect = (start: any) => {
    let walker = start, runner = start, result = 0;
    while (runner !== null && runner.next !== null) {
      walker = walker.next;
      runner = runner.next.next;
    }
    return result;
  };`],
  ["linked-list reversal", "linked-list-reverse", `const flip = (start: any) => {
    let node = start, before = null;
    while (node) {
      const after = node.next;
      node.next = before;
      before = node;
      node = after;
    }
    return before;
  };`],
  ["monotonic stack", "monotonic-stack-increasing", `const scan = (items: number[]) => {
    const candidates: number[] = []; let result = 0;
    for (const item of items) {
      while (candidates.length !== 0 && item < candidates[candidates.length - 1]) candidates.pop();
      candidates.push(item);
    }
    return result;
  };`],
  ["recursive tree traversal", "binary-tree-dfs-recursive", `const visit = (node: any): number => {
    if (node === null) return 0;
    const a = visit(node.left), b = visit(node.right);
    return 1 + a + b;
  };`],
  ["iterative tree traversal", "binary-tree-dfs-iterative", `const visit = (start: any) => {
    const pending = [start]; let result = 0;
    while (pending.length) {
      const node = pending.pop();
      if (node.left !== null) pending.push(node.left);
      if (node.right !== null) pending.push(node.right);
    }
    return result;
  };`],
  ["level-order tree traversal", "binary-tree-bfs", `const visit = (start: any) => {
    let pending = [start], result = 0;
    while (pending.length) {
      const width = pending.length;
      const following: any[] = [];
      for (let position = 0; position < width; position++) {
        const node = pending[position];
        if (node.left) following.push(node.left);
        if (node.right) following.push(node.right);
      }
      pending = following;
    }
    return result;
  };`],
] as const;

describe("validateDrill", () => {
  it("keeps the practice catalog exactly aligned with the requirements document", () => {
    const codeBlocks = [...requirementsMarkdown.matchAll(/```(?:\w+)?\s*\r?\n([\s\S]*?)```/g)].map((match) => match[1]);
    const implementationCount = codeBlocks.reduce((count, code, index) => {
      const source = ts.createSourceFile(`requirement-${index}.ts`, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      return count + source.statements.reduce((statementCount, statement) => {
        if (ts.isFunctionDeclaration(statement) && statement.body) return statementCount + 1;
        if (!ts.isVariableStatement(statement)) return statementCount;
        return statementCount + statement.declarationList.declarations.filter((declaration) => {
          const initializer = declaration.initializer;
          return Boolean(initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)));
        }).length;
      }, 0);
    }, 0);
    expect(new Set(codeTemplateRequirementDrillIds).size).toBe(codeTemplateRequirementDrillIds.length);
    expect(codeTemplateRequirementDrillIds).toHaveLength(implementationCount);
    expect(drills).toHaveLength(implementationCount);
    expect(drills.map((drill) => drill.id).sort()).toEqual([...codeTemplateRequirementDrillIds].sort());
  });

  it("keeps catalog IDs unique", () => {
    expect(new Set(drills.map((drill) => drill.id)).size).toBe(drills.length);
  });

  it.each(drills.map((drill) => [drill.title, drill] as const))("accepts the canonical %s template", (_, drill) => {
    expect(validateDrill(drill.canonicalCode, drill)).toMatchObject({ valid: true, syntaxErrors: [] });
  });

  it("accepts alternate names and formatting", () => {
    const drill = drills.find((item) => item.id === "two-pointers-opposite-ends")!;
    const code = `const work = (items: number[]) => { let a = 0, b = items.length - 1; while (a < b) { if (items[a] > items[b]) { b--; } else { a++; } } return a; };`;
    expect(validateDrill(code, drill).valid).toBe(true);
  });

  it.each(renamedRequirementVariants)("accepts renamed %s structures", (_, drillId, code) => {
    expect(validateDrill(code, drillById(drillId)).valid).toBe(true);
  });

  it("requires both cleanup loops for two-input traversal", () => {
    const code = `function walk(a: number[], b: number[]) {
      let x = 0, y = 0, answer = 0;
      while (x < a.length && y < b.length) { if (a[x] < b[y]) x++; else y++; }
      while (x < a.length) x++;
      return answer;
    }`;
    const result = validateDrill(code, drillById("two-pointers-two-inputs"));
    expect(result.checks.find((check) => check.ruleId === "tail-exhaustion")?.passed).toBe(false);
  });

  it("requires strict input bounds and one-step moves for two-input traversal", () => {
    const code = `function walk(a: number[], b: number[]) {
      let x = 0, y = 0, answer = 0;
      while (x <= a.length && y <= b.length) { if (a[x] < b[y]) x += 10; else y += 10; }
      while (x <= a.length) x += 10;
      while (y <= b.length) y += 10;
      return answer;
    }`;
    expect(validateDrill(code, drillById("two-pointers-two-inputs")).valid).toBe(false);
  });

  it("requires each prefix value to use both the previous prefix and current input", () => {
    const code = `function build(items: number[]) {
      const prefix = [items[0]];
      for (let i = 1; i < items.length; i++) prefix.push(items[i]);
      return prefix;
    }`;
    const result = validateDrill(code, drillById("prefix-sum-build"));
    expect(result.checks.find((check) => check.ruleId === "prefix-accumulation")?.passed).toBe(false);
  });

  it("does not mistake unrelated arithmetic for prefix addition", () => {
    const code = `function build(items: number[]) {
      const prefix = [items[0]];
      for (let i = 1; i < items.length; i++) {
        prefix.push(prefix[prefix.length - 1] * items[i] + 0);
      }
      return prefix;
    }`;
    expect(validateDrill(code, drillById("prefix-sum-build")).valid).toBe(false);
  });

  it("accepts indexed prefix-array assignment", () => {
    const code = `function build(items: number[]) {
      const prefix = [items[0]];
      for (let i = 1; i < items.length; i++) prefix[i] = prefix[i - 1] + items[i];
      return prefix;
    }`;
    expect(validateDrill(code, drillById("prefix-sum-build")).valid).toBe(true);
  });

  it("requires a running prefix update before the frequency lookup", () => {
    const code = `function count(items: number[], goal: number) {
      const seen = new Map<number, number>(); seen.set(0, 1);
      let answer = 0, current = 0;
      for (const item of items) {
        answer += seen.get(current - goal) ?? 0;
        seen.set(current, (seen.get(current) ?? 0) + 1);
      }
      return answer;
    }`;
    const result = validateDrill(code, drillById("prefix-sum-exact-subarrays"));
    expect(result.checks.find((check) => check.ruleId === "prefix-frequency-count")?.passed).toBe(false);
  });

  it("requires the empty-prefix seed before frequency traversal", () => {
    const code = `function count(items: number[], goal: number) {
      const seen = new Map<number, number>(); let answer = 0, current = 0;
      for (const item of items) {
        current += item;
        answer += seen.get(current - goal) ?? 0;
        seen.set(current, (seen.get(current) ?? 0) + 1);
      }
      seen.set(0, 1);
      return answer;
    }`;
    expect(validateDrill(code, drillById("prefix-sum-exact-subarrays")).valid).toBe(false);
  });

  it("rejects unrelated arithmetic in prefix-frequency updates", () => {
    const code = `function count(items: number[], goal: number) {
      const seen = new Map<number, number>(); seen.set(0, 1);
      let answer = 0, current = 0;
      for (const item of items) {
        current += item * 0;
        answer += (seen.get(current - goal) ?? 0) * 0;
        seen.set(current, (seen.get(current) ?? 0) * 100 + 1);
      }
      return answer;
    }`;
    expect(validateDrill(code, drillById("prefix-sum-exact-subarrays")).valid).toBe(false);
  });

  it("ties prefix accumulation and return to the same collection", () => {
    const code = `function build(items: number[]) {
      const built = [items[0]], returned = [items[0]];
      for (let i = 1; i < items.length; i++) built.push(built[built.length - 1] + items[i]);
      return returned;
    }`;
    expect(validateDrill(code, drillById("prefix-sum-build")).valid).toBe(false);
  });

  it("requires a string buffer to append the current iteration value", () => {
    const code = `function build(items: string[]) {
      const output: string[] = [];
      for (const item of items) output.push("x");
      return output.join("");
    }`;
    const result = validateDrill(code, drillById("string-building-array-join"));
    expect(result.checks.find((check) => check.ruleId === "appends-character")?.passed).toBe(false);
  });

  it("rejects transformed values in both string-building variants", () => {
    const buffered = `function build(items: string[]) {
      const output: unknown[] = [];
      for (const item of items) output.push(item.length);
      return output.join("");
    }`;
    const concatenated = `function build(items: string[]) {
      let output = "";
      for (const item of items) output += item.length;
      return output;
    }`;
    expect(validateDrill(buffered, drillById("string-building-array-join")).valid).toBe(false);
    expect(validateDrill(concatenated, drillById("string-building-concatenation")).valid).toBe(false);
  });

  it("ties string updates and returns to the same accumulator", () => {
    const buffered = `function build(items: string[]) {
      const built: string[] = [], returned: string[] = [];
      for (const item of items) built.push(item);
      return returned.join("");
    }`;
    const concatenated = `function build(items: string[]) {
      let built = "", returned = "";
      for (const item of items) built += item;
      return returned;
    }`;
    expect(validateDrill(buffered, drillById("string-building-array-join")).valid).toBe(false);
    expect(validateDrill(concatenated, drillById("string-building-concatenation")).valid).toBe(false);
  });

  it("requires linked-list reversal steps in a safe order", () => {
    const code = `function reverse(head: any) {
      let current = head, previous = null;
      while (current) {
        const saved = current.next;
        previous = current;
        current.next = previous;
        current = saved;
      }
      return previous;
    }`;
    const result = validateDrill(code, drillById("linked-list-reverse"));
    expect(result.checks.find((check) => check.ruleId === "advances-reversal")?.passed).toBe(false);
  });

  it("ties the linked-list reversal return to the pointer that builds the reversed list", () => {
    const code = `function reverse(head: any) {
      let current = head, previous = null, unrelated = null;
      while (current) {
        const saved = current.next;
        current.next = previous;
        previous = current;
        current = saved;
      }
      return unrelated;
    }`;
    expect(validateDrill(code, drillById("linked-list-reverse")).valid).toBe(false);
  });

  it("requires the fast linked-list pointer to advance two links", () => {
    const code = `function inspect(head: any) {
      let slow = head, fast = head, answer = 0;
      while (fast && fast.next) { slow = slow.next; fast = fast.next; }
      return answer;
    }`;
    const result = validateDrill(code, drillById("linked-list-fast-slow"));
    expect(result.checks.find((check) => check.ruleId === "fast-slow-steps")?.passed).toBe(false);
  });

  it("accepts an optional-chain fast-pointer guard", () => {
    const code = `function inspect(head: any) {
      let slow = head, fast = head, answer = 0;
      while (fast?.next) { slow = slow.next; fast = fast.next.next; }
      return answer;
    }`;
    expect(validateDrill(code, drillById("linked-list-fast-slow")).valid).toBe(true);
  });

  it("requires a monotonic-stack push after the shrink loop", () => {
    const code = `function scan(items: number[]) {
      const stack: number[] = []; let answer = 0;
      for (const item of items) {
        stack.push(item);
        while (stack.length && stack[stack.length - 1] > item) stack.pop();
      }
      return answer;
    }`;
    const result = validateDrill(code, drillById("monotonic-stack-increasing"));
    expect(result.checks.find((check) => check.ruleId === "stack-push")?.passed).toBe(false);
  });

  it("rejects an OR condition that does not safely guard stack-top access", () => {
    const code = `function scan(items: number[]) {
      const stack: number[] = []; let answer = 0;
      for (const item of items) {
        while (stack.length || stack[stack.length - 1] > item) stack.pop();
        stack.push(item);
      }
      return answer;
    }`;
    const result = validateDrill(code, drillById("monotonic-stack-increasing"));
    expect(result.checks.find((check) => check.ruleId === "monotonic-shrink-loop")?.passed).toBe(false);
  });

  it("rejects monotonic-stack operations hidden in never-taken branches", () => {
    const code = `function scan(items: number[]) {
      const stack: number[] = [];
      for (const item of items) {
        while (stack.length && stack[stack.length - 1] > item) { if (false) stack.pop(); }
        if (false) stack.push(item);
      }
      return 0;
    }`;
    expect(validateDrill(code, drillById("monotonic-stack-increasing")).valid).toBe(false);
  });

  it("requires recursive DFS to visit both child sides", () => {
    const code = `function visit(node: any): number {
      if (!node) return 0;
      return visit(node.left) + visit(node.left);
    }`;
    const result = validateDrill(code, drillById("binary-tree-dfs-recursive"));
    expect(result.checks.find((check) => check.ruleId === "recursive-child-visits")?.passed).toBe(false);
  });

  it("requires iterative tree traversal to guard each child push", () => {
    const code = `function visit(root: any) {
      const stack = [root]; let answer = 0;
      while (stack.length) {
        const node = stack.pop();
        stack.push(node.left); stack.push(node.right);
      }
      return answer;
    }`;
    const result = validateDrill(code, drillById("binary-tree-dfs-iterative"));
    expect(result.checks.find((check) => check.ruleId === "visits-tree-children")?.passed).toBe(false);
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

  it("validates one complete top-level candidate when helpers are declared first", () => {
    const code = `function helper() { return 1; }
    function build(items: string[]) {
      let output = "";
      for (const item of items) output += item;
      return output;
    }`;
    expect(validateDrill(code, drillById("string-building-concatenation")).valid).toBe(true);
  });

  it("does not combine rule evidence across top-level functions", () => {
    const code = `function append(items: string[]) {
      let output = "";
      for (const item of items) output += item;
      return 0;
    }
    function returnOnly(items: string[]) {
      let output = "";
      return output;
    }`;
    expect(validateDrill(code, drillById("string-building-concatenation")).valid).toBe(false);
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

  it("fails safely for an unknown validator variant", () => {
    const base = drillById("two-pointers-opposite-ends");
    const misconfigured = {
      ...base,
      validation: { schemaVersion: 1, variant: "missing-variant" },
    } as unknown as TemplateDrill;
    const result = validateDrill(base.canonicalCode, misconfigured);
    expect(result.valid).toBe(false);
    expect(result.configurationErrors[0]).toMatch(/registered/);
  });
});
