import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DashboardBox from "./tasks/components/DashboardCard";
import { getTodayRange } from "@/lib/date";
import { endOfDaysFromToday } from "@/lib/date";

export default async function HomePage() {
  const tasks = await prisma.task.findMany();

  // const total = tasks.length;
  const completed = tasks.filter(t => t.completed);

  const completedCount = completed.length

  const { start, end } = getTodayRange();

  const dueTodayTasks = tasks.filter(t => {
    if (!t.due_date || t.completed) return false;
  
    const due = new Date(t.due_date);
    if (isNaN(due.getTime())) return false;
  
    return due >= start && due < end;
  });

  // const dueToday = tasks.filter(t =>
  //   t.due_date &&
  //   new Date(t.due_date).toDateString() === today)

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
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">
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
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DashboardBox title="Overdue" count={overdue} tasks={overdueTasks} />
        <DashboardBox title="Due Today" count={dueTodayCount} tasks={dueTodayTasks} />
        <DashboardBox title="Upcoming" count={upcomingTaskCount} tasks={upcomingTasks} />
        <DashboardBox title="Completed" count={completedCount} tasks={completed} />
      </div>
      
    </main>
  );
}