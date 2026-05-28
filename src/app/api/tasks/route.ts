import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const tasks = await prisma.task.findMany();

    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
    const body = await request.json();

    const task = await prisma.task.create({
        data: {
            task: body.task,
            description: body.description,
            category: body.category as Category,
            due_date: body.due_date ? new Date(body.due_date) : null,
            user_id: 1,
        },
    });

    return NextResponse.json(task);
}