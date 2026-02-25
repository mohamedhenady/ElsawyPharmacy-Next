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
    Camera,
    Settings,
    ArrowRight,
    ChevronLeft
} from "lucide-react"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button" // Assuming Button component path

export default function ProfilePage() {
    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen flex flex-col pb-28">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1712]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/home" className="flex items-center justify-center size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">الملف الشخصي</h1>
                </div>
                <button className="flex items-center justify-center size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                    <Settings className="w-5 h-5" />
                </button>
            </header>

            <div className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
                {/* Profile Info */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="size-28 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 via-primary to-primary/40 p-1">
                            <div className="size-full rounded-[2.2rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800">
                                <User className="size-12 text-slate-300" />
                            </div>
                        </div>
                        <button className="absolute bottom-1 left-1 size-9 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center shadow-xl border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">أحمد محمد</h2>
                        <p className="text-slate-500 font-medium">ahmed@example.com</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                        <p className="text-xl font-bold text-primary">12</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">طلب</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                        <p className="text-xl font-bold text-emerald-500">250</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">نقطة</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center shadow-sm">
                        <p className="text-xl font-bold text-blue-500">4</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">خدمات</p>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-3">
                    {MENU_ITEMS.map((item, index) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="w-full group bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm hover:scale-[1.01] transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn("size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", item.bg)}>
                                    <item.icon className={cn("w-6 h-6", item.color)} />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{item.label}</span>
                            </div>
                            <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:translate-x-[-4px] transition-transform" />
                        </motion.button>
                    ))}
                </div>

                {/* Logout Button */}
                <Button variant="ghost" className="w-full h-16 rounded-3xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 font-bold text-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3">
                    <LogOut className="w-6 h-6" />
                    تسجيل الخروج
                </Button>
            </div>

            <MobileBottomNav />
        </div>
    )
}

const MENU_ITEMS = [
    { id: "orders", icon: History, label: "طلباتي السابقة", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { id: "address", icon: MapPin, label: "عناوين التوصيل", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { id: "payment", icon: CreditCard, label: "وسائل الدفع", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { id: "notifs", icon: Bell, label: "تفضيلات التنبيهات", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
    { id: "security", icon: ShieldCheck, label: "الأمان والخصوصية", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-500/10" },
    { id: "help", icon: HelpCircle, label: "مركز المساعدة", color: "text-slate-600 dark:text-slate-400", bg: "bg-slate-50 dark:bg-slate-800" },
]
