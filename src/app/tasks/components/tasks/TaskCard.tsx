"use client";

import { deleteTask } from "@/app/actions/deleteTask";
import { toggleTask } from "@/app/actions/toggleTask";
import { Category } from "@/generated/prisma/enums";
import { categoryButtonColors } from "@/lib/categoryColors";
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
  // console.log(task.due_date);
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm hover:shadow-md transition ${
        task.completed
          ? "bg-green-100 border-gray-200"
          : "bg-slate-400"
      }`}
         >
      {/* Task Title */}
      <h3
        className={`text-lg font-semibold ${
          task.completed
            ? "line-through text-gray-500"
            : "text-gray-900"
        }`}
      >
        {task.task}
      </h3>


      {/* Category and Due Date */}
      <div className="mt-3 flex flex-wrap gap-2">
      <span
        className={`rounded-full px-2 py-1 text-xs ${
          categoryButtonColors[task.category] ?? "bg-gray-100 text-gray-800"
        }`}
      >
        {task.category}
      </span>

        {task.due_date && (
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
            {/* Due {new Date(task.due_date).toLocaleDateString()} */}
            Due {task.due_date.toLocaleDateString("en-US", {
              timeZone: "UTC",
            })}
          </span>
        )}
      </div>

            {/* Description */}
            {task.description && (
        <p className="mt-2 text-sm text-gray-600">
          {task.description}
        </p>
      )}

      
      {/* Actions */}
      <div className="mt-4 flex justify-between items-center">
        
        {/* Complete Toggle */}
        <form action={toggleTask}>
          <input
            type="hidden"
            name="id"
            value={task.id}
          />

          <input
            type="hidden"
            name="completed"
            value={String(task.completed)}
          />

          <button
            type="submit"
            className="text-green-400 hover:text-green-800"
          >
            {task.completed ? "Mark Incomplete" : "Mark Completed"}
          </button>
        </form>


        {/* Edit / Delete */}
        <div className="flex gap-3">
          <Link
            href={`/tasks/${task.id}/edit`}
            className="text-blue-600 hover:text-blue-800"
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
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}