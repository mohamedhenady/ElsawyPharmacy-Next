"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categoryStyles: Record<string, any> = {
    medicines: {
        color: "from-emerald-50 to-teal-100",
        border: "border-emerald-200",
        text: "text-emerald-700",
        icon: "💊"
    },
    cosmetics: {
        color: "from-blue-50 to-indigo-100",
        border: "border-blue-200",
        text: "text-blue-700",
        icon: "✨"
    },
    vitamins: {
        color: "from-orange-50 to-amber-100",
        border: "border-orange-200",
        text: "text-orange-700",
        icon: "🌿"
    },
    baby: {
        color: "from-purple-50 to-fuchsia-100",
        border: "border-purple-200",
        text: "text-purple-700",
        icon: "👶"
    },
    default: {
        color: "from-slate-50 to-slate-100",
        border: "border-slate-200",
        text: "text-slate-700",
        icon: "📦"
    }
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(Array.isArray(data) ? data : [])
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    return (
        <div className="container mx-auto px-4 py-20" dir="rtl">
            <header className="max-w-2xl mb-16 space-y-4 text-right">
                <Badge className="bg-primary/10 text-primary border-none text-sm font-bold px-4 py-1">الأقسام</Badge>
                <h1 className="text-5xl font-black text-slate-900 leading-tight">تصفح جميع <br /><span className="text-primary italic">تصنيفات الصيدلية</span></h1>
                <p className="text-xl text-muted-foreground leading-relaxed">نقدم لك تشكيلة واسعة من المنتجات الطبية والتجميلية المختارة بعناية لتلبية كافة احتياجاتك.</p>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="text-muted-foreground font-bold">جاري تحميل التصنيفات...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {categories.map((cat, i) => {
                        const style = categoryStyles[cat.name] || categoryStyles.default
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className={cn(
                                    "group overflow-hidden rounded-[3rem] border p-1 bg-gradient-to-br shadow-sm hover:shadow-2xl transition-all duration-500",
                                    style.color,
                                    style.border
                                )}
                            >
                                <div className="bg-white/80 backdrop-blur-md rounded-[2.8rem] p-10 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="space-y-4">
                                            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform duration-500 border border-slate-100 text-right">
                                                {style.icon}
                                            </div>
                                            <h2 className={cn("text-3xl font-black text-right", style.text)}>{cat.name_ar}</h2>
                                            <p className="text-muted-foreground font-medium text-right">استكشف منتجات {cat.name_ar}</p>
                                        </div>
                                        <Link href={`/products?categoryId=${cat.id}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg cursor-pointer"
                                            >
                                                <ChevronLeft className="w-7 h-7" />
                                            </motion.div>
                                        </Link>
                                    </div>

                                    <div className="space-y-4 text-right">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">تصفح القسم بالكامل</p>
                                        <div className="flex flex-wrap gap-2 justify-end">
                                            <Link
                                                href={`/products?categoryId=${cat.id}`}
                                                className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-primary hover:text-white transition-all text-sm border border-slate-200"
                                            >
                                                عرض جميع المنتجات
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}

            {/* Newsletter or CTA Section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-32 p-16 rounded-[4rem] bg-secondary text-white relative overflow-hidden text-center"
            >
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 space-y-8">
                    <h2 className="text-4xl font-black">هل تبحث عن منتج معين؟</h2>
                    <p className="text-xl text-secondary-foreground/80 max-w-2xl mx-auto">فريقنا متاح على مدار الـ 24 ساعة لمساعدتك في العثور على ما تبحث عنه أو لتقديم استشارة طبية سريعة.</p>
                    <div className="flex justify-center gap-6">
                        <Button size="lg" className="rounded-full px-12 h-16 bg-white text-secondary hover:bg-slate-100 font-bold text-lg shadow-xl">تواصل عبر واتساب</Button>
                        <Button size="lg" variant="outline" className="rounded-full px-12 h-16 border-white/30 text-white hover:bg-white/10 font-bold text-lg backdrop-blur-sm">زيارة أقرب فرع</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

