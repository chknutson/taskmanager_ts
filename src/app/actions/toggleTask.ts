// "use server"

// import { prisma } from "@/lib/prisma";

// export async function toggleTask(id: number, completed: boolean) {
//     if (!id) throw new Error("Missing Task ID");

//     await prisma.task.update({
//         where: { id },
//         data: {
//             completed: !completed,
//         },
//     });
// }

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleTask(formData: FormData) {
  const id = Number(formData.get("id"));
  const completed = formData.get("completed") === "true";

  if (!id) throw new Error("Missing Task ID");

  await prisma.task.update({
    where: { id },
    data: {
      completed: !completed,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/");
}