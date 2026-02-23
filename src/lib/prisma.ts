import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = new Proxy({} as PrismaClient, {
    get(target, prop) {
        if (typeof prop === 'symbol' || prop === '$$typeof') return (target as any)[prop];

        if (!globalThis.prisma) {
            globalThis.prisma = prismaClientSingleton()
        }
        return (globalThis.prisma as any)[prop]
    }
})

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = globalThis.prisma ?? undefined
