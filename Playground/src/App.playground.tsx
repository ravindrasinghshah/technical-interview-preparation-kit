import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => { localStorage.clear(); vi.spyOn(window, "confirm").mockReturnValue(true); });
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
    expect(screen.getByLabelText("1 of 9 drills completed")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /reset progress/i }));
    expect(screen.getByLabelText("0 of 9 drills completed")).toBeInTheDocument();
  });
});
