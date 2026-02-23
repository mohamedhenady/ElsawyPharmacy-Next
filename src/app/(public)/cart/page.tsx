"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, CreditCard, ChevronLeft } from "lucide-react"
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
            <div className="container mx-auto px-4 py-32 text-center space-y-8" dir="rtl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
                >
                    <ShoppingBag className="w-16 h-16 text-primary" />
                </motion.div>
                <h1 className="text-4xl font-black text-slate-800">سلة التسوق فارغة</h1>
                <p className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed">يبدو أنك لم تضف أي منتجات إلى سلتك بعد. ابدأ بالتسوق الآن واكتشف أفضل العروض الحصرية!</p>
                <Link href="/products" className="inline-block mt-8">
                    <Button size="lg" className="rounded-full px-12 h-16 text-xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                        تصفح المنتجات
                    </Button>
                </Link>
            </div>
        )
    }

    const subtotal = getTotalPrice()
    const shipping = 0 // Free shipping as per logic
    const total = subtotal + shipping

    return (
        <div className="bg-slate-50 min-h-screen pb-32 pt-20" dir="rtl">
            <div className="container mx-auto px-4">
                <motion.header
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12 space-y-4"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary shadow-inner">
                            <ShoppingBag className="w-7 h-7" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">سلة التسوق</h1>
                            <p className="text-slate-500 font-bold">لديك {items.length} منتجات في انتظارك.</p>
                        </div>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-shadow relative group"
                                >
                                    <div className="w-32 h-32 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-slate-100 p-4 transition-transform group-hover:scale-105 duration-500">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name_ar} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-5xl">💊</span>
                                        )}
                                    </div>

                                    <div className="flex-1 space-y-2 text-center md:text-right">
                                        <p className="text-xs font-black text-primary/60 uppercase tracking-widest">صيدلية الصاوي</p>
                                        <h3 className="text-2xl font-black text-slate-800">{item.name_ar}</h3>
                                        <p className="text-2xl font-black text-secondary">{item.price} <span className="text-sm">ر.س</span></p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-10 h-10 rounded-xl hover:bg-white hover:text-primary transition-all shadow-sm"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="font-black text-2xl min-w-[2ch] text-center text-slate-700">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="w-10 h-10 rounded-xl hover:bg-white hover:text-primary transition-all shadow-sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="font-black text-2xl min-w-[120px] text-center text-slate-900">
                                        {(item.price * item.quantity).toFixed(2)} <span className="text-sm">ر.س</span>
                                    </div>

                                    <button
                                        className="absolute top-6 left-6 text-slate-300 hover:text-red-500 transition-colors p-2"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="flex justify-between items-center pt-8 border-t border-slate-200">
                            <Link href="/products" className="inline-flex items-center gap-2 text-primary font-black hover:gap-4 transition-all">
                                <ArrowRight className="w-5 h-5 rotate-180" />
                                العودة للمتجر وإضافة المزيد
                            </Link>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 font-bold hover:text-red-600 hover:bg-red-50 rounded-xl"
                                onClick={clearCart}
                            >
                                <Trash2 className="w-4 h-4 ml-2" />
                                مسح السلة بالكامل
                            </Button>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-primary/5 space-y-8 sticky top-32">
                            <h3 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-6">ملخص الطلب</h3>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-lg font-bold text-slate-500">
                                    <span>المجموع الفرعي</span>
                                    <span>{subtotal.toFixed(2)} ر.س</span>
                                </div>
                                <div className="flex justify-between items-center text-lg font-bold text-slate-500 text-right">
                                    <span>رسوم الشحن</span>
                                    <span className="text-emerald-500 font-black">مجاني بمناسبة الافتتاح 🎁</span>
                                </div>
                                <div className="pt-6 border-t border-slate-100 flex justify-between items-center text-3xl font-black text-secondary">
                                    <span>الإجمالي الرسمي</span>
                                    <span>{total.toFixed(2)} ر.س</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <Link href="/checkout" className="w-full block">
                                    <Button className="w-full h-20 rounded-[1.5rem] bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-2xl font-black gap-4 group">
                                        إتمام الطلب والدفع
                                        <ChevronLeft className="w-7 h-7 group-hover:-translate-x-2 transition-transform" />
                                    </Button>
                                </Link>

                                <div className="flex flex-col gap-4 text-center mt-6">
                                    <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-bold">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        تشفير آمن بنسبة 100%
                                    </div>
                                    <div className="flex items-center justify-center gap-6 grayscale opacity-40">
                                        <CreditCard className="w-8 h-8" />
                                        <div className="font-black italic text-xl">VISA</div>
                                        <div className="font-black italic text-xl">MADA</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center gap-4 shadow-sm">
                            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <p className="text-emerald-800 font-bold leading-snug">نضمن لك وصول أدويتك في أسرع وقت وبأعلى معايير الجودة الصحية.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
