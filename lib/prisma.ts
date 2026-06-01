import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const dbPath = (process.env.DATABASE_URL ?? 'file:./dev.db').replace(/^file:/, '')

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: dbPath }) })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
