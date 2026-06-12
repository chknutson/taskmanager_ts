import { createTask } from "@/app/actions/createTask";
import TaskForm from "@/app/tasks/components/tasks/TaskForm";
import Link from "next/link";

export default function NewTaskPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        New Task
      </h1>

      <div className="flex gap-4 mb-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Homepage
        </Link>

        <Link
          href="/tasks"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Tasks
        </Link>

        <Link
          href="/calendar"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Calendar
        </Link>
      </div>

      <TaskForm action={createTask} />
    </main>
  );
}