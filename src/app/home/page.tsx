"use client"

import { MobileHeader } from "@/components/mobile/Header"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import { Camera, ChevronRight, Pill, User, Gift, Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen pb-28 bg-[#f8faf9] dark:bg-[#0f1712]">
            <MobileHeader />

            <main className="px-4 py-6 space-y-8">
                {/* Offers Carousel - Premium Glass/Gradient */}
                <section>
                    <div className="flex overflow-x-auto gap-4 no-scrollbar snap-x pb-4">
                        <div className="min-w-[85%] snap-center rounded-[2rem] overflow-hidden relative aspect-[16/9] bg-gradient-to-br from-[#1FAF5A] to-[#0d5c2f] text-white p-8 flex flex-col justify-center shadow-xl shadow-emerald-900/10">
                            <div className="z-10 relative">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">خصم الصيف</span>
                                <h3 className="text-2xl font-black mt-4 leading-tight">30% خصم على<br />جميع الفيتامينات</h3>
                                <p className="text-white/70 text-sm mt-2 font-medium">عزز مناعتك وصحتك اليوم</p>
                            </div>
                            <Pill className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 -rotate-12" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        </div>
                        <div className="min-w-[85%] snap-center rounded-[2rem] overflow-hidden relative aspect-[16/9] bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8 flex flex-col justify-center shadow-xl shadow-blue-900/10">
                            <div className="z-10 relative">
                                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">العناية بالبشرة</span>
                                <h3 className="text-2xl font-black mt-4 leading-tight">إشراقة الصيف<br />بأفضل الأسعار</h3>
                                <p className="text-white/70 text-sm mt-2 font-medium">حماية فائقة لبشرتك الحساسة</p>
                            </div>
                            <User className="absolute -right-6 -bottom-6 w-40 h-40 opacity-10 rotate-12" />
                        </div>
                    </div>
                </section>

                {/* Upload Prescription - Premium Card */}
                <Link href="/prescription" className="group block">
                    <section className="bg-white dark:bg-slate-900 p-5 rounded-3xl flex items-center gap-5 shadow-sm border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-all group-hover:border-[#1FAF5A]/30">
                        <div className="bg-[#1FAF5A] text-white p-4 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:rotate-6 transition-transform">
                            <Camera className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">ارفع روشتتك الآن</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">اطلب أدويتك وأنت في مكانك</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#1FAF5A]/10 group-hover:text-[#1FAF5A] transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </div>
                    </section>
                </Link>

                {/* Categories - Grid Style */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">التصنيفات</h2>
                            <div className="h-1.5 w-8 bg-[#1FAF5A] rounded-full mt-1"></div>
                        </div>
                        <Link href="/categories" className="text-sm font-bold text-[#1FAF5A] bg-emerald-500/5 px-4 py-1.5 rounded-full hover:bg-emerald-500/10 transition-colors">الكل</Link>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { icon: Pill, label: "أدوية", color: "bg-emerald-50 text-[#1FAF5A]" },
                            { icon: Heart, label: "تجميل", color: "bg-rose-50 text-rose-500" },
                            { icon: User, label: "طفل", color: "bg-blue-50 text-blue-500" },
                            { icon: Gift, label: "عروض", color: "bg-amber-50 text-amber-500" },
                        ].map((cat, i) => (
                            <button key={i} className="flex flex-col items-center gap-3 active:scale-95 transition-transform">
                                <div className={cn("w-[72px] h-[72px] rounded-3xl flex items-center justify-center shadow-sm border border-black/5", cat.color)}>
                                    <cat.icon className="w-9 h-9" />
                                </div>
                                <span className="text-xs font-black text-slate-700 dark:text-slate-300">{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Featured Products - Premium Cards */}
                <section>
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">منتجات رائجة</h2>
                            <div className="h-1.5 w-8 bg-[#1FAF5A] rounded-full mt-1"></div>
                        </div>
                        <Link href="/products" className="text-sm font-bold text-[#1FAF5A] bg-emerald-500/5 px-4 py-1.5 rounded-full">المزيد</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-2 right-2 z-10">
                                    <button className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-2xl shadow-sm backdrop-blur-md text-slate-400 hover:text-rose-500 transition-colors">
                                        <Heart className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="w-full aspect-square bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-4 flex items-center justify-center p-4">
                                    <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
                                </div>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 min-h-[40px] px-1">كريم مرطب فيشي لإشراقة سحرية</h3>
                                <div className="mt-4 flex items-center justify-between px-1 pb-1">
                                    <div className="flex flex-col">
                                        <span className="text-[#1FAF5A] font-black text-lg leading-none">24.50</span>
                                        <span className="text-[10px] text-slate-400 font-bold mt-1">ج.م</span>
                                    </div>
                                    <button className="bg-[#1FAF5A] text-white p-2.5 rounded-2xl shadow-lg shadow-emerald-500/30 active:scale-90 transition-transform hover:bg-[#0d5c2f]">
                                        <Plus className="w-5 h-5" />
                                    </button>
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
