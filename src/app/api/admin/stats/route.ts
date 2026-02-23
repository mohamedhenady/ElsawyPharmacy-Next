import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const [totalRevenue, totalOrders, activeProducts, totalCustomers] = await Promise.all([
            prisma.order.aggregate({
                where: { paymentStatus: 'paid' },
                _sum: { totalPrice: true }
            }),
            prisma.order.count(),
            prisma.product.count({
                where: { isActive: true }
            }),
            prisma.profile.count({
                where: { role: 'customer' }
            })
        ])

        return NextResponse.json({
            revenue: totalRevenue._sum.totalPrice || 0,
            orders: totalOrders,
            products: activeProducts,
            customers: totalCustomers
        })
    } catch (error: any) {
        console.error('Fetch Stats Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch stats' }, { status: 500 })
    }
}
