import { deleteTask } from "@/app/actions/deleteTask";
import Link from "next/link";

type TaskCardProps = {
  task: {
    id: number;
    task: string;
    description: string;
    completed: boolean;
    due_date: Date | null;
  };
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="border rounded p-4 mb-4">
      <span>Task: {task.task}</span>

      {task.description && (
        <p className="text-sm text-grey-600-mt-1">
          Description: {task.description}
        </p>
      )}


      {task.due_date && (
        <span className="text-gray-500 block">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </span>
      )}

      <div className="flex gap-4 mt-2">
        <Link
          href={`/tasks/${task.id}/edit`}
          className="text-blue-600"
        >
          Edit
        </Link>

        <form action={deleteTask}>
          <input
            type="hidden"
            name="id"
            value={task.id}
          />

          <button
            type="submit"
            className="text-red-600"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}