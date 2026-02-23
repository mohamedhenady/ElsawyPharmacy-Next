import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { name, name_ar, slug, is_active } = body

        const { data: category, error } = await supabase
            .from('categories')
            .update({ name, name_ar, slug, is_active })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json(category)
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update category' }, { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params

        // Soft delete by setting is_active to false
        const { error } = await supabase
            .from('categories')
            .update({ is_active: false })
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 })
    }
}
