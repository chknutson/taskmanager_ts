import TaskList from "@/components/tasks/TaskList"

export default async function TasksPage() {
  // later you'll fetch from your API or Prisma here

  const tasks = [
    {
      id: 1,
      task: "Learn Next.js",
      completed: false,
    },
  ]

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      <TaskList tasks={tasks} />
    </main>
  )
}