import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all orders (Admin) or user orders
export async function GET(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        let query = supabase.from('orders').select('*, order_items(*, products(*))')

        if (userId) {
            query = query.eq('user_id', userId)
        }

        const { data: orders, error } = await query.order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json(orders)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch orders' }, { status: 500 })
    }
}

// POST create a new order
export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    try {
        const body = await req.json()
        const { user_id, total_price, payment_method, shipping_address, items } = body

        if (!total_price || !shipping_address || !items || !items.length) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
        }

        // 1. Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                user_id,
                total_price,
                payment_method,
                shipping_address,
                status: 'pending',
                payment_status: 'unpaid'
            }])
            .select()
            .single()

        if (orderError) throw orderError

        // 2. Create order items
        const orderItems = items.map((item: any) => ({
            order_id: order.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        return NextResponse.json(order, { status: 201 })
    } catch (error: any) {
        console.error('Order Creation Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 })
    }
}
