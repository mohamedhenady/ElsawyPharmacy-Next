"use client"

import { Bell, ShoppingCart, Search, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function MobileHeader() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 px-4 py-3">
            <div className="flex items-center justify-between mb-4">
                <Link href="/home" className="flex items-center gap-2 group">
                    <div className="bg-[#1FAF5A] p-2 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-active:scale-95 transition-transform">
                        <PlusCircle className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Elsawy<span className="text-[#1FAF5A]">.</span>
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <button className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-[#1FAF5A] transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                    </button>
                    <button className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-[#1FAF5A] transition-colors relative">
                        <ShoppingCart className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-[#1FAF5A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-950 shadow-sm">2</span>
                    </button>
                </div>
            </div>

            {/* Search Bar - Premium Style */}
            <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                <input
                    type="text"
                    placeholder="ابحث عن أدويتك أو مستحضرات التجميل..."
                    className="w-full bg-slate-100 dark:bg-slate-900/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-3.5 pr-12 pl-4 text-sm font-medium transition-all outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
            </div>
        </header>
    )
}
