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
    <div className="mb-6 bg-slate-400 rounded-xl border shadow-sm p-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}

// import TaskCard from "./TaskCard";

// type Task = {
//   id: number;
//   task: string;
//   description: string;
//   completed: boolean;
//   due_date: Date | null;
// };

// type TaskListProps = {
//   tasks: Task[];
// };

// export default function TaskList({ tasks }: TaskListProps) {
//   return (
//     <div>
//       {tasks.map((task) => (
//         <TaskCard
//           key={task.id}
//           task={task}
//         />
//       ))}
//     </div>
//   );
// }