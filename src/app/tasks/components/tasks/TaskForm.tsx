
"use client";

import { Category } from "@/generated/prisma/enums";
import { categoryButtonColors } from "@/lib/categoryColors";

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
    <div className="rounded-xl border p-4 shadow-sm bg-slate-400 p-6">
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
            className="border rounded p-2 w-full bg-slate-200"
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
            className="border rounded p-2 w-full bg-slate-200"
            defaultValue={task?.description ?? ""}
          />
        </div>

        {/* Old form */}

        {/* Category
        <div>
          <label htmlFor="category" className="block font-medium">
            Category
          </label>

          <select
            id="category"
            name="category"
            className="border rounded p-2 w-40 bg-slate-200"
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
    
    <div className="flex gap-4">
      {/* Category */}
      <div>
        <label htmlFor="category" className="block font-medium">
          Category
        </label>

        <select
          id="category"
          name="category"
          className="border rounded p-2 w-40 bg-slate-200"
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
          className="border rounded p-2 bg-slate-200"
          defaultValue={
            task?.dueDate
              ? new Date(task.dueDate).toISOString().split("T")[0]
              : ""
          }
        />
      </div>
    </div>

        {/* Submit Button */}
        <button
          type="submit"
          // className="border rounded px-4 py-2 bg-blue-600 text-white"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {task ? "Update Task" : "Create Task"}
        </button>

      </form>
    </div>
  );
}