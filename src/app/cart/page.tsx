"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/useCartStore"
import { motion, AnimatePresence } from "framer-motion"

export default function CartPage() {
    const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center space-y-8" dir="rtl">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">سلة التسوق فارغة</h1>
                <p className="text-muted-foreground text-xl">يبدو أنك لم تضف أي منتجات إلى سلتك بعد.</p>
                <Link href="/products">
                    <Button size="lg" className="rounded-full px-10 h-14 text-lg mt-8">
                        تصفح المنتجات
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12" dir="rtl">
            <h1 className="text-4xl font-black mb-12">سلة التسوق ({items.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="glass-card p-6 rounded-[2.5rem] border border-white/50 flex flex-col sm:flex-row items-center gap-8 shadow-sm"
                            >
                                <div className="w-32 h-32 bg-white/40 rounded-[2rem] flex items-center justify-center shrink-0">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name_ar} className="w-3/4 h-3/4 object-contain" />
                                    ) : (
                                        <span className="text-4xl">💊</span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-2 text-center sm:text-right">
                                    <h3 className="text-2xl font-bold">{item.name_ar}</h3>
                                    <p className="text-primary font-black text-xl">{item.price} ر.س</p>
                                </div>

                                <div className="flex items-center gap-4 bg-white/40 p-2 rounded-2xl border border-white/20">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl hover:bg-white"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                    <span className="font-bold text-xl min-w-[2ch] text-center">{item.quantity}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-xl hover:bg-white"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <Trash2 className="w-6 h-6" />
                                </Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Button
                        variant="ghost"
                        className="text-muted-foreground font-bold hover:text-red-500"
                        onClick={clearCart}
                    >
                        مسح السلة بالكامل
                    </Button>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="glass-card p-10 rounded-[3rem] border border-white/50 shadow-xl space-y-8">
                        <h2 className="text-2xl font-bold border-b pb-4">ملخص الطلب</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">المجموع الفرعي</span>
                                <span className="font-bold">{getTotalPrice()} ر.س</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">التوصيل</span>
                                <span className="text-emerald-600 font-bold">مجاني</span>
                            </div>
                            <hr />
                            <div className="flex justify-between text-2xl font-black">
                                <span>الإجمالي</span>
                                <span className="text-secondary">{getTotalPrice()} ر.س</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <Button className="w-full h-16 rounded-full text-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform group">
                                إتمام الطلب
                                <ArrowRight className="mr-2 w-6 h-6 rotate-180 group-hover:translate-x-[-4px] transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                            <ArrowRight className="w-6 h-6 rotate-180" />
                        </div>
                        <p className="text-emerald-800 font-bold">توصيل مجاني لجميع الطلبات في القاهرة!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
