import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getTodayRange, endOfDaysFromToday } from "@/lib/date";

describe("getTodayRange", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns start at midnight today", () => {
    vi.setSystemTime(new Date("2026-07-08T15:30:00"));

    const { start } = getTodayRange();

    expect(start.getUTCFullYear()).toBe(2026);
    expect(start.getUTCMonth()).toBe(6); // 0-indexed, so 6 = July
    expect(start.getUTCDate()).toBe(8);
    expect(start.getUTCHours()).toBe(0);
    expect(start.getUTCMinutes()).toBe(0);
    expect(start.getUTCSeconds()).toBe(0);
    expect(start.getUTCMilliseconds()).toBe(0);
  });

  it("returns end at midnight the next day", () => {
    vi.setSystemTime(new Date("2026-07-08T15:30:00"));

    const { end } = getTodayRange();

    expect(end.getUTCDate()).toBe(9);
    expect(end.getUTCHours()).toBe(0);
    expect(end.getUTCMinutes()).toBe(0);
    expect(end.getUTCSeconds()).toBe(0);
  });

  it("handles month rollover correctly", () => {
    vi.setSystemTime(new Date("2026-07-31T09:00:00"));

    const { start, end } = getTodayRange();

    expect(start.getUTCDate()).toBe(31);
    expect(start.getUTCMonth()).toBe(6); // July

    expect(end.getUTCDate()).toBe(1);
    expect(end.getUTCMonth()).toBe(7); // August
  });
});

describe("endOfDaysFromToday", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns the correct date N days ahead, at the end of that day", () => {
    vi.setSystemTime(new Date("2026-07-08T10:00:00"));

    const result = endOfDaysFromToday(3);

    expect(result.getUTCDate()).toBe(11);
    expect(result.getUTCHours()).toBe(23);
    expect(result.getUTCMinutes()).toBe(59);
    expect(result.getUTCSeconds()).toBe(59);
    expect(result.getUTCMilliseconds()).toBe(999);
  });

  it("returns the end of today when days is 0", () => {
    vi.setSystemTime(new Date("2026-07-08T10:00:00"));

    const result = endOfDaysFromToday(0);

    expect(result.getUTCDate()).toBe(8);
    expect(result.getUTCHours()).toBe(23);
    expect(result.getUTCMinutes()).toBe(59);
  });

  it("handles month rollover correctly", () => {
    vi.setSystemTime(new Date("2026-07-30T10:00:00"));

    const result = endOfDaysFromToday(3);

    expect(result.getUTCMonth()).toBe(7); // August
    expect(result.getUTCDate()).toBe(2);
  });
});