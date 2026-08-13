import ts from "typescript";
import type { SourceDiagnostic } from "../../types";

type SourceWithDiagnostics = ts.SourceFile & { parseDiagnostics: readonly ts.DiagnosticWithLocation[] };

export function parseSubmission(code: string): { source: ts.SourceFile; syntaxErrors: SourceDiagnostic[] } {
  const source = ts.createSourceFile("submission.ts", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const syntaxErrors = (source as SourceWithDiagnostics).parseDiagnostics.map((diagnostic) => {
    const position = source.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    return {
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, " "),
      line: position.line + 1,
      column: position.character + 1,
    };
  });
  return { source, syntaxErrors };
}
