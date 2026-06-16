import Link from "next/link";

export default function TaskFilters() {
  return (
    <div className="flex gap-3 mb-6">

      <Link
        href="/tasks?category=Family"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Family
      </Link>

      <Link
        href="/tasks?category=Fitness"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Fitness
      </Link>    
          
      <Link
        href="/tasks?category=Home"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Home
      </Link>

      <Link
        href="/tasks?category=Personal"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Personal
      </Link>

      <Link
        href="/tasks?category=School"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        School
      </Link>

      <Link
        href="/tasks?category=Work"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Work
      </Link>   
           
      <Link
        href="/tasks"
        className="bg-gray-600 text-white px-3 py-1 rounded"
      >
        All
      </Link>

      <Link
        href="/tasks?due=overdue"
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Overdue
      </Link>
          
      <Link
        href="/tasks?due=dueTodayTasks"
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Due Today
      </Link>
    
      <Link
        href="/tasks?due=upcoming"
        className="bg-red-600 text-white px-3 py-1 rounded"
      >
        Upcoming
      </Link>
        
          
      <Link
        href="/tasks?due=completed"
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Completed
      </Link>





    </div>
  );
}