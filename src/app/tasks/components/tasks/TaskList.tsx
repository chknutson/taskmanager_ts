import TaskCard from "./TaskCard";

type Task = {
  id: number;
  task: string;
  description: string;
  completed: boolean;
  due_date: Date | null;
};

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}