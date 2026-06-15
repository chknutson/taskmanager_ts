import Link from "next/link";

type Props = {
    title: string
    count: number
    tasks: {
      id: number
      task: string
    }[]
  }
  
  // export default function DashboardBox({ title, count, tasks }: Props) {
  //   return (
  //     <div>
  //       <h2>
  //         {title} ({count})
  //       </h2>
  
  //       <ul>
  //         {tasks.map((t) => (
  //           <li key={t.id}>{t.task}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
// }


  export default function DashboardBox({ title, count, tasks }: Props) {
    return (
      <div>
        <h2>
          {title} ({count})
        </h2>
  
        <ul>
          {tasks.map((t) => (          
            <li key={t.id}>
              <Link
                href={`/tasks/${t.id}`}
                className="text-blue-600 hover:underline"
              >
                {t.task}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

