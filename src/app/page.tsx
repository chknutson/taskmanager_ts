import { prisma } from "@/lib/prisma";
import Image from "next/image";
import TaskList from "@/app/tasks/components/tasks/TaskList";


/*

This will be the main landing page that will show:
  total tasks
  completed
  due today
  overdue

*/


// prisma
export default async function Dashboard() {
  const totalTasks = await Promise.all([
    prisma.task.count()
  ]);

  return (
    <main className="p-6">
    <h1 className="text-3xl font-bold mb-2">
      My Tasks
    </h1>

    <p className="text-gray-500 mb-6">
      Total tasks: {totalTasks}
    </p>

  </main>
);
}

// api below
// export default async function Dashboard() {
//   const res = await fetch("http://localhost:3000/api/tasks", {
//     cache: "no-store",
//   });

//   const tasks = await res.json();

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <p>Total Tasks: {tasks.length}</p>

//       <TaskList tasks={tasks} />
//     </div>
//   );
// }






