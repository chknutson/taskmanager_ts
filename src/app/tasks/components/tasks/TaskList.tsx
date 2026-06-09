import { deleteTask } from "@/app/actions/deleteTask"
import { updateTask } from "@/app/actions/updateTask"
import Link from "next/link"


type Task = {
    id: number
    task: string
    completed: boolean
  }
  
  type TaskListProps = {
    tasks: Task[]
  }
  
  export default function TaskList({ tasks }: TaskListProps) {
    return (
      <div>
        {tasks.map((t) => (
          // <div key={t.id}>
          //   {t.task}
          // </div>
          <div key={t.id} className="flex gap-4">
            <span>{t.task}</span>

            <Link
              href={`/tasks/${t.id}/edit`}
              className="text-blue-600"
            >
              Edit
            </Link>

            <form action={deleteTask}>
              <input
                type="hidden"
                name="id"
                value={t.id}
              />

              <button
                type="submit"
                className="text-red-600"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    )
  }