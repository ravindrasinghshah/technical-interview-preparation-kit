import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { drills } from "./config/practiceCatalog.config";

describe("App", () => {
  beforeEach(() => { localStorage.clear(); vi.spyOn(window, "confirm").mockReturnValue(true); });
  afterEach(() => cleanup());
  it("navigates to a drill and reveals the answer", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /opposite ends/i }));
    expect(screen.getByRole("heading", { name: "Opposite ends" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /show answer/i }));
    expect(screen.getByText("Canonical template")).toBeInTheDocument();
  });
  it("shows persisted dashboard progress and resets it", () => {
    localStorage.setItem("pattern-playground:progress", JSON.stringify({ version: 1, completedDrillIds: ["two-pointers-opposite-ends"] }));
    render(<App />);
    expect(screen.getByLabelText(`1 of ${drills.length} drills completed`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reset progress/i }));
    expect(screen.getByLabelText(`0 of ${drills.length} drills completed`)).toBeInTheDocument();
  });

  it("opens a template added from the requirements document", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /reverse a linked list/i }));
    expect(screen.getByRole("heading", { name: "Reverse a linked list" })).toBeInTheDocument();
  });
});
