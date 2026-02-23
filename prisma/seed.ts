import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding started...')

    // 1. Create Categories
    const catMedicines = await prisma.category.upsert({
        where: { id: 'medicines' },
        update: {},
        create: {
            id: 'medicines',
            nameEn: 'Medicines',
            nameAr: 'الأدوية والعلاجات',
            slug: 'medicines'
        },
    })

    const catCosmetics = await prisma.category.upsert({
        where: { id: 'cosmetics' },
        update: {},
        create: {
            id: 'cosmetics',
            nameEn: 'Cosmetics',
            nameAr: 'مستحضرات التجميل',
            slug: 'cosmetics'
        },
    })

    const catBaby = await prisma.category.upsert({
        where: { id: 'baby-care' },
        update: {},
        create: {
            id: 'baby-care',
            nameEn: 'Baby Care',
            nameAr: 'العناية بالطفل',
            slug: 'baby-care'
        },
    })

    // 2. Create Products
    await prisma.product.upsert({
        where: { sku: 'P1001' },
        update: {},
        create: {
            sku: 'P1001',
            nameEn: 'Panadol Advance',
            nameAr: 'بنادول ادفانس',
            price: 25.0,
            description: 'Pain reliever and fever reducer.',
            stock: 100,
            categoryId: catMedicines.id,
            imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2060&auto=format&fit=crop',
        },
    })

    await prisma.product.upsert({
        where: { sku: 'P1002' },
        update: {},
        create: {
            sku: 'P1002',
            nameEn: 'Vichy Mineral 89',
            nameAr: 'فيشي مينيرال 89',
            price: 450.0,
            description: 'Hyaluronic acid booster for hydration.',
            stock: 50,
            categoryId: catCosmetics.id,
            imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=2076&auto=format&fit=crop',
        },
    })

    console.log('Seeding finished successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
