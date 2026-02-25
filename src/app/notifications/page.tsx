"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Package, Tag, Clock, CheckCircle, Gift, Settings, ArrowRight } from "lucide-react"
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
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/home" className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <h1 className="text-xl font-bold tracking-tight">الإشعارات</h1>
                </div>
                <button className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <Settings className="w-5 h-5" />
                </button>
            </header>

            {/* Tabs Navigation */}
            <nav className="bg-white dark:bg-background-dark border-b border-primary/10 sticky top-[69px] z-40">
                <div className="flex px-4 overflow-x-auto no-scrollbar">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex-1 py-4 text-center font-bold text-sm border-b-[3px] transition-all",
                                activeTab === tab.id
                                    ? "border-primary text-primary"
                                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-primary"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-4 space-y-6">
                {/* Group: Today */}
                <section>
                    <h2 className="text-lg font-bold mb-4 px-1">اليوم</h2>
                    <div className="space-y-3">
                        {/* Order Notification */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-primary/5 active:scale-95 transition-transform"
                        >
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm">تم تأكيد طلبك رقم #12345</h3>
                                    <span className="size-2 rounded-full bg-primary mt-1.5 animate-pulse"></span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">طلبك الآن قيد التحضير وسيتم توصيله قريباً.</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block font-medium">منذ ٥ دقائق</span>
                            </div>
                        </motion.div>

                        {/* Offer Notification */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-secondary/5 active:scale-95 transition-transform"
                        >
                            <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                <Tag className="w-6 h-6 text-secondary" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm">خصم خاص بمناسبة نهاية الأسبوع!</h3>
                                    <span className="size-2 rounded-full bg-primary mt-1.5 animate-pulse"></span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">احصل على خصم ٢٥٪ على جميع منتجات العناية بالبشرة باستخدام الكود: WEEKEND25</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block font-medium">منذ ساعتين</span>
                            </div>
                        </motion.div>

                        {/* Reminder Notification */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-800/50 p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-amber-500/5 active:scale-95 transition-transform"
                        >
                            <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                                <Clock className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-sm">تذكير بموعد الدواء</h3>
                                    <span className="size-2 rounded-full bg-primary mt-1.5 animate-pulse"></span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 leading-relaxed">حان الآن موعد جرعة فيتامين C اليومية.</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block font-medium">منذ ٣ ساعات</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Group: Yesterday */}
                <section>
                    <h2 className="text-lg font-bold mb-4 px-1">أمس</h2>
                    <div className="space-y-3 opacity-80">
                        {/* Order Notification (Read) */}
                        <div className="bg-white/50 dark:bg-slate-800/30 p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-transparent">
                            <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <CheckCircle className="w-6 h-6 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">تم توصيل طلبك بنجاح</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">نأمل أن تكون راضياً عن تجربتك معنا. لا تنسى تقييم الخدمة!</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block">أمس، ٠٤:٣٠ م</span>
                            </div>
                        </div>

                        {/* Gift Notification (Read) */}
                        <div className="bg-white/50 dark:bg-slate-800/30 p-4 rounded-2xl flex items-start gap-4 shadow-sm border border-transparent">
                            <div className="size-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                <Gift className="w-6 h-6 text-slate-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">هدية في انتظارك!</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">لقد ربحت كوبون خصم ١٠٪ كعربون شكر على ولائك لصيدلية الصاوي.</p>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 block">أمس، ١٠:١٥ ص</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <MobileBottomNav />
        </div>
    )
}
