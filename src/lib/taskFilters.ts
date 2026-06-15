import { getTodayRange, endOfDaysFromToday } from "./date";
import type { Task } from "@/generated/prisma/client";


export function getOverdueTasks(tasks: Task[]) {
  const { start } = getTodayRange();

  return tasks.filter(t => {
    if (!t.due_date || t.completed) return false;

    const due = new Date(t.due_date);

    return due < start;
  });
}

export function getUpcomingTasks(tasks: Task[], days = 3) {
  const { end } = getTodayRange();
  const upcomingEnd = endOfDaysFromToday(days);

  return tasks.filter(t => {
    if (!t.due_date || t.completed) return false;

    const due = new Date(t.due_date);

    return due >= end && due <= upcomingEnd;
  });
}