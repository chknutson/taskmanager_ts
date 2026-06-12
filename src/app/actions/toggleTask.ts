"use server"

import { prisma } from "@/lib/prisma";

export async function toggleTask(id: number, completed: boolean) {
    if (!id) throw new Error("Missing Task ID");

    await prisma.task.update({
        where: { id },
        data: {
            completed: !completed,
        },
    });
}