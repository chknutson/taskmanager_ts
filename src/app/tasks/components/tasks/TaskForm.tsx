"use client";

// import { createTask } from "@/app/actions/createTask";
import { createTask } from "../../../actions/createTask";
import { Category } from "@/generated/prisma/enums";


export default function TaskForm() {
  return (
    <form action={createTask} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="border rounded p-2 w-full"
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
        />
      </div>

      <select
        id="category"
        name="category"
        className="border rounded p-2 w-full"
        defaultValue=""
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

      {/* <div>
        <label htmlFor="category" className="block font-medium">
        Category
        </label>

        <select
            id="category"
            name="category"
            className="border rounded p-2 w-full"
            defaultValue=""
        >
            <option value="" disabled>
            Select a category
            </option>

            <option value="WORK">Work</option>
            <option value="SCHOOL">School</option>
            <option value="PERSONAL">Personal</option>
            <option value="HOME">Home</option>
        </select>
        </div> */}

        <div>
        <label htmlFor="dueDate" className="block font-medium">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="border rounded p-2"
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