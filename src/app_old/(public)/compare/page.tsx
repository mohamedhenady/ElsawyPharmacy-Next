"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, ShoppingCart, Check, Star, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCompareStore } from "@/store/useCompareStore"
import { useCartStore } from "@/store/useCartStore"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function ComparePage() {
    const { items, removeItem, clearItems } = useCompareStore()
    const addItem = useCartStore((state) => state.addItem)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center" dir="rtl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center space-y-6 p-12"
                >
                    <div className="text-8xl mb-4">⚖️</div>
                    <h1 className="text-4xl font-black text-slate-900">لا توجد منتجات للمقارنة</h1>
                    <p className="text-slate-500 text-xl max-w-md mx-auto">
                        أضف منتجات للمقارنة من صفحة المنتجات
                    </p>
                    <Link href="/products">
                        <Button className="rounded-full px-10 h-14 text-xl font-bold mt-4">
                            تصفح المنتجات
                            <ArrowRight className="w-5 h-5 mr-2" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        )
    }

    const comparisonFields = [
        { label: 'الصورة', key: 'image' },
        { label: 'السعر', key: 'price' },
        { label: 'التقييم', key: 'rating' },
        { label: 'التوفر', key: 'stock' },
        { label: 'الوصف', key: 'description' },
        { label: 'الفئة', key: 'category' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 pb-32" dir="rtl">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-black text-slate-900">مقارنة المنتجات</h1>
                        <p className="text-slate-500 mt-1">قارن بين {items.length} منتجات</p>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:bg-red-50 rounded-full font-bold"
                        onClick={clearItems}
                    >
                        مسح الكل
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[3rem] shadow-xl border overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-6 text-right font-black text-slate-400 text-lg w-48">المواصفات</th>
                                    {items.map((product) => (
                                        <th key={product.id} className="p-6 relative">
                                            <button
                                                onClick={() => removeItem(product.id)}
                                                className="absolute top-4 left-4 p-2 bg-slate-100 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <div className="space-y-4">
                                                <div className="w-32 h-32 bg-slate-50 rounded-2xl mx-auto flex items-center justify-center">
                                                    {product.image_url ? (
                                                        <img src={product.image_url} alt={product.name_ar} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <span className="text-5xl">💊</span>
                                                    )}
                                                </div>
                                                <h3 className="font-black text-lg text-center line-clamp-2">{product.name_ar}</h3>
                                                <p className="text-2xl font-black text-secondary text-center">{product.price} ر.س</p>
                                                <Button
                                                    className="w-full rounded-2xl font-bold"
                                                    onClick={() => addItem(product)}
                                                >
                                                    <ShoppingCart className="w-4 h-4 ml-2" />
                                                    إضافة للسلة
                                                </Button>
                                            </div>
                                        </th>
                                    ))}
                                    {items.length < 4 && (
                                        <th className="p-6 w-48">
                                            <Link href="/products" className="block">
                                                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                                                    <Plus className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                                                    <p className="font-bold text-slate-400">إضافة منتج</p>
                                                </div>
                                            </Link>
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFields.map((field, idx) => (
                                    <motion.tr
                                        key={field.key}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-b last:border-0"
                                    >
                                        <td className="p-6 font-black text-slate-700 text-lg bg-slate-50/50">
                                            {field.label}
                                        </td>
                                        {items.map((product) => (
                                            <td key={product.id} className="p-6 text-center">
                                                {field.key === 'image' && (
                                                    <div className="w-24 h-24 bg-slate-50 rounded-xl mx-auto flex items-center justify-center">
                                                        {product.image_url ? (
                                                            <img src={product.image_url} alt="" className="w-full h-full object-contain" />
                                                        ) : (
                                                            <span className="text-4xl">💊</span>
                                                        )}
                                                    </div>
                                                )}
                                                {field.key === 'price' && (
                                                    <span className="text-xl font-black text-secondary">{product.price} ر.س</span>
                                                )}
                                                {field.key === 'rating' && (
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Star className="w-5 h-5 text-amber-400 fill-current" />
                                                        <span className="font-bold">4.8</span>
                                                    </div>
                                                )}
                                                {field.key === 'stock' && (
                                                    <Badge variant={product.stock && product.stock > 0 ? 'default' : 'destructive'} className={cn(
                                                        "rounded-full font-bold",
                                                        product.stock && product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                    )}>
                                                        {product.stock && product.stock > 0 ? 'متوفر' : 'غير متوفر'}
                                                    </Badge>
                                                )}
                                                {field.key === 'description' && (
                                                    <p className="text-sm text-slate-500 line-clamp-3 max-w-[200px] mx-auto">
                                                        {product.description_ar || 'لا يوجد وصف'}
                                                    </p>
                                                )}
                                                {field.key === 'category' && (
                                                    <span className="font-bold text-primary">{product.categories?.name_ar || 'عام'}</span>
                                                )}
                                            </td>
                                        ))}
                                        {items.length < 4 && <td className="p-6" />}
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

function Badge({ children, className, variant = 'default' }: { children: React.ReactNode; className?: string; variant?: 'default' | 'destructive' | 'outline' }) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-sm font-bold",
            variant === 'default' && "bg-primary/10 text-primary",
            variant === 'destructive' && "bg-red-100 text-red-700",
            variant === 'outline' && "border border-slate-200",
            className
        )}>
            {children}
        </span>
    )
}
