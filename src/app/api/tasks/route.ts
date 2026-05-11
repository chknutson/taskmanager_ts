import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
});

// const users = await prisma.user.findMany();  Template to use use in function

function GET(request: NextRequest): NextResponse<string> {
    
    const tasks = prisma.task.findMany()

    return NextResponse.json (body: "return value")
}
