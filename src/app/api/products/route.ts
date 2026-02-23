import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all products with filtering
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId')
        const isFeatured = searchParams.get('isFeatured')
        const search = searchParams.get('search')

        const products = await prisma.product.findMany({
            where: {
                isActive: true,
                ...(categoryId && { categoryId }),
                ...(isFeatured === 'true' && { isFeatured: true }),
                ...(search && {
                    OR: [
                        { nameEn: { contains: search, mode: 'insensitive' } },
                        { nameAr: { contains: search, mode: 'insensitive' } },
                        { sku: { contains: search, mode: 'insensitive' } }
                    ]
                })
            },
            include: {
                category: true,
                subcategory: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(products)
    } catch (error: any) {
        console.error('Fetch Products Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 })
    }
}

// POST create a new product
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {
            sku,
            nameEn,
            nameAr,
            description,
            price,
            discountPrice,
            stock,
            categoryId,
            subcategoryId,
            imageUrl,
            isFeatured
        } = body

        if (!sku || !nameEn || !nameAr || !price || !categoryId) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
        }

        const product = await prisma.product.create({
            data: {
                sku,
                nameEn,
                nameAr,
                description,
                price: parseFloat(price),
                discountPrice: discountPrice ? parseFloat(discountPrice) : null,
                stock: parseInt(stock) || 0,
                categoryId,
                subcategoryId,
                imageUrl,
                isFeatured: isFeatured || false
            }
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error: any) {
        console.error('Product Creation Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 })
    }
}
