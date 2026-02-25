import { MobileHeader } from "@/components/mobile/Header"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import { Camera, ChevronRight, Pill, User, Gift, Heart, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen pb-24 bg-background-light dark:bg-background-dark">
            <MobileHeader />

            <main className="px-4 space-y-6 mt-4">
                {/* Offers Carousel Slider */}
                <section>
                    <div className="flex overflow-x-auto gap-4 snap-x no-scrollbar pb-2">
                        <div className="min-w-[85%] snap-center rounded-2xl overflow-hidden relative h-40 bg-gradient-to-br from-primary to-secondary text-white p-6 flex flex-col justify-center shadow-lg">
                            <div className="z-10">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">خصم الصيف</span>
                                <h3 className="text-2xl font-bold mt-2">30% خصم على الفيتامينات</h3>
                                <p className="text-white/80 text-sm italic">عزز مناعتك اليوم</p>
                            </div>
                            <Pill className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 -rotate-12" />
                        </div>
                        <div className="min-w-[85%] snap-center rounded-2xl overflow-hidden relative h-40 bg-gradient-to-br from-secondary to-primary text-white p-6 flex flex-col justify-center shadow-lg">
                            <div className="z-10">
                                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">العناية بالبشرة</span>
                                <h3 className="text-2xl font-bold mt-2">إشراقة الصيف</h3>
                                <p className="text-white/80 text-sm italic">أفضل حماية لبشرتك</p>
                            </div>
                            <User className="absolute right-[-10px] bottom-[-10px] w-32 h-32 opacity-20 rotate-12" />
                        </div>
                    </div>
                </section>

                {/* Upload Prescription Card */}
                <Link href="/prescription" className="block">
                    <section className="bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform">
                        <div className="bg-primary text-white p-3.5 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                            <Camera className="w-7 h-7" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 dark:text-slate-100">ارفع روشتتك</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400">اطلب أدويتك مباشرة من صورة الروشتة</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-primary opacity-50" />
                    </section>
                </Link>

                {/* Categories Grid */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-extrabold">التصنيفات</h2>
                        <Link href="/categories" className="text-primary text-xs font-bold bg-primary/5 px-3 py-1 rounded-full">الكل</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {[
                            { icon: Pill, label: "أدوية", color: "bg-blue-50 text-blue-500" },
                            { icon: Heart, label: "جمال", color: "bg-rose-50 text-rose-500" },
                            { icon: User, label: "طفل", color: "bg-indigo-50 text-indigo-500" },
                            { icon: Gift, label: "عرض", color: "bg-amber-50 text-amber-500" },
                        ].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm", cat.color)}>
                                    <cat.icon className="w-8 h-8" />
                                </div>
                                <span className="text-[11px] font-bold text-center">{cat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-extrabold">منتجات مميزة</h2>
                        <Link href="/products" className="text-primary text-xs font-bold bg-primary/5 px-3 py-1 rounded-full">الكل</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col group">
                                <div className="w-full aspect-square bg-slate-50 dark:bg-slate-700 rounded-xl mb-3 relative flex items-center justify-center overflow-hidden">
                                    <div className="w-24 h-24 bg-slate-200 rounded-lg animate-pulse" />
                                    <button className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-sm backdrop-blur-sm">
                                        <Heart className="w-4 h-4 text-slate-400 group-hover:text-rose-500 transition-colors" />
                                    </button>
                                </div>
                                <h3 className="font-bold text-sm line-clamp-2 min-h-[40px]">اسم المنتج التجريبي يظهر هنا</h3>
                                <div className="mt-3 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-primary font-black text-base">24.99 ج.م</span>
                                        <span className="text-[10px] text-slate-400 line-through">35.00 ج.م</span>
                                    </div>
                                    <Button size="icon" className="h-9 w-9 rounded-xl shadow-lg shadow-primary/20">
                                        <Plus className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <MobileBottomNav />
        </div>
    )
}
