import Calendar from "@/app/tasks/components/Calendar/calendar";
import { prisma } from "@/lib/prisma";

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
      <h1 className="text-3xl font-bold mb-6">
        Calendar
      </h1>

      <Calendar events={events} />
    </main>
  );
}