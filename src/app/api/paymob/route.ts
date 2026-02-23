import { NextResponse } from 'next/server'
import { getPaymobToken, registerPaymobOrder, getPaymentKey } from '@/lib/paymob'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { amount, items, billing_data } = body

        if (!amount || !items) {
            return NextResponse.json({ error: 'Missing amount or items' }, { status: 400 })
        }

        const amountCents = Math.round(amount * 100)

        // 1. Get Authentication Token
        const token = await getPaymobToken()

        // 2. Register Order
        const paymobOrderId = await registerPaymobOrder(token, amountCents, items)

        // 3. Get Payment Key
        const paymentToken = await getPaymentKey(token, paymobOrderId, amountCents, billing_data)

        return NextResponse.json({
            payment_token: paymentToken,
            iframe_id: process.env.PAYMOB_IFRAME_ID
        })
    } catch (error: any) {
        console.error('Paymob Initiation Error:', error)
        return NextResponse.json({ error: error.message || 'Payment initiation failed' }, { status: 500 })
    }
}
