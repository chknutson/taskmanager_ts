import { prisma } from "@/lib/prisma";
import TaskList from "@/app/tasks/components/tasks/TaskList";
// import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import Link from "next/link";


export default async function TasksPage() {
  const tasks = await prisma.task.findMany({});
  //   orderBy: {
  //     due_date: "asc",
  //   }
  // });




  return (
    <main className="p-6">
      <header className="mb-6">

        <h1 className="text-3xl font-bold mb-4">
        My Tasks
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
          New Task
        </Link>

        <Link
          href="/calendar"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Calendar
        </Link>
      </div>



      </header>

      <TaskList tasks={tasks} />
    </main>
  );
}
