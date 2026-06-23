import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DashboardBox from "./tasks/components/DashboardCard";
import { getTodayRange } from "@/lib/date";
import { endOfDaysFromToday } from "@/lib/date";

export default async function HomePage() {
  const tasks = await prisma.task.findMany();

  const completed = tasks.filter(t => t.completed);

  const completedCount = completed.length

  const { start, end } = getTodayRange();

  const dueTodayTasks = tasks.filter(t => {
    if (!t.due_date || t.completed) return false;
  
    const due = new Date(t.due_date);
    if (isNaN(due.getTime())) return false;
  
    return due >= start && due < end;
  });

  const dueTodayCount = dueTodayTasks.length


  const upcomingEnd = endOfDaysFromToday(3);

  const upcomingTasks = tasks.filter(t => {
    if (!t.due_date || t.completed) return false;
  
    const due = new Date(t.due_date);
  
    return due >= end && due <= upcomingEnd;
  });

  
  const upcomingTaskCount = upcomingTasks.length


  const overdueTasks = tasks.filter(t =>
    t.due_date &&
    new Date(t.due_date) < new Date() &&
    !t.completed)
  
  const overdue = overdueTasks.length



  return (
    <main className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-3xl text-slate-200 font-bold mb-4">
        Task Overview
      </h1>

      <div className="flex gap-4 mb-4">
        <Link
          href="/tasks"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Tasks
        </Link>

        <Link
          href="/tasks/new"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          New Task
        </Link>

        <Link
          href="/calendar"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Calendar
        </Link>
      </div>
      


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
        <DashboardBox
          title="Overdue"
          count={overdue}
          href="/tasks?due=overdue"
          tasks={overdueTasks}
          color="red"
        />

        <DashboardBox
          title="Due Today"
          count={dueTodayCount}
          href="/tasks?due=dueTodayTasks"
          tasks={dueTodayTasks}
          color="blue"
        />

        <DashboardBox
          title="Upcoming"
          count={upcomingTaskCount}
          href="/tasks?due=upcoming"
          tasks={upcomingTasks}
          color="purple"
        />

        <DashboardBox
          title="Completed"
          count={completedCount}
          href="/tasks?due=completed"
          tasks={completed}
          color="green"
        />
      </div>
      
    </main>
  );
}