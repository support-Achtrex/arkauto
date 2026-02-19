import { PrismaClient } from '@prisma/client'

const prismaWithoutGlobal = new PrismaClient()

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || prismaWithoutGlobal

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
