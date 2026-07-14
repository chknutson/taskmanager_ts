import { getTodayRange, endOfDaysFromToday } from "./date";
import type { Task } from "@/generated/prisma/client";

export function getOverdueTasks(tasks: Task[]) {
  const { start } = getTodayRange();

  return tasks.filter((t) => {
    if (!t.due_date || t.completed) return false;

    return t.due_date < start;
  });
}

export function getDueTodayTasks(tasks: Task[]) {
  const { start, end } = getTodayRange();

  return tasks.filter((t) => {
    if (!t.due_date || t.completed) return false;

    return t.due_date >= start && t.due_date < end;
  });
}

export function getUpcomingTasks(tasks: Task[], days = 3) {
  const { end } = getTodayRange();
  const upcomingEnd = endOfDaysFromToday(days);

  return tasks.filter((t) => {
    if (!t.due_date || t.completed) return false;

    return t.due_date >= end && t.due_date <= upcomingEnd;
  });
}

export function getCompletedTasks(tasks: Task[]) {
  return tasks.filter((t) => t.completed);
}

// import { getTodayRange, endOfDaysFromToday } from "./date";
// import type { Task } from "@/generated/prisma/client";

// export function getOverdueTasks(tasks: Task[]) {
//   const { start } = getTodayRange();

//   return tasks.filter((t) => {
//     if (!t.due_date || t.completed) return false;

//     return t.due_date < start;
//   });
// }

// export function getDueTodayTasks(tasks: Task[]) {
//   const { start, end } = getTodayRange();

//   return tasks.filter((t) => {
//     if (!t.due_date || t.completed) return false;

//     return t.due_date >= start && t.due_date < end;
//   });
// }

// export function getUpcomingTasks(tasks: Task[], days = 3) {
//   const { end } = getTodayRange();
//   const upcomingEnd = endOfDaysFromToday(days);

//   return tasks.filter((t) => {
//     if (!t.due_date || t.completed) return false;

//     return t.due_date >= end && t.due_date <= upcomingEnd;
//   });
// }

// export function getCompletedTasks(tasks: Task[]) {
//   return tasks.filter((t) => t.completed);
// }