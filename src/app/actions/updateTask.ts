// "use server";

// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
// import { Category } from "@/generated/prisma/enums";

// export async function updateTask(formData: FormData) {
//   const id = Number(formData.get("id"));

//   const task = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   const category = formData.get("category") as Category;
//   const due_date = formData.get("dueDate") as string;

//   console.log("UPDATING ID =", id);

//   await prisma.task.update({
//     where: { id },
//     data: {
//       task,
//       description,
//       category,
//       due_date: due_date ? new Date(due_date) : null,
//     },
//   });

//   redirect("/tasks");
// } 

// "use server";

// import { prisma } from "@/lib/prisma";
// import { redirect } from "next/navigation";
// import { Category } from "@/generated/prisma/enums";

// export async function updateTask(formData: FormData) {
//   const task = formData.get("title") as string;
//   const description = formData.get("description") as string;
//   // const category = formData.get("Category") as Category;
//   // const category = formData.get("category") as Category;
//   const category = formData.get("category") as Category;
//   const due_date = formData.get("dueDate") as string;

//   console.log("category =", category);
//   console.log("all form data =", Object.fromEntries(formData.entries()));
//   await prisma.task.update({
//     where: { id },
//     data: {
//       task,
//       description,
//       category,
//       due_date: due_date ? new Date(due_date) : null,
//     },
//   });
//   redirect("/tasks");
// }



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