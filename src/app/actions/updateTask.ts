"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Category } from "@/generated/prisma/enums";

export async function updateTask(formData: FormData) {
  const task = formData.get("title") as string;
  const description = formData.get("description") as string;
  // const category = formData.get("Category") as Category;
  // const category = formData.get("category") as Category;
  const category = formData.get("category") as Category;
  const due_date = formData.get("dueDate") as string;

  console.log("category =", category);
  console.log("all form data =", Object.fromEntries(formData.entries()));
  await prisma.task.create({
    data: {
      task,
      description,
      category: category as Category,
      due_date: due_date ? new Date(due_date) : null,
      completed: false,
    },
  });

  redirect("/tasks");
}