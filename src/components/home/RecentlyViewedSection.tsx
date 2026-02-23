"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Eye, ShoppingCart, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"
import Link from "next/link"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RecentlyViewedStore {
    products: any[]
    addProduct: (product: any) => void
    clearProducts: () => void
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
    persist(
        (set, get) => ({
            products: [],
            addProduct: (product) => {
                const products = get().products.filter(p => p.id !== product.id)
                set({ products: [product, ...products].slice(0, 10) })
            },
            clearProducts: () => set({ products: [] }),
        }),
        { name: 'recently-viewed' }
    )
)

export function RecentlyViewedSection() {
    const [mounted, setMounted] = useState(false)
    const { products } = useRecentlyViewedStore()
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted || products.length === 0) return null

    return (
        <section className="py-12 bg-slate-50" dir="rtl">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-900">شوهد مؤخراً</h2>
                        <p className="text-slate-500">المنتجات التي شاهدتها</p>
                    </div>
                </motion.div>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {products.slice(0, 6).map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="shrink-0 w-64 bg-white rounded-[2rem] p-6 shadow-sm border hover:shadow-lg transition-all group"
                        >
                            <Link href={`/products/${product.id}`}>
                                <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name_ar} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">💊</span>
                                    )}
                                </div>
                            </Link>

                            <h3 className="font-bold text-lg mb-2 line-clamp-1">{product.name_ar}</h3>
                            <p className="text-2xl font-black text-secondary mb-4">{product.price} ر.س</p>

                            <div className="flex gap-2">
                                <Button
                                    className="flex-1 rounded-2xl font-bold"
                                    size="sm"
                                    onClick={() => addItem(product)}
                                >
                                    <ShoppingCart className="w-4 h-4 ml-1" />
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-2xl px-3">
                                    <Heart className="w-4 h-4 text-red-400" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
