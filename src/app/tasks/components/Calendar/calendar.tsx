"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  date: string;
  backgroundColor?: string;
  borderColor?: string;
};

type Props = {
  events: Event[];
};

export default function Calendar({ events }: Props) {
  const router = useRouter();

  return (
    <div className="mb-6 bg-slate-400 rounded-xl border shadow-sm p-4">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          router.push(`/tasks/${info.event.id}`);
        }}
        eventContent={(eventInfo) => (
    <div
      className="rounded-full px-3 py-1 text-xs font-medium text-white shadow-sm"
      style={{
        backgroundColor:
        eventInfo.event.backgroundColor || "#64748b", // slate-500 fallback
      }}
    >
      {eventInfo.event.title}
    </div>
  )}
      />
    </div>
  );
}