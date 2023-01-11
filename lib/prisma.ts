import { PrismaClient } from '@prisma/client';

declare let global: { prisma?: PrismaClient };
if (!global.prisma) {
  global.prisma = new PrismaClient();
}

export const prisma = global.prisma;
