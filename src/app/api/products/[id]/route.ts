import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                subcategory: true
            }
        })

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        return NextResponse.json(product)
    } catch (error: any) {
        console.error('Fetch Product Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch product' }, { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()

        const product = await prisma.product.update({
            where: { id },
            data: body
        })

        return NextResponse.json(product)
    } catch (error: any) {
        console.error('Product Update Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.product.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        console.error('Product Deletion Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 })
    }
}
