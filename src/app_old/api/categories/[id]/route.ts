import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { nameEn, nameAr, slug, isActive } = body

        const category = await prisma.category.update({
            where: { id },
            data: {
                ...(nameEn !== undefined && { nameEn }),
                ...(nameAr !== undefined && { nameAr }),
                ...(slug !== undefined && { slug }),
                ...(isActive !== undefined && { isActive })
            }
        })

        return NextResponse.json(category)
    } catch (error: any) {
        console.error('Category Update Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to update category' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Soft delete by setting isActive to false
        const category = await prisma.category.update({
            where: { id },
            data: { isActive: false }
        })

        return NextResponse.json({ success: true, category })
    } catch (error: any) {
        console.error('Category Deletion Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                subcategories: true
            }
        })

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 })
        }

        return NextResponse.json(category)
    } catch (error: any) {
        console.error('Fetch Category Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch category' }, { status: 500 })
    }
}
