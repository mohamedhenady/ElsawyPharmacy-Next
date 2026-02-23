import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { type, obj } = body

        // Paymob sends "TRANSACTION" type for payment completions
        if (type !== 'TRANSACTION') {
            return NextResponse.json({ message: 'Ignored' })
        }

        const success = obj.success
        const paymobOrderId = obj.order.id.toString()
        const pending = obj.pending

        // Optional: Verify HMAC if PAYMOB_HMAC_SECRET is configured
        // const hmac = req.headers.get('hmac')
        // ... HMAC verification logic ...

        if (success && !pending) {
            // Update order status to PAID
            await prisma.order.updateMany({
                where: { paymobOrderId },
                data: {
                    paymentStatus: 'paid',
                    status: 'PROCESSING' // Or whatever status comes after pending
                }
            })
        } else if (!success && !pending) {
            // Update order status to FAILED
            await prisma.order.updateMany({
                where: { paymobOrderId },
                data: {
                    paymentStatus: 'failed'
                }
            })
        }

        return NextResponse.json({ message: 'OK' })
    } catch (error: any) {
        console.error('Paymob Callback Error:', error)
        return NextResponse.json({ error: error.message || 'Callback failed' }, { status: 500 })
    }
}
