import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
        return null as any;
    }

    return createBrowserClient(
        supabaseUrl,
        supabaseKey!
    )
}
