import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { NODE_ENV, DATABASE_URL } from "@/env"

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

const pool = new Pool({
  connectionString: DATABASE_URL,
})

const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query", "error", "warn"],
  })

if (NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
