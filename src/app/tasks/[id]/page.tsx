
import { updateTask } from "@/app/actions/updateTask";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { toggleTask } from "@/app/actions/toggleTask";
import { deleteTask } from "@/app/actions/deleteTask";


export default async function EditTaskPage({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;
  
    const taskId = Number(id);

  if (isNaN(taskId)) {
    return notFound();
  }

  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

    
  if (!task) return notFound();



    return (
        <div className="p-6 space-y-3">
            <h1 className="text-2xl font-bold"><strong>Task Details</strong></h1>
            <div className="flex gap-4 mb-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Overview
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
          <p><strong>Task:  </strong>{task.task}</p>
            
          <p><strong>Description:   </strong> {task.description}</p>
      
          <p><strong>Category:  </strong> {task.category}</p>
      
          <p>
            <strong>Due Date:   </strong>{" "}
            {task.due_date ? new Date(task.due_date).toDateString() : "No due date"}
            </p>
            
            <div className="flex gap-4 mt-2">
                <Link
                href={`/tasks/${task.id}/edit`}
                className="text-blue-600">
                Edit
                </Link>
                <form action={toggleTask}>
                    <input type="hidden" name="id" value={task.id} />
                    <input type="hidden" name="completed" value={String(task.completed)} />

                    <button className="text-green-600">
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                </form>

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