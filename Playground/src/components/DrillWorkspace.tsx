import { useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { ArrowLeft, Check, ChevronRight, CircleAlert, ExternalLink, Eye, EyeOff, RotateCcw } from "lucide-react";
import type { TemplateDrill, ValidationResult } from "../types";
import { validateDrill } from "../lib/validator";

interface Props { drill: TemplateDrill; completed: boolean; onBack: () => void; onComplete: (id: string) => void; }

export function DrillWorkspace({ drill, completed, onBack, onComplete }: Props) {
  const [code, setCode] = useState(drill.starterCode);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const extensions = useMemo(() => [javascript({ typescript: true })], []);

  const validate = () => {
    const next = validateDrill(code, drill);
    setResult(next);
    if (next.valid) onComplete(drill.id);
  };
  const reset = () => {
    if (code === drill.starterCode || window.confirm("Discard your changes and restore the starter code?")) {
      setCode(drill.starterCode); setResult(null); setShowAnswer(false);
    }
  };

  return (
    <main className="workspace">
      <header className="workspace-header">
        <button className="back-button" onClick={onBack}><ArrowLeft size={18} /> Library</button>
        <div className="crumb"><span>{drill.patternId.replaceAll("-", " ")}</span><ChevronRight size={14} /><strong>{drill.title}</strong></div>
        <span className={completed ? "completed-pill" : "practice-pill"}>{completed ? <><Check size={14} /> Completed</> : "In practice"}</span>
      </header>
      <div className="workspace-grid">
        <aside className="brief-panel">
          <p className="overline">{drill.eyebrow}</p><h1>{drill.title}</h1><p className="prompt">{drill.prompt}</p>
          <div className="mental-model"><span>MENTAL MODEL</span><p>{drill.explanation}</p></div>
          <a href={drill.referenceUrl} target="_blank" rel="noreferrer">Review the pattern <ExternalLink size={14} /></a>
        </aside>
        <section className="editor-panel">
          <div className="editor-toolbar"><div><i /><span>solution.ts</span></div><span>TypeScript</span></div>
          <CodeMirror value={code} height="430px" extensions={extensions} onChange={(value) => { setCode(value); setResult(null); }} theme="dark" basicSetup={{ foldGutter: false, dropCursor: false, allowMultipleSelections: false }} />
          <div className="editor-actions">
            <button className="icon-button" onClick={reset}><RotateCcw size={16} /> Reset</button>
            <button className="icon-button" onClick={() => setShowAnswer((shown) => !shown)}>{showAnswer ? <EyeOff size={16} /> : <Eye size={16} />}{showAnswer ? "Hide answer" : "Show answer"}</button>
            <button className="validate-button" onClick={validate}>Validate template <ChevronRight size={16} /></button>
          </div>
        </section>
        <aside className="feedback-panel" aria-live="polite">
          <p className="overline">STRUCTURAL FEEDBACK</p>
          {!result && !showAnswer && <div className="empty-feedback"><div className="scan-icon">⌁</div><h2>Ready when you are</h2><p>We check the structure of your template—not variable names or formatting.</p></div>}
          {showAnswer && <div className="answer-box"><h2>Canonical template</h2><p>Revealing this does not complete the drill.</p><pre>{drill.canonicalCode}</pre></div>}
          {result && <div className="results">
            <h2>{result.valid ? "Template recalled!" : "Keep shaping it"}</h2>
            <p>{result.valid ? "Every essential concept is present." : "Use these checks to find the missing pieces."}</p>
            {result.configurationErrors.map((error) => <div className="syntax-error" key={error}><CircleAlert size={17} /><span><strong>Validation unavailable</strong>{error}</span></div>)}
            {result.syntaxErrors.map((error) => <div className="syntax-error" key={`${error.line}-${error.column}`}><CircleAlert size={17} /><span><strong>Line {error.line}:{error.column}</strong>{error.message}</span></div>)}
            <ul>{result.checks.map((check) => <li className={check.passed ? "pass" : "fail"} key={check.ruleId}><span>{check.passed ? <Check size={14} /> : <CircleAlert size={14} />}</span>{check.message}</li>)}</ul>
          </div>}
        </aside>
      </div>
    </main>
  );
}
