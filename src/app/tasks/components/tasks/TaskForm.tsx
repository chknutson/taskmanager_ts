"use client";

// import { createTask } from "@/app/actions/createTask";
import { createTask } from "../../../actions/createTask";
import { Category } from "@/generated/prisma/enums";

type TaskFormProps = {
  task?: {
    id: number;
    title: string;
    description: string | null;
    category: Category;
    dueDate: Date | null;
  };
  action: (formData: FormData) => Promise<void>;
};

export default function TaskForm({ task, action }: TaskFormProps) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="border rounded p-2 w-full"
          defaultValue={task?.title}
        />
      </div>

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

      <select
        id="category"
        name="category"
        className="border rounded p-2 w-full"
        // defaultValue=""
        defaultValue={task?.category ?? ""}
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

      <button
        type="submit"
        className="border rounded px-4 py-2"
      >
        Save Task
      </button>
    </form>
  );
}