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
          <div key={t.id}>
            {t.task}
          </div>
        ))}
      </div>
    )
  }