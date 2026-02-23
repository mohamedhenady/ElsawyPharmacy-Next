"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Clock, ShoppingCart, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/store/useCartStore"
import { cn } from "@/lib/utils"

interface FlashSaleProduct {
    id: string
    nameAr: string
    price: number
    original_price: number
    imageUrl?: string
    discount: number
    stock: number
    sold: number
}

export function FlashSaleSection() {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })
    const [products, setProducts] = useState<FlashSaleProduct[]>([])
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        setProducts([
            { id: 'f1', nameAr: 'فيكس فاب روب', price: 75, original_price: 150, discount: 50, stock: 15, sold: 85, imageUrl: undefined },
            { id: 'f2', nameAr: 'لوريال سيروم', price: 199, original_price: 350, discount: 43, stock: 8, sold: 92, imageUrl: undefined },
            { id: 'f3', nameAr: 'بانadol_extra', price: 45, original_price: 85, discount: 47, stock: 23, sold: 77, imageUrl: undefined },
            { id: 'f4', nameAr: 'فيتو سي اقراص', price: 180, original_price: 280, discount: 36, stock: 5, sold: 95, imageUrl: undefined },
        ])

        const targetDate = new Date()
        targetDate.setHours(targetDate.getHours() + 8)

        const timer = setInterval(() => {
            const now = new Date()
            const diff = targetDate.getTime() - now.getTime()

            if (diff <= 0) {
                clearInterval(timer)
                return
            }

            setTimeLeft({
                hours: Math.floor(diff / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="py-12" dir="rtl">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 rounded-[3rem] p-8 text-white overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                                    <Flame className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-4xl font-black">عروض سريعة</h2>
                                    <p className="text-red-100 font-bold">خصومات محدودة الوقت!</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                                <Clock className="w-6 h-6" />
                                <div className="flex gap-2">
                                    {[
                                        { value: timeLeft.hours, label: 'س' },
                                        { value: timeLeft.minutes, label: 'د' },
                                        { value: timeLeft.seconds, label: 'ث' },
                                    ].map((item, i) => (
                                        <div key={i} className="text-center">
                                            <span className="text-3xl font-black block w-12 bg-white/20 rounded-lg">
                                                {String(item.value).padStart(2, '0')}
                                            </span>
                                            <span className="text-xs">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product, idx) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white rounded-2xl p-4 shadow-lg"
                                >
                                    <div className="relative mb-4">
                                        <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center overflow-hidden">
                                            {product.imageUrl ? (
                                                <img src={product.imageUrl} alt={product.nameAr} className="w-full h-full object-contain" />
                                            ) : (
                                                <span className="text-5xl">💊</span>
                                            )}
                                        </div>
                                        <Badge className="absolute top-2 left-2 bg-red-500 text-white font-black rounded-full px-3 py-1">
                                            <Zap className="w-3 h-3 ml-1" />
                                            {product.discount}%
                                        </Badge>
                                    </div>

                                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{product.nameAr}</h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xl font-black text-red-500">{product.price} ر.س</span>
                                        <span className="text-sm text-slate-400 line-through">{product.original_price} ر.س</span>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-slate-500">المتبقي: {product.stock}</span>
                                            <span className="text-slate-500">مباع: {product.sold}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${product.sold}%` }}
                                                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full rounded-xl font-bold bg-slate-900 hover:bg-slate-800"
                                        onClick={() => addItem(product as any)}
                                    >
                                        <ShoppingCart className="w-4 h-4 ml-2" />
                                        أضف للسلة
                                    </Button>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Button className="rounded-full px-10 h-14 text-lg font-bold bg-white text-red-600 hover:bg-red-50">
                                عرض所有 العروض
                                <ChevronRight className="w-5 h-5 mr-2" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
