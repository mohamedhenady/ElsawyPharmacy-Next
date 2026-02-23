"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Trash2,
    Plus,
    Minus,
    ShoppingBag,
    ArrowRight,
    CreditCard,
    ShieldCheck,
    ChevronLeft
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const initialItems = [
    {
        id: "1",
        name: "فيتامين سي 1000جم فوار",
        price: 45.0,
        image: "💊",
        qty: 1,
        category: "مكملات غذائية"
    },
    {
        id: "2",
        name: "كريم مرطب بيوديرما - 200مل",
        price: 185.0,
        image: "🧴",
        qty: 2,
        category: "عناية والجمال"
    }
]

export default function CartPage() {
    const [items, setItems] = useState(initialItems)

    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shipping = 15.0
    const total = subtotal + shipping

    const updateQty = (id: string, delta: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ))
    }

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-32 pt-20">
            <div className="container mx-auto px-4">
                <header className="mb-12 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900">سلة التسوق</h1>
                    </div>
                    <p className="text-muted-foreground font-medium">لديك {items.length} منتجات في سلتك حالياً.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="bg-white p-8 rounded-[2.5rem] shadow-sm border flex flex-col md:flex-row items-center gap-8 relative group"
                                    >
                                        <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                            {item.image}
                                        </div>

                                        <div className="flex-1 space-y-2 text-center md:text-right">
                                            <p className="text-sm font-bold text-primary uppercase opacity-60">{item.category}</p>
                                            <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                                            <p className="text-2xl font-black text-secondary">{item.price.toFixed(2)} <span className="text-sm">ر.س</span></p>
                                        </div>

                                        <div className="flex items-center gap-4 bg-slate-100 rounded-2xl p-1 border">
                                            <button
                                                onClick={() => updateQty(item.id, -1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-10 text-center font-black text-lg">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.id, 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all shadow-sm"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="font-black text-2xl min-w-[120px] text-center">
                                            {(item.price * item.qty).toFixed(2)} <span className="text-sm">ر.س</span>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute top-4 left-4 p-2 text-slate-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 space-y-6"
                                >
                                    <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto flex items-center justify-center text-slate-400">
                                        <ShoppingBag className="w-16 h-16" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-400">سلتك فارغة حالياً</h2>
                                    <Link href="/products">
                                        <Button className="rounded-full px-10 h-14 bg-primary font-bold">تسوق الآن</Button>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-6">
                            <Link href="/products" className="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                                العودة للمتجر وإضافة المزيد
                            </Link>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/10 space-y-8 sticky top-32">
                            <h3 className="text-2xl font-black">ملخص الطلب</h3>

                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center text-lg font-bold text-slate-600">
                                    <span>المجموع الفرعي</span>
                                    <span>{subtotal.toFixed(2)} ر.س</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-slate-600">
                                    <span>رسوم التوصيل</span>
                                    <span>{shipping.toFixed(2)} ر.س</span>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-3xl font-black text-secondary">
                                    <span>الإجمالي</span>
                                    <span>{total.toFixed(2)} ر.س</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <Link href="/checkout" className="w-full">
                                    <Button className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-xl font-black gap-3 group">
                                        تأكيد الطلب
                                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                                <div className="flex flex-col gap-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
                                        <ShieldCheck className="w-4 h-4" />
                                        دفع آمن 100%
                                    </div>
                                    <div className="flex items-center justify-center gap-4 grayscale opacity-50">
                                        <CreditCard className="w-8 h-8" />
                                        <div className="font-black italic text-xl">VISA</div>
                                        <div className="font-black italic text-xl">MADA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
