import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { drills, patternInfo } from "../config/practiceCatalog.config";
import type { PatternId } from "../types";

interface Props {
  completedIds: string[];
  onOpen: (id: string) => void;
  onReset: () => void;
}

export function Dashboard({ completedIds, onOpen, onReset }: Props) {
  const patternIds = Object.keys(patternInfo) as PatternId[];
  return (
    <main className="dashboard">
      <section className="hero">
        <div>
          <h1>Practice coding patterns.</h1>
          <p className="hero-copy">Choose a template and write it from memory.</p>
        </div>
        <div className="progress-orbit" aria-label={`${completedIds.length} of ${drills.length} drills completed`}>
          <strong>{completedIds.length}</strong><span>/ {drills.length}</span><small>templates recalled</small>
        </div>
      </section>

      <section className="section-heading">
        <div><p className="overline">PRACTICE LIBRARY</p><h2>Choose a pattern</h2></div>
        {completedIds.length > 0 && <button className="ghost-button" onClick={onReset}><RotateCcw size={15} /> Reset progress</button>}
      </section>

      <div className="pattern-grid">
        {patternIds.map((patternId, index) => {
          const items = drills.filter((drill) => drill.patternId === patternId);
          const completed = items.filter((drill) => completedIds.includes(drill.id)).length;
          const info = patternInfo[patternId];
          return (
            <article className={`pattern-card ${info.accent}`} key={patternId}>
              <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
              <div className="card-top"><span>{completed}/{items.length} complete</span><div className="mini-progress"><i style={{ width: `${completed / items.length * 100}%` }} /></div></div>
              <h3>{info.title}</h3><p>{info.description}</p>
              <div className="drill-list">
                {items.map((drill) => (
                  <button key={drill.id} onClick={() => onOpen(drill.id)}>
                    <span className={completedIds.includes(drill.id) ? "status complete" : "status"}>{completedIds.includes(drill.id) && <Check size={13} />}</span>
                    <span>{drill.title}</span><ArrowRight size={16} />
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
