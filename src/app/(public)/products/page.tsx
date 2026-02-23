"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Search,
    Filter,
    ShoppingCart,
    Heart,
    Star,
    LayoutGrid,
    List,
    ChevronDown,
    Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/store/useCartStore"
import Link from "next/link"

export default function ProductsPage() {
    const [view, setView] = useState<"grid" | "list">("grid")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [searchQuery, setSearchQuery] = useState("")
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const addItem = useCartStore((state) => state.addItem)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    fetch(`/api/products${selectedCategory !== 'all' ? `?categoryId=${selectedCategory}` : ''}`),
                    fetch('/api/categories')
                ])
                const [productsData, categoriesData] = await Promise.all([
                    productsRes.json(),
                    categoriesRes.json()
                ])
                setProducts(Array.isArray(productsData) ? productsData : [])
                setCategories(Array.isArray(categoriesData) ? categoriesData : [])
            } catch (err) {
                console.error('Failed to fetch data', err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [selectedCategory])

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name_ar.includes(searchQuery)
    )

    return (
        <div className="bg-slate-50 min-h-screen pb-20" dir="rtl">
            {/* Header */}
            <header className="bg-white border-b py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-3 text-center md:text-right">
                            <Badge className="bg-primary/10 text-primary border-none text-sm font-bold px-4 py-1">متجرنا</Badge>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900">جميع المنتجات</h1>
                            <p className="text-muted-foreground text-lg">اكتشف أكثر من +5,000 منتج صحي وتجميلي بلمسة واحدة.</p>
                        </div>
                        <div className="relative w-full max-w-md">
                            <Input
                                placeholder="ابحث عن منتجك المفضل..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pr-12 h-16 rounded-3xl bg-slate-50 border-none shadow-inner focus-visible:ring-primary text-lg"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-xl">الفلاتر</h3>
                                <Filter className="w-5 h-5 text-primary" />
                            </div>

                            <div className="space-y-4">
                                <p className="font-bold text-sm text-slate-400 uppercase tracking-widest">التصنيفات الرئيسيّة</p>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory("all")}
                                        className={cn(
                                            "w-full text-right px-4 py-3 rounded-2xl transition-all font-bold",
                                            selectedCategory === "all"
                                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                : "hover:bg-slate-50 text-slate-600"
                                        )}
                                    >
                                        الكل
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={cn(
                                                "w-full text-right px-4 py-3 rounded-2xl transition-all font-bold",
                                                selectedCategory === cat.id
                                                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                                                    : "hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            {cat.name_ar}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="font-bold text-sm text-slate-400 uppercase tracking-widest">السعر (ر.س)</p>
                                <div className="flex items-center gap-4">
                                    <Input placeholder="من" className="rounded-xl h-12" />
                                    <Input placeholder="إلى" className="rounded-xl h-12" />
                                </div>
                            </div>

                            <Button className="w-full rounded-2xl h-14 font-bold bg-secondary hover:bg-secondary/90 shadow-lg transition-transform active:scale-95">تطبيق الفلاتر</Button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        <div className="flex justify-between items-center bg-white p-4 rounded-3xl shadow-sm border">
                            <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                                <span>عرض:</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setView("grid")}
                                        className={cn("p-2 rounded-xl transition-colors", view === "grid" ? "bg-slate-100 text-primary" : "hover:text-primary")}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setView("list")}
                                        className={cn("p-2 rounded-xl transition-colors", view === "list" ? "bg-slate-100 text-primary" : "hover:text-primary")}
                                    >
                                        <List className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-slate-500 hidden sm:inline">ترتيب حسب:</span>
                                <Button variant="ghost" className="rounded-xl gap-2 font-bold">
                                    الأحدث
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 gap-4">
                                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                                <p className="text-muted-foreground font-bold">جاري تحميل المنتجات...</p>
                            </div>
                        ) : (
                            <div className={cn(
                                "grid gap-8",
                                view === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                            )}>
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            whileHover={{ y: -10 }}
                                            className={cn(
                                                "group bg-white rounded-[2.5rem] border shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden",
                                                view === "list" && "flex flex-col sm:flex-row items-center p-6 gap-8"
                                            )}
                                        >
                                            <Link href={`/products/${product.id}`} className={cn(
                                                "relative bg-slate-50 flex items-center justify-center overflow-hidden shrink-0",
                                                view === "grid" ? "aspect-square w-full" : "w-48 h-48 rounded-[2rem]"
                                            )}>
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name_ar}
                                                        className="w-3/4 h-3/4 object-contain group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <span className="text-7xl group-hover:scale-110 transition-transform duration-700">💊</span>
                                                )}
                                                {product.is_featured && (
                                                    <Badge className="absolute top-6 right-6 bg-primary text-white border-none px-4 py-1 font-bold shadow-lg">
                                                        مميز
                                                    </Badge>
                                                )}
                                                <button className="absolute bottom-6 left-6 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-red-500">
                                                    <Heart className="w-5 h-5" />
                                                </button>
                                            </Link>

                                            <div className="p-8 space-y-6 flex-1">
                                                <div className="space-y-2">
                                                    <p className="text-sm font-bold text-primary uppercase tracking-widest opacity-60">
                                                        {product.categories?.name_ar || 'تصنيف عام'}
                                                    </p>
                                                    <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors line-clamp-2">{product.name_ar}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex text-amber-400">
                                                            <Star className="w-4 h-4 fill-current" />
                                                        </div>
                                                        <span className="text-sm font-black">4.9</span>
                                                        <span className="text-sm text-slate-400">({Math.floor(Math.random() * 100) + 20} مراجعة)</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t">
                                                    <div className="space-y-1">
                                                        <p className="text-2xl font-black text-secondary">{product.price} <span className="text-sm">ر.س</span></p>
                                                    </div>
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => addItem(product)}
                                                        className="p-4 bg-primary text-white rounded-[1.25rem] shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                                                    >
                                                        <ShoppingCart className="w-6 h-6" />
                                                        {view === "list" && <span className="font-bold mr-2">أضف للسلة</span>}
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {!loading && filteredProducts.length === 0 && (
                            <div className="text-center py-24 space-y-4">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-xl font-bold text-slate-600">لا توجد نتائج مطابقة لبحثك</p>
                                <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory("all") }}>مسح جميع الفلاتر</Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    )
}

