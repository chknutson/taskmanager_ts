import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const tasks = await prisma.task.findMany();
  console.log(tasks.map(t => ({
    task: t.task,
    due_date: t.due_date?.toISOString()
  })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());