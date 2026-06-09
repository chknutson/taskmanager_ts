"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteTask (formData : FormData) {
    const id = Number(formData.get("id"));

    if (!id) throw new Error("Missing task id");

    await prisma.task.delete({
        where: { id },
    });

    redirect("/tasks");
}