"use client"

import { motion } from "framer-motion"
import {
    User,
    MapPin,
    CreditCard,
    History,
    Bell,
    ShieldCheck,
    HelpCircle,
    LogOut,
    ChevronLeft,
    Camera,
    PlusCircle,
    Settings,
    ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import Link from "next/link"

const MENU_ITEMS = [
    { id: "orders", icon: History, label: "طلباتي السابقة", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { id: "addresses", icon: MapPin, label: "عناوين التوصيل", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { id: "payments", icon: CreditCard, label: "وسائل الدفع", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { id: "notifications", icon: Bell, label: "إعدادات الإشعارات", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { id: "privacy", icon: ShieldCheck, label: "الخصوصية والأمان", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { id: "support", icon: HelpCircle, label: "الدعم والمساعدة", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
]

export default function ProfilePage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pb-24 font-display">
            {/* Header */}
            <header className="px-5 pt-8 pb-10 bg-gradient-to-b from-primary/20 to-transparent relative overflow-hidden">
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <h1 className="text-2xl font-black">حسابي</h1>
                    <button className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm">
                        <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </button>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-5 relative z-10">
                    <div className="relative">
                        <div className="size-20 rounded-3xl bg-white p-1 shadow-xl border border-white dark:border-slate-800">
                            <div className="size-full rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                                <User className="w-10 h-10 text-primary" />
                            </div>
                        </div>
                        <button className="absolute -bottom-1 -right-1 size-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 active:scale-90 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">محمد هنيدي</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-wide">+20 100 123 4567</p>
                        <div className="flex gap-2 mt-2">
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">عميل مميز</span>
                            <span className="bg-secondary/10 text-secondary text-[10px] font-black px-2 py-0.5 rounded-full">١٤٠٠ نقطة</span>
                        </div>
                    </div>
                </div>

                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="absolute top-0 left-0 w-20 h-20 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-5 -mt-4 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-primary/5 p-6 border border-slate-100 dark:border-slate-800/50">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-8 border-b border-slate-50 dark:border-slate-800/50 pb-8">
                        <div className="text-center">
                            <p className="text-xs text-slate-400 mb-1 font-medium">الطلبات</p>
                            <p className="text-lg font-black text-primary">١٢</p>
                        </div>
                        <div className="text-center border-x border-slate-100 dark:border-slate-800">
                            <p className="text-xs text-slate-400 mb-1 font-medium">الروشتات</p>
                            <p className="text-lg font-black text-secondary">٥</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-slate-400 mb-1 font-medium">المفضلة</p>
                            <p className="text-lg font-black text-amber-500">٢٤</p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                        {MENU_ITEMS.map((item, index) => (
                            <motion.button
                                key={item.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`size-11 rounded-xl ${item.bg} ${item.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-sm">{item.label}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Log Out */}
                    <button className="w-full flex items-center gap-4 p-4 mt-6 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all font-bold text-sm">
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </main>

            <MobileBottomNav />
        </div>
    )
}
