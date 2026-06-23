import Link from "next/link";
import { categoryButtonColors } from "@/lib/categoryColors";  

type Props = {
  category?: string;
  due?: string;
};

export default function TaskFilters({ category, due }: Props) {

  const createFilterUrl = (key: string, value: string) => {
    const params = new URLSearchParams();

    if (category && key !== "category") {
      params.set("category", category);
    }

    if (due && key !== "due") {
      params.set("due", due);
    }

    params.set(key, value);

    return `/tasks?${params.toString()}`;
  };


  const categories = Object.entries(categoryButtonColors).map(
    ([name, color]) => ({
      name,
      color,
    })
  );

  const statuses = [
    {
      name: "Overdue",
      value: "overdue",
      color: "bg-red-600",
    },
    {
      name: "Due Today",
      value: "dueTodayTasks",
      color: "bg-orange-600",
    },
    {
      name: "Upcoming",
      value: "upcoming",
      color: "bg-blue-600",
    },
    {
      name: "Completed",
      value: "completed",
      color: "bg-green-600",
    },
  ];


  return (
    <div className="mb-6 bg-slate-400 rounded-xl border shadow-sm p-4">
      <div className="mb-6">

      {/* Categories */}
      <div className="mb-4">
          <h3 className="font-semibold mb-2">
            Categories
          </h3>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/tasks"
              className={`px-3 py-1 rounded text-white ${
                !category ? "bg-gray-800" : "bg-gray-600"
              }`}
            >
              All
            </Link>


            {categories.map((categoryItem) => (
              <Link
                key={categoryItem.name}
                href={createFilterUrl(
                  "category",
                  categoryItem.name
                )}
                className={`px-3 py-1 rounded text-white ${
                  category === categoryItem.name
                    ? `${categoryItem.color} ring-2 ring-black`
                    : categoryItem.color
                }`}
              >
                {categoryItem.name}
              </Link>
            ))}

          </div>
        </div>



        {/* Status */}
        <div>

          <h3 className="font-semibold mb-2">
            Status
          </h3>


          <div className="flex flex-wrap gap-3">
              
          <Link
              href={category ? `/tasks?category=${category}` : "/tasks"}
              className={`px-3 py-1 rounded text-white ${
                  !due ? "bg-gray-800" : "bg-gray-600"
                }`}
              >
              All
              </Link>

            {statuses.map((status) => (
              <Link
                key={status.value}
                href={createFilterUrl(
                  "due",
                  status.value
                )}
                className={`px-3 py-1 rounded text-white ${
                  due === status.value
                    ? `${status.color} ring-2 ring-black`
                    : status.color
                }`}
              >
                {status.name}
              </Link>
            ))}
          </div>

          {(category || due) && (
          <div className="mt-4">
              <Link
              href="/tasks"
              className="border border-gray-800 text-gray-800 px-3 py-1 rounded hover:bg-gray-800 hover:text-white"
              >
              Clear Filters
              </Link>
          </div>
          )}

        </div>

      </div>
    </div>
  );
  
}