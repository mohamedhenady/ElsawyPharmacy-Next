import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET all categories
export async function GET() {
    try {
        const { data: categories, error } = await supabase
            .from('categories')
            .select('*')
            .eq('is_active', true)

        if (error) throw error

        return NextResponse.json(categories)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to fetch categories' }, { status: 500 })
    }
}

// POST create a new category
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, name_ar, slug } = body

        if (!name || !name_ar || !slug) {
            return NextResponse.json({ error: 'Name, Arabic Name, and Slug are required' }, { status: 400 })
        }

        const { data: category, error } = await supabase
            .from('categories')
            .insert([{ name, name_ar, slug }])
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(category, { status: 201 })
    } catch (error: any) {
        console.error('Category Creation Error:', error)
        return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 })
    }
}
