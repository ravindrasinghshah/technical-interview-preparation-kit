import { beforeEach, describe, expect, it } from "vitest";
import { clearProgress, completeDrill, loadProgress, PROGRESS_KEY, saveProgress } from "./progress";

describe("progress", () => {
  beforeEach(() => localStorage.clear());
  it("falls back for missing and malformed data", () => {
    expect(loadProgress()).toEqual({ version: 1, completedDrillIds: [] });
    localStorage.setItem(PROGRESS_KEY, "not-json");
    expect(loadProgress()).toEqual({ version: 1, completedDrillIds: [] });
  });
  it("saves unique completions", () => {
    const once = completeDrill(loadProgress(), "drill-1");
    const twice = completeDrill(once, "drill-1");
    saveProgress(twice);
    expect(loadProgress().completedDrillIds).toEqual(["drill-1"]);
  });
  it("clears saved progress", () => {
    saveProgress({ version: 1, completedDrillIds: ["drill-1"] });
    expect(clearProgress()).toEqual({ version: 1, completedDrillIds: [] });
    expect(localStorage.getItem(PROGRESS_KEY)).toBeNull();
  });
});
