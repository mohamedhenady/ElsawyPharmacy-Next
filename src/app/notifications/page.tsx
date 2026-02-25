"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Package, Tag, Clock, CheckCircle, Gift, Settings, ArrowRight } from "lucide-react"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import { cn } from "@/lib/utils"
import Link from "next/link"

const TABS = [
    { id: "all", label: "الكل" },
    { id: "orders", label: "الطلبات" },
    { id: "offers", label: "العروض" },
    { id: "reminders", label: "التذكيرات" },
]

export default function NotificationsPage() {
    const [activeTab, setActiveTab] = useState("all")

    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen flex flex-col pb-28">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f1712]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/home" className="flex items-center justify-center size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:scale-105 active:scale-95 transition-all">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">التنبيهات</h1>
                </div>
                <button className="flex items-center justify-center size-10 rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                    <Settings className="w-5 h-5" />
                </button>
            </header>

            {/* Tabs */}
            <div className="mt-4 px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-white dark:bg-slate-800 text-[#1FAF5A] shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
                                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
                <AnimatePresence mode="popLayout">
                    {NOTIFICATIONS.map((notif, index) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "group relative overflow-hidden bg-white dark:bg-slate-900/50 backdrop-blur-sm p-4 rounded-3xl border transition-all duration-300",
                                notif.unread
                                    ? "border-primary/20 shadow-lg shadow-primary/5"
                                    : "border-slate-100 dark:border-slate-900 shadow-sm"
                            )}
                        >
                            <div className="flex gap-4">
                                <div className={cn(
                                    "flex-shrink-0 size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                                    notif.type === "order" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-500" :
                                        notif.type === "offer" ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500" :
                                            "bg-amber-50 dark:bg-amber-500/10 text-amber-500"
                                )}>
                                    {notif.type === "order" ? <Package className="w-6 h-6" /> :
                                        notif.type === "offer" ? <Tag className="w-6 h-6" /> :
                                            <Clock className="w-6 h-6" />}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className={cn("font-bold text-sm", notif.unread ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400")}>
                                            {notif.title}
                                        </h3>
                                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{notif.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
                                        {notif.description}
                                    </p>
                                </div>

                                {notif.unread && (
                                    <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(23,163,74,0.5)]" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <MobileBottomNav />
        </div>
    )
}

const NOTIFICATIONS = [
    {
        id: 1,
        type: "order",
        title: "تم استلام الطلب #5432",
        description: "جارٍ العمل على تجهيز طلبك وسيتم تسليمه قريباً.",
        time: "منذ دقيقتين",
        unread: true,
    },
    {
        id: 2,
        type: "offer",
        title: "عرض لفترة محدودة! ⚡",
        description: "خصم 20% على جميع منتجات العناية بالبشرة اليوم فقط.",
        time: "منذ ساعة",
        unread: true,
    },
    {
        id: 3,
        type: "reminder",
        title: "تذكير بموعد الدواء",
        description: "حان موعد تناول الفيتامينات اليومي.",
        time: "منذ 3 ساعات",
        unread: false,
    },
    {
        id: 4,
        type: "order",
        title: "تم توصيل الطلب بنجاح",
        description: "شكراً لثقتك بنا! نأمل أن تكون تجربتك متميزة.",
        time: "أمس",
        unread: false,
    },
]
