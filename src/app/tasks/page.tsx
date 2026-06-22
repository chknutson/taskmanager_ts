import { prisma } from "@/lib/prisma";
import { Prisma, Category } from "@/generated/prisma/client";
import TaskList from "@/app/tasks/components/tasks/TaskList";
import TaskFilters from "./components/tasks/TaskFilters"; 
import Link from "next/link";


export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    due?: string;
  }>;
}) {
  const { category, due } = await searchParams;

  const where: Prisma.TaskWhereInput = {};
  if (category && Object.values(Category).includes(category as Category)) {
    where.category = category as Category;
  }
  
  if (due === "overdue") {
    where.completed = false;
    where.due_date = {
      lt: new Date(),
    };
  }
  
  if (due === "completed") {
    where.completed = true;
  }

  if (due === "dueTodayTasks") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
  
    const end = new Date();
    end.setHours(23, 59, 59, 999);
  
    where.due_date = {
      gte: start,
      lte: end,
    };
  }

  if (due === "upcoming") {
    const start = new Date();
    start.setDate(start.getDate() + 1);
    start.setHours(0, 0, 0, 0);
  
    const end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(23, 59, 59, 999);
  
    where.due_date = {
      gte: start,
      lte: end,
    };
  }
  

  const tasks = await prisma.task.findMany({
    where,
    orderBy: {
      due_date: "asc",
    },
  });



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
          Overview
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

      {/* <TaskList tasks={tasks} /> */}
      {/* <TaskFilters /> */}
      <TaskFilters
        category={category}
        due={due}
      />

      <TaskList tasks={tasks} />
    </main>
  );
}
