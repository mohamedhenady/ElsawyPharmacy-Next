"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface CompareStore {
    items: Product[]
    addItem: (product: Product) => void
    removeItem: (productId: string) => void
    clearItems: () => void
    isInCompare: (productId: string) => boolean
}

export const useCompareStore = create<CompareStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product) => {
                const items = get().items
                if (items.length < 4 && !items.find(p => p.id === product.id)) {
                    set({ items: [...items, product] })
                }
            },
            removeItem: (productId) => {
                set({ items: get().items.filter(p => p.id !== productId) })
            },
            clearItems: () => set({ items: [] }),
            isInCompare: (productId) => get().items.some(p => p.id === productId),
        }),
        { name: 'compare-storage' }
    )
)
