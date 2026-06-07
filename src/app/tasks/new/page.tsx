import TaskForm from "@/app/tasks/components/tasks/TaskForm";

export default function NewTaskPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        New Task
      </h1>

      <TaskForm />
    </main>
  );
}