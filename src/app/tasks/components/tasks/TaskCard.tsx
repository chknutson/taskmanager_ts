"use client";

import { deleteTask } from "@/app/actions/deleteTask";
import { toggleTask } from "@/app/actions/toggleTask";
import { Category } from "@/generated/prisma/enums";
import Link from "next/link";

type TaskCardProps = {
  task: {
    id: number;
    task: string;
    description: string;
    completed: boolean;
    category: Category
    due_date: Date | null;
  };
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="border rounded p-4 mb-4">
      <span className={task.completed ? "line-through text-gray-400" : ""}>
        Task: {task.task}
      </span>

      {task.description && (
        <p className="text-gray-500 block">
          Description: {task.description}
        </p>
      )}

      {task.due_date && (
        <span className="text-gray-500 block">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </span>
      )}

      <span className="text-gray-500 block">
        Category: {task.category}
      </span>

      <form action={toggleTask}>
        <input type="hidden" name="id" value={task.id} />
        <input type="hidden" name="completed" value={String(task.completed)} />

        <button className="text-green-600">
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </form>


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