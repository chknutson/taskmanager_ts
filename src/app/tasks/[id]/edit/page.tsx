import TaskForm from "@/app/tasks/components/tasks/TaskForm";
import { updateTask } from "@/app/actions/updateTask";
import { prisma } from "@/lib/prisma";


export default async function EditTaskPage({
    params,
  }: {
    params: { id: string };
  }) {
    const { id } = params;
  
    console.log("PARAMS:", id);
  
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
  
    if (!task) return <div>Task not found</div>;
  
    const formattedTask = {
      id: task.id,
      title: task.task,
      description: task.description,
      category: task.category,
      dueDate: task.due_date,
    };
  
    return (
        <TaskForm
            task={formattedTask}
            action={updateTask}
        />
    );
  }