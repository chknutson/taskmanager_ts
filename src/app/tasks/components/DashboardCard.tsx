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
  color?: "blue" | "red" | "green" | "purple";
};

export default function DashboardBox({ title, count, href, tasks, color }: Props) {
  const displayedTasks = tasks.slice(0, 3);
  const hasMore = tasks.length > 3;
  const shadowColors = {
    blue: "hover:shadow-[0_60px_40px_rgba(59,130,246,0.25)]",
    red: "hover:shadow-[0_60px_40px_rgba(239,68,68,0.25)]",
    green: "hover:shadow-[0_60px_40px_rgba(34,197,94,0.25)]",
    purple: "hover:shadow-[0_60px_40px_rgba(168,85,247,0.25)]",
  };

  return (
    // <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
    // <div className="border rounded-xl p-5 shadow-md bg-white">
    <div
      className={`
        bg-slate-400
        rounded-xl
        border
        shadow-4xl
        hover:translate-y-1
        transition-all
        duration-300
        p-4
        border border-gray-200
        ring-10 ring-black/5
        ${shadowColors[color ?? "blue"]}
      `}
    >
    
      <h2 className="text-lg font-bold text-black md-6">
        <Link href={href} className="hover:underline">
          {title} - ({count})
        </Link>
      </h2>
        
      <ul className="space-y-2">
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