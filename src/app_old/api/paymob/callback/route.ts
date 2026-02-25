import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

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

        // HMAC verification
        const hmac = req.headers.get('hmac')
        const hmacSecret = process.env.PAYMOB_HMAC_SECRET

        if (hmacSecret) {
            const {
                amount_cents,
                created_at,
                currency,
                error_occured,
                has_parent_transaction,
                id: transaction_id,
                integration_id,
                is_3d_secure,
                is_auth,
                is_capture,
                is_refunded,
                is_standalone_payment,
                is_voided,
                order: { id: order_id },
                owner,
                pending: is_pending,
                source_data: {
                    pan: source_pan,
                    sub_type: source_sub_type,
                    type: source_type
                },
                success: is_success
            } = obj;

            const concatenatedString = 
                amount_cents.toString() +
                created_at +
                currency +
                error_occured.toString() +
                has_parent_transaction.toString() +
                transaction_id.toString() +
                integration_id.toString() +
                is_3d_secure.toString() +
                is_auth.toString() +
                is_capture.toString() +
                is_refunded.toString() +
                is_standalone_payment.toString() +
                is_voided.toString() +
                order_id.toString() +
                owner.toString() +
                is_pending.toString() +
                source_pan +
                source_sub_type +
                source_type +
                is_success.toString();

            const calculatedHmac = crypto
                .createHmac('sha512', hmacSecret)
                .update(concatenatedString)
                .digest('hex');

            if (calculatedHmac !== hmac) {
                console.error('Invalid HMAC signature');
                return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
            }
        }

        if (success && !pending) {
            // Update order status to PROCESSING (meaning paid and being prepared)
            await prisma.order.updateMany({
                where: { paymobOrderId },
                data: {
                    paymentStatus: 'paid',
                    status: 'PROCESSING'
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
