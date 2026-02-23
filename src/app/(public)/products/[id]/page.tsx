"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
    ShoppingCart,
    Heart,
    ShieldCheck,
    Truck,
    RotateCcw,
    Plus,
    Minus,
    Star,
    Share2,
    Check,
    Loader2,
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/useCartStore"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function ProductDetailsPage() {
    const { id } = useParams()
    const router = useRouter()
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`)
                if (!res.ok) throw new Error('Product not found')
                const data = await res.json()
                setProduct(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchProduct()
    }, [id])

    const handleAddToCart = () => {
        if (!product) return
        for (let i = 0; i < quantity; i++) {
            addItem(product)
        }
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4" dir="rtl">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-xl font-bold text-muted-foreground">جاري تحميل تفاصيل المنتج...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-24 text-center space-y-8" dir="rtl">
                <h1 className="text-4xl font-bold">المنتج غير موجود</h1>
                <Link href="/products">
                    <Button size="lg" className="rounded-full px-10 h-14 text-lg">
                        العودة للمتجر
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10" dir="rtl">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/products" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                        <ArrowRight className="w-5 h-5" />
                        العودة إلى جميع المنتجات
                    </Link>
                </div>

                <div className="bg-white rounded-[3rem] shadow-sm border overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="p-12 bg-slate-50/50 flex items-center justify-center relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full aspect-square flex items-center justify-center"
                            >
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.nameAr}
                                        className="w-4/5 h-4/5 object-contain"
                                    />
                                ) : (
                                    <span className="text-[15rem]">💊</span>
                                )}
                            </motion.div>
                            <div className="absolute top-10 right-10 flex flex-col gap-4">
                                <motion.button whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
                                    <Heart className="w-6 h-6" />
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.1 }} className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                                    <Share2 className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-12 lg:p-20 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1">
                                        {product.categories?.nameAr || 'منتج صحي'}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-amber-400">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-slate-900 font-black">4.9</span>
                                        <span className="text-slate-400 text-sm">(+50 مراجعة)</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                                    {product.nameAr}
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {product.description || 'لا يوجد وصف متاح لهذا المنتج حالياً.'}
                                </p>
                            </div>

                            <div className="flex items-end gap-4">
                                <p className="text-5xl font-black text-secondary">{product.price} <span className="text-lg">ر.س</span></p>
                                {product.is_featured && (
                                    <Badge className="bg-red-500 text-white border-none py-1 px-3 mb-2">عرض خاص</Badge>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-slate-100 rounded-2xl p-1 border">
                                        <button
                                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                        >
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="w-12 text-center font-black text-xl">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(q => q + 1)}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <Button
                                        onClick={handleAddToCart}
                                        className={cn(
                                            "flex-1 h-16 rounded-2xl text-xl font-black transition-all shadow-xl",
                                            added ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90 shadow-primary/25"
                                        )}
                                    >
                                        {added ? <><Check className="mr-2 w-6 h-6" /> تم الإضافة</> : <><ShoppingCart className="mr-2 w-6 h-6" /> أضف للسلة</>}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t">
                                {[
                                    { icon: ShieldCheck, title: "أصلي 100%", desc: "ضمان الجودة" },
                                    { icon: Truck, title: "توصيل سريع", desc: "خلال ساعتين" },
                                    { icon: RotateCcw, title: "إرجاع سهل", desc: "خلال 14 يوم" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center text-center gap-2">
                                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary border">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Details */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] shadow-sm border space-y-8">
                        <h3 className="text-2xl font-black">تفاصيل إضافية</h3>
                        <div className="prose prose-slate max-w-none text-muted-foreground leading-loose">
                            <p>{product.description || 'اكتشف الجودة والفعالية مع منتجاتنا المختارة بعناية لتلبية كافة احتياجاتك الصحية والتجميلية.'}</p>
                        </div>
                    </div>
                    <div className="bg-primary/5 p-12 rounded-[3rem] shadow-sm border border-primary/10 space-y-6">
                        <h3 className="text-2xl font-black">لماذا تشتري منا؟</h3>
                        <div className="space-y-4">
                            {[
                                "تخزين طبي بمعايير عالمية",
                                "توصيل مبرد للأدوية الحساسة",
                                "استشارة صيدلانية مجانية",
                                "نقاط مكافآت على كل طلب"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="font-bold text-slate-700">{text}</span>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 shadow-lg font-bold">اتصل بالصيدلي الآن</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
