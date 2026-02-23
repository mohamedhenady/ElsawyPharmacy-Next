import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all products with filtering
export async function GET(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    try {
        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get('categoryId')
        const isFeatured = searchParams.get('isFeatured')

        let query = supabase.from('products').select('*, categories(*)')

        if (categoryId) {
            query = query.eq('category_id', categoryId)
        }
        if (isFeatured === 'true') {
            query = query.eq('is_featured', true)
        }

        const { data: products, error } = await query.order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json(products)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch products' }, { status: 500 })
    }
}

// POST create a new product
export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }
    try {
        const body = await req.json()
        const { name, name_ar, description, description_ar, price, stock, category_id, image_url, is_featured } = body

        if (!name || !name_ar || !price || !category_id) {
            return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
        }

        const { data: product, error } = await supabase
            .from('products')
            .insert([{
                name,
                name_ar,
                description,
                description_ar,
                price,
                stock: stock || 0,
                category_id,
                image_url,
                is_featured: is_featured || false
            }])
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(product, { status: 201 })
    } catch (error: any) {
        console.error('Product Creation Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 })
    }
}
