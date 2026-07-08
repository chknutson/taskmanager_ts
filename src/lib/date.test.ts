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

    expect(start.getFullYear()).toBe(2026);
    expect(start.getMonth()).toBe(6); // 0-indexed, so 6 = July
    expect(start.getDate()).toBe(8);
    expect(start.getHours()).toBe(0);
    expect(start.getMinutes()).toBe(0);
    expect(start.getSeconds()).toBe(0);
    expect(start.getMilliseconds()).toBe(0);
  });

  it("returns end at midnight the next day", () => {
    vi.setSystemTime(new Date("2026-07-08T15:30:00"));

    const { end } = getTodayRange();

    expect(end.getDate()).toBe(9);
    expect(end.getHours()).toBe(0);
    expect(end.getMinutes()).toBe(0);
    expect(end.getSeconds()).toBe(0);
  });

  it("handles month rollover correctly", () => {
    vi.setSystemTime(new Date("2026-07-31T09:00:00"));

    const { start, end } = getTodayRange();

    expect(start.getDate()).toBe(31);
    expect(start.getMonth()).toBe(6); // July

    expect(end.getDate()).toBe(1);
    expect(end.getMonth()).toBe(7); // August
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

    expect(result.getDate()).toBe(11);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("returns the end of today when days is 0", () => {
    vi.setSystemTime(new Date("2026-07-08T10:00:00"));

    const result = endOfDaysFromToday(0);

    expect(result.getDate()).toBe(8);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
  });

  it("handles month rollover correctly", () => {
    vi.setSystemTime(new Date("2026-07-30T10:00:00"));

    const result = endOfDaysFromToday(3);

    expect(result.getMonth()).toBe(7); // August
    expect(result.getDate()).toBe(2);
  });
});
