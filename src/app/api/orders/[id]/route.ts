import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { status, payment_status } = body

        const { data: order, error } = await supabase
            .from('orders')
            .update({ status, payment_status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(order)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update order' }, { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params

        const { data: order, error } = await supabase
            .from('orders')
            .select('*, order_items(*, products(*))')
            .eq('id', id)
            .single()

        if (error) throw error

        return NextResponse.json(order)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch order' }, { status: 500 })
    }
}
