import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params

        const { data: product, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('id', id)
            .single()

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ error: 'Product not found' }, { status: 404 })
            }
            throw error
        }

        return NextResponse.json(product)
    } catch (error: any) {
        console.error('Fetch Product Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch product' }, { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params
        const body = await req.json()

        const { data: product, error } = await supabase
            .from('products')
            .update(body)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(product)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update product' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete product' }, { status: 500 })
    }
}
