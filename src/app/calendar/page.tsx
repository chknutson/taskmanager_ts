import Calendar from "@/app/tasks/components/Calendar/calendar";

export default function CalendarPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Calendar
      </h1>

      <Calendar />
    </main>
  );
}