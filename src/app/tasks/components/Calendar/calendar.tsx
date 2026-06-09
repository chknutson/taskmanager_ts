"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import { info } from "console";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  date: string;
};

type props = {
  events: Event[];
};

export default function Calendar({ events }: props) {
  const router = useRouter();
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => {
        router.push(`/tasks/${info.event.id}/edit`)
      }}
    />
  );
}