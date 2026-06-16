import Link from "next/link";

type Props = {
    title: string
    count: number
    tasks: {
      id: number
      task: string
    }[]
  }
  

  export default function DashboardBox({ title, count, tasks }: Props) {
    const displayedTasks = tasks.slice(0, 3);
    const hasMore = tasks.length > 3;
  
    return (
      <div>
        <h2>
          {title} ({count})
        </h2>
  
        <ul>
          {displayedTasks.map((t) => (
            <li key={t.id}>
              <Link
                href={`/tasks/${t.id}`}
                className="text-blue-600 hover:underline"
              >
                {t.task}
              </Link>
            </li>
          ))}
  
          {hasMore && (
            <li>
              <Link
                href="/tasks"
                className="text-blue-600 hover:underline"
              >
                ...
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }