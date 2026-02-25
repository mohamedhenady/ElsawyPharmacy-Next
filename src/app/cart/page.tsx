"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import Link from "next/link"

const CART_ITEMS = [
    { id: 1, name: "Centrum Adult Multivitamin", price: 24.99, quantity: 1, image: "/product1.png" },
    { id: 2, name: "La Roche-Posay SPF 50", price: 32.50, quantity: 2, image: "/product2.png" },
]

export default function CartPage() {
    const [items, setItems] = useState(CART_ITEMS)

    const updateQuantity = (id: number, delta: number) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ))
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 10.00
    const total = subtotal + shipping

    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen flex flex-col pb-28">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1712]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/home" className="flex items-center justify-center size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">سلة التسوق</h1>
                </div>
                <div className="flex items-center justify-center size-10 rounded-2xl bg-primary/10 text-primary">
                    <ShoppingBag className="w-5 h-5" />
                </div>
            </header>

            <div className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
                {/* Cart Items */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm"
                            >
                                <div className="flex gap-4">
                                    <div className="size-24 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <div className="text-slate-300">Image</div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{item.name}</h3>
                                                <button className="text-slate-400 hover:text-red-500 transition-colors p-1">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-slate-500 mt-0.5">30 قرص</p>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <span className="text-lg font-bold text-primary">{item.price} ج.م</span>

                                            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-100 dark:border-slate-700">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="size-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="size-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Checkout Summary Footer */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-4 z-[90]">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-emerald-900/10 border border-slate-100 dark:border-slate-800 space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold">المجموع الفرعي</span>
                            <span className="font-black text-slate-900 dark:text-slate-100">{subtotal.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-bold">رسوم التوصيل</span>
                            <span className="font-black text-emerald-500">+{shipping.toFixed(2)} ج.م</span>
                        </div>
                        <div className="h-px bg-slate-50 dark:bg-slate-800 my-4" />
                        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <span className="text-lg font-black text-slate-900 dark:text-white">الإجمالي النهائي</span>
                            <span className="text-2xl font-black text-[#1FAF5A]">{total.toFixed(2)} <span className="text-xs">ج.م</span></span>
                        </div>
                    </div>
                    <button className="w-full bg-[#1FAF5A] hover:bg-[#0d5c2f] text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-emerald-500/30 text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] group">
                        <CreditCard className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <span>إتمام عملية الدفع</span>
                    </button>
                </div>
            </div>

            <MobileBottomNav />
        </div>
    )
}
