"use client"

import { motion } from "framer-motion"
import { Camera, Image as ImageIcon, FileText, Send, Info, ArrowRight, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import Link from "next/link"

export default function PrescriptionPage() {
    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen flex flex-col pb-28">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-900 px-4 py-3 flex items-center justify-between">
                <Link href="/home" className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-2xl text-slate-400 hover:text-[#1FAF5A] transition-colors">
                    <ArrowRight className="w-5 h-5" />
                </Link>
                <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">طلب بروشتة</h1>
                <div className="w-10"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 py-8 max-w-[440px] mx-auto w-full space-y-10">
                {/* Illustration/Status Area */}
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1FAF5A] p-6 rounded-3xl shadow-xl shadow-emerald-500/20 inline-flex items-center justify-center mb-6"
                    >
                        <FileText className="w-12 h-12 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">ارفع صورة الروشتة</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium px-4">سيقوم فريقنا الصيدلي بمراجعة طلبك فوراً وتجهيزه لك بأعلى جودة.</p>
                </div>

                {/* Upload Options - Premium Design */}
                <div className="grid grid-cols-2 gap-5">
                    <button className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-[#1FAF5A] transition-all group active:scale-[0.98]">
                        <div className="bg-[#1FAF5A] p-4 rounded-2xl text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform">
                            <Camera className="w-8 h-8" />
                        </div>
                        <span className="font-black text-slate-700 dark:text-slate-300 text-sm">الكاميرا</span>
                    </button>
                    <button className="flex flex-col items-center gap-4 p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-[#1C7ED6] transition-all group active:scale-[0.98]">
                        <div className="bg-[#1C7ED6] p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20 group-hover:-rotate-6 transition-transform">
                            <ImageIcon className="w-8 h-8" />
                        </div>
                        <span className="font-black text-slate-700 dark:text-slate-300 text-sm">المعرض</span>
                    </button>
                </div>

                {/* Notes Section - Premium Style */}
                <div className="space-y-4">
                    <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider flex items-center gap-2">
                        <FileEdit className="w-3 h-3" />
                        تعليمات إضافية
                    </label>
                    <div className="relative group">
                        <textarea
                            className="w-full min-h-[140px] bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-[#1FAF5A]/20 rounded-[1.5rem] p-5 text-sm font-bold outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                            placeholder="اكتب هنا أي ملاحظات أو تفضيلات للعلامة التجارية..."
                        />
                    </div>
                </div>

                {/* Info Card - Premium Glass */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl flex gap-4 items-start border border-blue-100/50 dark:border-blue-800/20"
                >
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300 font-bold">
                        يرجى التأكد من وضوح بيانات الروشتة (اسم المريض، الطبيب والباركود) لسرعة التنفيذ.
                    </p>
                </motion.div>

                {/* Submit Button - Premium Flow */}
                <button className="w-full bg-[#1FAF5A] hover:bg-[#0d5c2f] text-white font-black py-5 rounded-3xl shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group">
                    <span className="text-lg">إرسال للصيدلي</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform" />
                </button>
            </main>

            <MobileBottomNav />
        </div>
    )
}
