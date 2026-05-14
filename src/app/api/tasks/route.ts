import { PrismaPg } from "@prisma/adapter-pg";
import { Category, PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

// const users = await prisma.user.findMany();  Template to use use in function

export async function GET(request: NextRequest) { //}: Promise<NextResponse<string>> {
    
    const tasks = await prisma.task.findMany({
    })

    return NextResponse.json (tasks)
}

export async function POST(request: NextRequest) { //: NextResponse<string> {
    const body = await request.json();

    const task = await prisma.task.create({
        data: {
            task: body.task,
            description: body.description,
            category: body.category as Category,
            due_date: body.due_date ? new Date(body.due_date) : null,
            user_id: 1, // or omit entirely
        },
    })

    return NextResponse.json(task)
}

