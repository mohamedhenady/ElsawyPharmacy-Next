import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all categories
export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            where: {
                isActive: true
            },
            include: {
                subcategories: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error('Fetch Categories Error:', error)
        const message = error instanceof Error ? error.message : 'Failed to fetch categories'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

// POST create a new category
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { nameEn, nameAr, slug, parentId } = body

        if (!nameEn || !nameAr || !slug) {
            return NextResponse.json({ error: 'Name (EN), Name (AR), and Slug are required' }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: {
                nameEn,
                nameAr,
                slug,
                parentId
            }
        })

        return NextResponse.json(category, { status: 201 })
    } catch (error) {
        console.error('Category Creation Error:', error)
        const message = error instanceof Error ? error.message : 'Failed to create category'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
