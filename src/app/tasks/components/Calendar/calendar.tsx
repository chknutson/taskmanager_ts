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
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventClick={(info) => {
        router.push(`/tasks/${info.event.id}`);
      }}
    />
  );
}