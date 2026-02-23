"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    ArrowRight,
    ShieldCheck,
    Truck,
    CreditCard,
    Star,
    ShoppingCart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useCartStore } from "@/store/useCartStore"

export default function HomePage() {
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch('/api/products?isFeatured=true'),
                    fetch('/api/categories')
                ])

                const data = await Promise.all([
                    productsRes.ok && productsRes.headers.get('content-type')?.includes('application/json')
                        ? productsRes.json() : Promise.resolve([]),
                    categoriesRes.ok && categoriesRes.headers.get('content-type')?.includes('application/json')
                        ? categoriesRes.json() : Promise.resolve([])
                ])

                setProducts(Array.isArray(data[0]) ? data[0] : [])
                setCategories(Array.isArray(data[1]) ? data[1] : [])
            } catch (err) {
                console.error('Failed to fetch data', err)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="flex flex-col gap-16">
            {/* Hero Section */}
            <section className="relative min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-[#f0f9f9] via-white to-primary/5">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity }}
                        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, -90, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity }}
                        className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[150px]"
                    />
                </div>

                <div className="container mx-auto px-4 z-10 grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold shadow-sm"
                        >
                            <Star className="w-4 h-4 fill-primary animate-pulse" />
                            أفضل صيدلية أونلاين في منطقتك
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                            صحة عائلتك <br />
                            في <span className="text-primary italic relative">
                                أيدٍ أمينة
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute bottom-1 left-0 h-3 bg-primary/10 -z-10"
                                />
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                            تسوق الآن جميع احتياجاتك من الأدوية، الفيتامينات، ومستحضرات التجميل العالمية بأسعار تنافسية وتوصيل آمن للمنزل.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/products">
                                <Button size="lg" className="rounded-full px-10 gap-2 h-16 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                                    تسوق جميع المنتجات
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg glass-card hover:bg-white transition-all">
                                تواصل معنا
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="hidden md:block relative"
                    >
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-20 animate-pulse" />
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <img
                                src="/pharmacy_hero_banner.png"
                                alt="Pharmacy Products"
                                className="relative z-10 w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] rounded-3xl"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: ShieldCheck, title: "منتجات أصلية 100%", desc: "جميع منتجاتنا مرخصة وموثوقة من الوكلاء" },
                        { icon: Truck, title: "توصيل سريع", desc: "توصيل طلباتك حتى باب المنزل في غضون ساعتين" },
                        { icon: CreditCard, title: "دفع آمن", desc: "ادفع كاش أو عبر محفظتنا الإلكترونية المعتمدة" },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="flex gap-5 p-8 glass-card rounded-[2rem] group cursor-default"
                        >
                            <div className="p-4 rounded-2xl bg-primary/10 text-primary h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-1">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Popular Categories */}
            <section className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-end mb-12"
                >
                    <div>
                        <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-bold">التصنيفات</Badge>
                        <h2 className="text-4xl font-bold mb-2">تصفح حسب القسم</h2>
                        <p className="text-muted-foreground">كل ما تحتاجه لصحتك في مكان واحد</p>
                    </div>
                    <Link href="/categories">
                        <Button variant="ghost" className="text-primary font-bold hover:bg-primary/5 rounded-full px-6">
                            عرض الكل <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                        </Button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.slice(0, 4).map((cat, i) => (
                        <Link key={cat.id} href={`/categories/${cat.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={cn(
                                    "group cursor-pointer rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-6 transition-all shadow-sm hover:shadow-xl bg-gradient-to-br border border-white/50 from-emerald-50 to-teal-100"
                                )}
                            >
                                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                                    <span className="text-4xl">💊</span>
                                </div>
                                <span className={cn("font-bold text-xl text-emerald-700")}>{cat.name_ar}</span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary font-bold">العروض</Badge>
                        <h2 className="text-4xl font-bold mb-2">المنتجات المميزة</h2>
                        <p className="text-muted-foreground">أفضل المنتجات المختارة لك</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ y: -10 }}
                            className="glass-card rounded-[2.5rem] p-6 border border-white/50 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="aspect-square bg-white/40 rounded-[2rem] overflow-hidden flex items-center justify-center">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name_ar} className="w-3/4 h-3/4 object-contain" />
                                ) : (
                                    <span className="text-6xl">💊</span>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{product.name_ar}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description_ar}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <p className="text-secondary font-black text-xl">{product.price} ر.س</p>
                                <Button
                                    onClick={() => addItem(product)}
                                    size="icon"
                                    className="rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats / Trust Section */}
            <section className="bg-secondary/5 py-24">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "عميل يثق بنا", val: "+50,000" },
                            { label: "فرع في القاهرة", val: "10" },
                            { label: "منتج مرخص", val: "+5,000" },
                            { label: "ساعة خدمة", val: "24/7" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center space-y-2"
                            >
                                <p className="text-4xl font-black text-secondary">{stat.val}</p>
                                <p className="text-muted-foreground font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="container mx-auto px-4 py-8">
                <div className="rounded-[3rem] bg-slate-900 text-white overflow-hidden relative shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-16 gap-12">
                        <div className="space-y-8 max-w-xl">
                            <Badge className="bg-primary/20 text-primary border-primary/30 py-1 px-4">اشترك الآن</Badge>
                            <h2 className="text-5xl font-bold leading-tight">احصل على عروضنا الحصرية <br /> مباشرة على هاتفك!</h2>
                            <p className="text-slate-400 text-xl leading-relaxed">سجل بريدك الإلكتروني لتصلك آخر العروض والمنتجات الطبية فور وصولها بخصومات تصل إلى 50%.</p>
                            <div className="flex gap-4 p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10 max-w-md shadow-2xl">
                                <input
                                    placeholder="بريدك الإلكتروني"
                                    className="bg-transparent border-none focus:ring-0 flex-1 px-6 text-white text-lg h-14 outline-none"
                                />
                                <Button className="rounded-full px-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-14 font-bold">اشتراك</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

