// import Link from "next/link";

// type Props = {
//     title: string
//     count: number
//     tasks: {
//       id: number
//       task: string
//     }[]
//   }
  

//   export default function DashboardBox({ title, count, tasks }: Props) {
//     const displayedTasks = tasks.slice(0, 3);
//     const hasMore = tasks.length > 3;
  
//     return (
//       <div>
//         <h2>
//           {title} ({count})
//         </h2>
  
//         <ul>
//           {displayedTasks.map((t) => (
//             <li key={t.id}>
//               <Link
//                 href={`/tasks/${t.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 {t.task}
//               </Link>
//             </li>
//           ))}
  
//           {hasMore && (
//             <li>
//               <Link
//                 href="/tasks"
//                 className="text-blue-600 hover:underline"
//               >
//                 ...
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     );
//   }




import Link from "next/link";

type Props = {
  title: string;
  count: number;
  href: string;
  tasks: {
    id: number;
    task: string;
  }[];
};

export default function DashboardBox({ title, count, href, tasks }: Props) {
  const displayedTasks = tasks.slice(0, 3);
  const hasMore = tasks.length > 3;

  return (
    // <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="border rounded-xl p-5 shadow-md bg-white">
      <h2>
        <Link href={href} className="hover:underline">
          {title} ({count})
        </Link>
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
              href={href}
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