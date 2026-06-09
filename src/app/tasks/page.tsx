import { prisma } from "@/lib/prisma";
import TaskList from "@/app/tasks/components/tasks/TaskList";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";


export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      due_date: "asc",
    }
  });

    

  

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      <TaskList tasks={tasks} />
    </main>
  );
}