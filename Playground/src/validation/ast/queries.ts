import ts from "typescript";
import type { LoopNode, ValidationContext } from "./context";

export interface Mutation {
  name: string;
  direction: "increment" | "decrement" | "assign";
  node: ts.Node;
  value?: ts.Expression;
}

export interface Assignment {
  name: string;
  value: ts.Expression;
  node: ts.BinaryExpression;
}

export const nodeText = (node: ts.Node, context: ValidationContext): string => node.getText(context.source);

export function declarationName(declaration: ts.VariableDeclaration | ts.ParameterDeclaration): string | null {
  return ts.isIdentifier(declaration.name) ? declaration.name.text : null;
}

export function loopCondition(loop: LoopNode): ts.Expression | null {
  if (ts.isForStatement(loop)) return loop.condition ?? null;
  if (ts.isWhileStatement(loop) || ts.isDoStatement(loop)) return loop.expression;
  return null;
}

export function walk(node: ts.Node, visitor: (node: ts.Node) => void): void {
  const root = node;
  const visit = (current: ts.Node): void => {
    if (current !== root && ts.isFunctionLike(current)) return;
    visitor(current);
    ts.forEachChild(current, visit);
  };
  visit(node);
}

export function identifiers(node: ts.Node): Set<string> {
  const names = new Set<string>();
  walk(node, (current) => {
    if (ts.isIdentifier(current)) names.add(current.text);
  });
  return names;
}

export function resolvedIdentifiers(node: ts.Node, context: ValidationContext): Set<string> {
  const declarations = new Map<string, ts.Expression>();
  for (const declaration of context.variables) {
    const name = declarationName(declaration);
    if (name && declaration.initializer) declarations.set(name, declaration.initializer);
  }

  const resolved = identifiers(node);
  const queue = [...resolved];
  const expanded = new Set<string>();
  while (queue.length > 0) {
    const name = queue.shift()!;
    if (expanded.has(name)) continue;
    expanded.add(name);
    const initializer = declarations.get(name);
    if (!initializer) continue;
    for (const dependency of identifiers(initializer)) {
      if (!resolved.has(dependency)) {
        resolved.add(dependency);
        queue.push(dependency);
      }
    }
  }
  return resolved;
}

export function containsComparison(node: ts.Node): boolean {
  let found = false;
  const comparisonKinds = new Set<ts.SyntaxKind>([
    ts.SyntaxKind.LessThanToken,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.SyntaxKind.GreaterThanToken,
    ts.SyntaxKind.GreaterThanEqualsToken,
    ts.SyntaxKind.EqualsEqualsToken,
    ts.SyntaxKind.EqualsEqualsEqualsToken,
    ts.SyntaxKind.ExclamationEqualsToken,
    ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ]);
  walk(node, (current) => {
    if (ts.isBinaryExpression(current) && comparisonKinds.has(current.operatorToken.kind)) found = true;
  });
  return found;
}

export function containsLengthAccess(node: ts.Node): boolean {
  let found = false;
  walk(node, (current) => {
    if (ts.isPropertyAccessExpression(current) && current.name.text === "length") found = true;
  });
  return found;
}

export function isZero(expression: ts.Expression | undefined): boolean {
  return Boolean(expression && ts.isNumericLiteral(expression) && Number(expression.text) === 0);
}

export function referencesLength(expression: ts.Expression, context?: ValidationContext, seen = new Set<string>()): boolean {
  let found = false;
  walk(expression, (current) => {
    if (ts.isPropertyAccessExpression(current) && current.name.text === "length") found = true;
    if (!context || !ts.isIdentifier(current) || seen.has(current.text)) return;
    const declaration = context.variables.find((item) => declarationName(item) === current.text);
    if (!declaration?.initializer) return;
    seen.add(current.text);
    if (referencesLength(declaration.initializer, context, seen)) found = true;
  });
  return found;
}

export function isLengthMinusOne(expression: ts.Expression | undefined, context?: ValidationContext): boolean {
  if (!expression || !ts.isBinaryExpression(expression) || expression.operatorToken.kind !== ts.SyntaxKind.MinusToken) return false;
  return referencesLength(expression.left, context) && ts.isNumericLiteral(expression.right) && Number(expression.right.text) === 1;
}

function mutationDirection(expression: ts.BinaryExpression, name: string): Mutation["direction"] {
  if (expression.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) return "increment";
  if (expression.operatorToken.kind === ts.SyntaxKind.MinusEqualsToken) return "decrement";
  if (expression.operatorToken.kind !== ts.SyntaxKind.EqualsToken || !ts.isBinaryExpression(expression.right)) return "assign";
  const rightNames = identifiers(expression.right);
  if (!rightNames.has(name)) return "assign";
  if (expression.right.operatorToken.kind === ts.SyntaxKind.PlusToken) return "increment";
  if (expression.right.operatorToken.kind === ts.SyntaxKind.MinusToken) return "decrement";
  return "assign";
}

export function mutations(node: ts.Node): Mutation[] {
  const results: Mutation[] = [];
  walk(node, (current) => {
    if (ts.isPrefixUnaryExpression(current) || ts.isPostfixUnaryExpression(current)) {
      if (!ts.isIdentifier(current.operand)) return;
      if (current.operator === ts.SyntaxKind.PlusPlusToken) results.push({ name: current.operand.text, direction: "increment", node: current });
      if (current.operator === ts.SyntaxKind.MinusMinusToken) results.push({ name: current.operand.text, direction: "decrement", node: current });
      return;
    }
    if (!ts.isBinaryExpression(current) || !ts.isIdentifier(current.left)) return;
    const assignmentKinds = new Set<ts.SyntaxKind>([ts.SyntaxKind.EqualsToken, ts.SyntaxKind.PlusEqualsToken, ts.SyntaxKind.MinusEqualsToken]);
    if (!assignmentKinds.has(current.operatorToken.kind)) return;
    results.push({ name: current.left.text, direction: mutationDirection(current, current.left.text), node: current, value: current.right });
  });
  return results;
}

export function assignments(node: ts.Node): Assignment[] {
  const results: Assignment[] = [];
  walk(node, (current) => {
    if (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isIdentifier(current.left)) {
      results.push({ name: current.left.text, value: current.right, node: current });
    }
  });
  return results;
}

export function elementAccessIndices(node: ts.Node): Set<string> {
  const result = new Set<string>();
  walk(node, (current) => {
    if (ts.isElementAccessExpression(current) && current.argumentExpression) {
      for (const name of identifiers(current.argumentExpression)) result.add(name);
    }
  });
  return result;
}

export function callsWithin(node: ts.Node): ts.CallExpression[] {
  const result: ts.CallExpression[] = [];
  walk(node, (current) => {
    if (ts.isCallExpression(current)) result.push(current);
  });
  return result;
}
