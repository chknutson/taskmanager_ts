import TaskCard from "./TaskCard";
import { Category } from "@/generated/prisma/enums";

type Task = {
  id: number;
  task: string;
  description: string;
  completed: boolean;
  category: Category;
  due_date: Date | null;
};

type TaskListProps = {
  tasks: Task[];
};


export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}
