import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all orders (Admin) or user orders
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        const orders = await prisma.order.findMany({
            where: {
                ...(userId && { userId })
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(orders)
    } catch (error: any) {
        console.error('Fetch Orders Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch orders' }, { status: 500 })
    }
}

// POST create a new order
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { userId, totalPrice, paymentMethod, shippingAddress, items } = body

        if (!totalPrice || !shippingAddress || !items || !items.length) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
        }

        // Use a transaction to ensure both order and items are created
        const order = await prisma.order.create({
            data: {
                userId,
                totalPrice: parseFloat(totalPrice),
                paymentMethod,
                shippingAddress,
                status: 'PENDING',
                paymentStatus: 'pending',
                items: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: parseInt(item.quantity),
                        price: parseFloat(item.price)
                    }))
                }
            },
            include: {
                items: true
            }
        })

        return NextResponse.json(order, { status: 201 })
    } catch (error: any) {
        console.error('Order Creation Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 })
    }
}
