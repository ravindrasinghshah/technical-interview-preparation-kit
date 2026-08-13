import type { SavedProgressV1 } from "../types";

export const PROGRESS_KEY = "pattern-playground:progress";
const empty = (): SavedProgressV1 => ({ version: 1, completedDrillIds: [] });

export function loadProgress(storage: Pick<Storage, "getItem"> = localStorage): SavedProgressV1 {
  try {
    const value: unknown = JSON.parse(storage.getItem(PROGRESS_KEY) ?? "null");
    if (!value || typeof value !== "object") return empty();
    const record = value as Partial<SavedProgressV1>;
    if (record.version !== 1 || !Array.isArray(record.completedDrillIds) || !record.completedDrillIds.every((id) => typeof id === "string")) return empty();
    return { version: 1, completedDrillIds: [...new Set(record.completedDrillIds)] };
  } catch {
    return empty();
  }
}

export function saveProgress(progress: SavedProgressV1, storage: Pick<Storage, "setItem"> = localStorage): void {
  storage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function completeDrill(progress: SavedProgressV1, drillId: string): SavedProgressV1 {
  return progress.completedDrillIds.includes(drillId)
    ? progress
    : { version: 1, completedDrillIds: [...progress.completedDrillIds, drillId] };
}

export function clearProgress(storage: Pick<Storage, "removeItem"> = localStorage): SavedProgressV1 {
  storage.removeItem(PROGRESS_KEY);
  return empty();
}
