import Calendar from "@/app/tasks/components/Calendar/calendar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CalendarPage() {
  const tasks = await prisma.task.findMany({
    where: {
      due_date: {
        not: null,
      }
    }
  });

  const events = tasks.map((task) => ({
    id:
      task.id.toString(),
    title: task.task,
    date: task.due_date!.toISOString(),
  }));

  return (
    <main className="p-6">
      
      <h1 className="text-3xl font-bold mb-4">
        Calendar
      </h1>
      
      <div className="flex gap-4 mb-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Homepage
        </Link>

        <Link
          href="/tasks/new"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          New Tasks
        </Link>

        <Link
          href="/tasks"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Tasks
        </Link>
      </div>
      
      <Calendar events={events} />
    </main>
  );
}