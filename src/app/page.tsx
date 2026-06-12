// import { prisma } from "@/lib/prisma";
// import { getTodayRange } from "@/lib/date";
// import Image from "next/image";
// import TaskList from "@/app/tasks/components/tasks/TaskList"; //used for api


// /*

// This will be the main landing page that will show:
//   total tasks -done
//   completed -done
//   due today -done
//   overdue -

// */


// // prisma
// export default async function Dashboard() {
//   const { start, end } = getTodayRange();
//   const dueToday = await prisma.task.count({
//     where: {
//       due_date: {
//         gte: start,
//         lt: end,
//       },
//     },
//   });
  
//   const overdue = await prisma.task.count({
//     where: {
//       due_date: {
//         lt: start,
//       },
//       completed: false
//     }
//   });

//   const completed = await prisma.task.count({
//     where: { completed: true },
//   });
  
//   const totalTasks = await Promise.all([
//     prisma.task.count()
//   ]);

//   return (
//     <main className="p-6">
//     <h1 className="text-3xl font-bold mb-2">
//       My Tasks
//     </h1>

//     <div className="text-gray-500 mb-6">
//         Total tasks: {totalTasks}
//         <p>Completed: {completed}</p>
//         <p>Due Today: {dueToday}</p>
//         <p>Overdue: { overdue }</p>
//         </div>

//   </main>
// );
// }



import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const tasks = await prisma.task.findMany();

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  const today = new Date().toDateString();

  const dueToday = tasks.filter(t =>
    t.due_date &&
    new Date(t.due_date).toDateString() === today
  ).length;

  const overdue = tasks.filter(t =>
    t.due_date &&
    new Date(t.due_date) < new Date() &&
    !t.completed
  ).length;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Task Overview
      </h1>

      <div className="flex gap-4 mb-4">
        <Link
          href="/tasks"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Tasks
        </Link>

        <Link
          href="/tasks/new"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          New Task
        </Link>

        <Link
          href="/calendar"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Calendar
        </Link>
      </div>
      
      <div className="mb-6 space-y-1">
        <p>Total tasks: {total}</p>
        <p>Completed: {completed}</p>
        <p>Due Today: {dueToday}</p>
        <p>Overdue: {overdue}</p>
      </div>

      
    </main>
  );
}