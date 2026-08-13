import { useState } from "react";
import { Braces } from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { DrillWorkspace } from "./components/DrillWorkspace";
import { drills } from "./config/practiceCatalog.config";
import { clearProgress, completeDrill, loadProgress, saveProgress } from "./lib/progress";
import type { SavedProgressV1 } from "./types";

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState<SavedProgressV1>(() => loadProgress());
  const active = drills.find((drill) => drill.id === activeId);
  const knownCompletedIds = progress.completedDrillIds.filter((id) => drills.some((drill) => drill.id === id));
  const markComplete = (id: string) => setProgress((current) => {
    const next = completeDrill(current, id);
    saveProgress(next);
    return next;
  });
  const resetProgress = () => {
    if (!window.confirm("Reset all completed templates? This cannot be undone.")) return;
    setProgress(clearProgress());
  };

  return (
    <div className="app-shell">
      <nav className="top-nav">
        <button className="brand" onClick={() => setActiveId(null)}><span><Braces size={19} /></span>pattern/playground</button>
        <span className="local-badge"><i /> local practice</span>
      </nav>
      {active ? <DrillWorkspace key={active.id} drill={active} completed={knownCompletedIds.includes(active.id)} onBack={() => setActiveId(null)} onComplete={markComplete} /> : <Dashboard completedIds={knownCompletedIds} onOpen={setActiveId} onReset={resetProgress} />}
      <footer><span>Pattern Playground</span><span>Your code never leaves this browser.</span></footer>
    </div>
  );
}
