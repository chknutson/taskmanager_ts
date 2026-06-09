"use client";

import { Category } from "@/generated/prisma/enums";

type Task = {
  id: number;
  title: string;
  description: string | null;
  category: Category;
  dueDate: Date | null;
};

type TaskFormProps = {
  task?: Task;
  action: (formData: FormData) => Promise<void>;
};

export default function TaskForm({ task, action }: TaskFormProps) {
  return (
    <form action={action} className="space-y-4">

      {/* ✅ Hidden ID (ONLY for edit mode) */}
      {task?.id && (
        <input type="hidden" name="id" value={task.id} />
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="border rounded p-2 w-full"
          defaultValue={task?.title ?? ""}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded p-2 w-full"
          defaultValue={task?.description ?? ""}
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>

        <select
          id="category"
          name="category"
          className="border rounded p-2 w-full"
          defaultValue={task?.category ?? ""}
          required
        >
          <option value="" disabled>
            Select a category
          </option>

          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label htmlFor="dueDate" className="block font-medium">
          Due Date
        </label>

        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="border rounded p-2"
          defaultValue={
            task?.dueDate
              ? new Date(task.dueDate).toISOString().split("T")[0]
              : ""
          }
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="border rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
      >
        {task ? "Update Task" : "Create Task"}
      </button>

    </form>
  );
}