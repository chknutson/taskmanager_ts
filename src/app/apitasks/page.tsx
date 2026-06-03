import TaskList from "@/app/tasks/components/tasks/TaskList";

export default async function TasksPage() {
  const response = await fetch(
    "http://localhost:3000/api/tasks",
    {
      cache: "no-store",
    }
  );

  const tasks = await response.json();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Tasks
      </h1>

      <TaskList tasks={tasks} />
    </main>
  );
}