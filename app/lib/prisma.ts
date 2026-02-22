import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['error', 'warn'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

let prismaClient: ReturnType<typeof prismaClientSingleton> | undefined;

export const getPrisma = () => {
  if (typeof window !== 'undefined') return null as any;

  if (process.env.NODE_ENV === 'production') {
    if (!prismaClient) prismaClient = prismaClientSingleton();
    return prismaClient;
  } else {
    if (!globalThis.prisma) {
      globalThis.prisma = prismaClientSingleton();
    }
    return globalThis.prisma;
  }
}

export default getPrisma();
