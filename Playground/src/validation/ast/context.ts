import ts from "typescript";

export type LoopNode = ts.ForStatement | ts.ForInStatement | ts.ForOfStatement | ts.WhileStatement | ts.DoStatement;
export type PrimaryFunction = ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction | ts.MethodDeclaration;

export interface ValidationContext {
  source: ts.SourceFile;
  primaryFunction: PrimaryFunction | null;
  variables: ts.VariableDeclaration[];
  parameters: ts.ParameterDeclaration[];
  loops: LoopNode[];
  branches: ts.IfStatement[];
  returns: ts.ReturnStatement[];
  calls: ts.CallExpression[];
  newExpressions: ts.NewExpression[];
}

const isLoop = (node: ts.Node): node is LoopNode =>
  ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node) || ts.isWhileStatement(node) || ts.isDoStatement(node);

function topLevelFunctions(source: ts.SourceFile): PrimaryFunction[] {
  const functions: PrimaryFunction[] = [];
  for (const statement of source.statements) {
    if (ts.isFunctionDeclaration(statement) && statement.body) {
      functions.push(statement);
      continue;
    }
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      const initializer = declaration.initializer;
      if (initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))) functions.push(initializer);
    }
  }
  return functions;
}

function contextFor(source: ts.SourceFile, primaryFunction: PrimaryFunction | null): ValidationContext {
  const context: ValidationContext = {
    source,
    primaryFunction,
    variables: [],
    parameters: primaryFunction ? [...primaryFunction.parameters] : [],
    loops: [],
    branches: [],
    returns: [],
    calls: [],
    newExpressions: [],
  };

  if (!primaryFunction) return context;

  const visit = (node: ts.Node): void => {
    if (node !== primaryFunction && ts.isFunctionLike(node)) return;
    if (ts.isVariableDeclaration(node)) context.variables.push(node);
    if (isLoop(node)) context.loops.push(node);
    if (ts.isIfStatement(node)) context.branches.push(node);
    if (ts.isReturnStatement(node)) context.returns.push(node);
    if (ts.isCallExpression(node)) context.calls.push(node);
    if (ts.isNewExpression(node)) context.newExpressions.push(node);
    ts.forEachChild(node, visit);
  };

  visit(primaryFunction);
  return context;
}

export function createValidationContexts(source: ts.SourceFile): ValidationContext[] {
  const functions = topLevelFunctions(source);
  return functions.length > 0 ? functions.map((fn) => contextFor(source, fn)) : [contextFor(source, null)];
}

export function createValidationContext(source: ts.SourceFile): ValidationContext {
  return createValidationContexts(source)[0];
}

export function isDescendantOf(node: ts.Node, ancestor: ts.Node): boolean {
  for (let current: ts.Node | undefined = node.parent; current; current = current.parent) {
    if (current === ancestor) return true;
  }
  return false;
}
