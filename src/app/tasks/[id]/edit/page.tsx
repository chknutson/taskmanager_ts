import TaskForm from "@/app/tasks/components/tasks/TaskForm";
import { updateTask } from "@/app/actions/updateTask";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


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

  console.log("LOOKING FOR TASK ID:", taskId);
  console.log("TASK RESULT:", task);
    
  if (!task) return notFound();

  const formattedTask = {
    id: task.id,
    title: task.task,
    description: task.description,
    category: task.category,
    dueDate: task.due_date,
  };

  return <TaskForm task={formattedTask} action={updateTask} />;
}
