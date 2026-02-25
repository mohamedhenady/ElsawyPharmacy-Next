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
    const [items] = useState(CART_ITEMS)

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const delivery = 5.00
    const total = subtotal + delivery

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pb-40">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
                <Link href="/home" className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <ArrowRight className="w-6 h-6" />
                </Link>
                <h1 className="text-lg font-bold">عربة التسوق</h1>
                <div className="size-10 flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-5 h-5" />
                </div>
            </header>

            <main className="flex-1 px-4 py-6 space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white dark:bg-slate-900 p-3 rounded-2xl flex gap-4 shadow-sm border border-slate-100 dark:border-slate-800"
                            >
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                                    <div className="w-12 h-12 bg-slate-200 rounded animate-pulse" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-primary font-black">{item.price} ج.م</span>
                                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-full border border-slate-100 dark:border-slate-700">
                                            <button className="p-1 text-slate-400 hover:text-primary transition-colors">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button className="p-1 text-slate-400 hover:text-primary transition-colors">
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="self-center p-2 text-rose-500 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Delivery Info */}
                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm font-bold">عنوان التوصيل</span>
                        </div>
                        <button className="text-xs text-primary font-bold">تغيير</button>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-6">
                        شارع الصاوي، متفرع من شارع المحطة، بجوار مسجد الإيمان، الإسماعيلية.
                    </p>
                </div>
            </main>

            {/* Checkout Summary Footer */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-4 z-50">
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>المجموع الفرعي</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">{subtotal.toFixed(2)} ج.م</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>التوصيل</span>
                            <span className="font-bold text-slate-900 dark:text-slate-100">{delivery.toFixed(2)} ج.م</span>
                        </div>
                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                        <div className="flex justify-between text-lg font-black">
                            <span>الإجمالي</span>
                            <span className="text-primary">{total.toFixed(2)} ج.م</span>
                        </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 text-lg flex items-center justify-center gap-3">
                        <CreditCard className="w-6 h-6" />
                        <span>إتمام الطلب</span>
                    </Button>
                </div>
            </div>

            <MobileBottomNav />
        </div>
    )
}
