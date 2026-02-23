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
        const { status, paymentStatus } = body

        const order = await prisma.order.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(paymentStatus && { paymentStatus })
            }
        })

        return NextResponse.json(order)
    } catch (error: any) {
        console.error('Order Update Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        })

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        return NextResponse.json(order)
    } catch (error: any) {
        console.error('Fetch Order Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch order' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.order.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Order deleted successfully' })
    } catch (error: any) {
        console.error('Order Deletion Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to delete order' }, { status: 500 })
    }
}
