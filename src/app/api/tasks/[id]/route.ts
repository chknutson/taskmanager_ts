import { PrismaPg } from "@prisma/adapter-pg";
import { Category, PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
  });

  export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
  
    return NextResponse.json(task);
}
  
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();
  
    const task = await prisma.task.update({
        where: { id: Number(id) },
        data: {
            ...(body.task !== undefined && { task: body.task }),
            ...(body.description !== undefined && { description: body.description }),
            ...(body.category !== undefined && { category: body.category as Category }),
            ...(body.due_date !== undefined && { due_date: body.due_date ? new Date(body.due_date) : null, }),
        },
    });
    return NextResponse.json(task);

}



export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const task = await prisma.task.delete({
        where: {
          id : Number(id),
        },
      });

    return NextResponse.json(task);
}