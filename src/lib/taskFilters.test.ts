import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getOverdueTasks, getUpcomingTasks } from "@/lib/taskFilters";
import type { Task } from "@/generated/prisma/client";

// Minimal helper to build a Task without repeating every field each time.
// Adjust the default fields here if your Task model has more required columns.
function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 1,
    task: "Test task",
    description: null,
    category: "Work",
    due_date: null,
    completed: false,
    ...overrides,
  } as Task;
}

describe("getOverdueTasks", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-08T12:00:00")); // "now"
    // getTodayRange() -> start = 2026-07-08T00:00:00
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("includes an incomplete task whose due date is before today", () => {
    const overdue = makeTask({ id: 1, due_date: new Date("2026-07-07T10:00:00") });

    const result = getOverdueTasks([overdue]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("excludes a task due exactly at the start of today (boundary)", () => {
    const dueToday = makeTask({ id: 2, due_date: new Date("2026-07-08T00:00:00") });

    const result = getOverdueTasks([dueToday]);

    expect(result).toHaveLength(0);
  });

  it("excludes a completed task even if its due date is in the past", () => {
    const completedOverdue = makeTask({
      id: 3,
      due_date: new Date("2026-07-01T00:00:00"),
      completed: true,
    });

    const result = getOverdueTasks([completedOverdue]);

    expect(result).toHaveLength(0);
  });

  it("excludes a task with no due date", () => {
    const noDueDate = makeTask({ id: 4, due_date: null });

    const result = getOverdueTasks([noDueDate]);

    expect(result).toHaveLength(0);
  });
});

describe("getUpcomingTasks", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-08T12:00:00")); // "now"
    // getTodayRange().end -> 2026-07-09T00:00:00
    // endOfDaysFromToday(3) -> 2026-07-11T23:59:59.999
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("includes a task due tomorrow (start of window, boundary)", () => {
    const tomorrow = makeTask({ id: 1, due_date: new Date("2026-07-09T00:00:00") });

    const result = getUpcomingTasks([tomorrow]);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("excludes a task due later today (before the window starts)", () => {
    const laterToday = makeTask({ id: 2, due_date: new Date("2026-07-08T23:59:00") });

    const result = getUpcomingTasks([laterToday]);

    expect(result).toHaveLength(0);
  });

  it("includes a task due at the end of the window (default 3 days)", () => {
    const endOfWindow = makeTask({ id: 3, due_date: new Date("2026-07-11T23:59:59.999") });

    const result = getUpcomingTasks([endOfWindow]);

    expect(result).toHaveLength(1);
  });

  it("excludes a task due after the window", () => {
    const tooFar = makeTask({ id: 4, due_date: new Date("2026-07-12T00:00:00") });

    const result = getUpcomingTasks([tooFar]);

    expect(result).toHaveLength(0);
  });

  it("respects a custom `days` argument", () => {
    const dueInFiveDays = makeTask({ id: 5, due_date: new Date("2026-07-13T12:00:00") });

    expect(getUpcomingTasks([dueInFiveDays], 3)).toHaveLength(0);
    expect(getUpcomingTasks([dueInFiveDays], 5)).toHaveLength(1);
  });

  it("excludes completed tasks even if due date is within the window", () => {
    const completedUpcoming = makeTask({
      id: 6,
      due_date: new Date("2026-07-09T10:00:00"),
      completed: true,
    });

    const result = getUpcomingTasks([completedUpcoming]);

    expect(result).toHaveLength(0);
  });
});
