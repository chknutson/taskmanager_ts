import { prisma } from "@/lib/prisma";
import { getTodayRange } from "@/lib/date";
import Image from "next/image";
import TaskList from "@/app/tasks/components/tasks/TaskList"; //used for api


/*

This will be the main landing page that will show:
  total tasks -done
  completed -done
  due today -done
  overdue -

*/


// prisma
export default async function Dashboard() {
  const { start, end } = getTodayRange();
  const dueToday = await prisma.task.count({
    where: {
      due_date: {
        gte: start,
        lt: end,
      },
    },
  });
  
  const overdue = await prisma.task.count({
    where: {
      due_date: {
        lt: start,
      },
      completed: false
    }
  });

  const completed = await prisma.task.count({
    where: { completed: true },
  });
  
  const totalTasks = await Promise.all([
    prisma.task.count()
  ]);

  return (
    <main className="p-6">
    <h1 className="text-3xl font-bold mb-2">
      My Tasks
    </h1>

    <div className="text-gray-500 mb-6">
        Total tasks: {totalTasks}
        <p>Completed: {completed}</p>
        <p>Due Today: {dueToday}</p>
        <p>Overdue: { overdue }</p>
        </div>

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






