"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowRight, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCartStore } from "@/store/useCartStore"

export default function CheckoutSuccessPage() {
    const { clearCart } = useCartStore()

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50/50" dir="rtl">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-xl w-full bg-white p-12 rounded-[4rem] shadow-2xl shadow-emerald-500/5 text-center space-y-8 border border-slate-100"
            >
                <div className="relative inline-block">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white mx-auto relative z-10 shadow-lg shadow-emerald-200"
                    >
                        <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    <div className="absolute inset-0 bg-emerald-200 rounded-full blur-3xl opacity-30 animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">شكراً لثقتكم بنا! ✨</h1>
                    <p className="text-xl text-muted-foreground font-medium">تم استلام طلبك بنجاح وجارِ العمل على تجهيزه.</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-2">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">رقم الطلب للاستفسار</p>
                    <p className="text-2xl font-black text-primary">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Button asChild variant="outline" className="h-16 rounded-2xl text-lg font-bold border-2 hover:bg-slate-50">
                        <Link href="/">
                            العودة للرئيسية
                        </Link>
                    </Button>
                    <Button asChild className="h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                        <Link href="/products" className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            متابعة التسوق
                        </Link>
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground pt-4">
                    سيصلك اتصال هاتفي قريباً لتأكيد تفاصيل التوصيل.
                </p>
            </motion.div>
        </div>
    )
}
