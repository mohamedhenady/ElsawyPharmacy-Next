export interface Product {
    id: string
    name_ar: string
    name_en?: string
    description_ar?: string
    description_en?: string
    price: number
    image_url?: string
    category_id?: string
    is_featured?: boolean
    stock?: number
    categories?: {
        name_ar: string
    }
}
