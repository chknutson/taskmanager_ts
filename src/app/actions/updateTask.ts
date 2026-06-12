"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Category } from "@/generated/prisma/enums";

export async function updateTask(formData: FormData) {
  const id = Number(formData.get("id"));

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as Category;
  const dueDate = formData.get("dueDate") as string;

  if (!id) throw new Error("Missing task id");

  await prisma.task.update({
    where: { id },
    data: {
      task: title,
      description,
      category,
      due_date: dueDate ? new Date(dueDate) : null,
    },
  });

  redirect("/tasks");
}