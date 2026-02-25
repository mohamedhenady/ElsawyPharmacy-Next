"use client"

import { motion } from "framer-motion"
import { Camera, Image as ImageIcon, FileText, Send, Info, ArrowRight, FileEdit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MobileBottomNav } from "@/components/mobile/BottomNav"
import Link from "next/link"

export default function PrescriptionPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 py-4 flex items-center justify-between">
                <Link href="/home" className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    <ArrowRight className="w-6 h-6" />
                </Link>
                <h1 className="text-lg font-bold">تحميل الروشتة</h1>
                <div className="size-10"></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
                {/* Illustration/Status Area */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center justify-center size-20 rounded-full bg-primary/10 mb-4"
                    >
                        <FileText className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">ارفع صورة الروشتة</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">سيقوم الصيدلي في صيدلية الصاوي بمراجعة طلبك فور إرساله وتجهيز الأدوية لك.</p>
                </div>

                {/* Upload Options */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group active:scale-95">
                        <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                            <Camera className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm">الكاميرا</span>
                    </button>
                    <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-dashed border-secondary/30 bg-secondary/5 hover:bg-secondary/10 transition-all group active:scale-95">
                        <div className="size-12 rounded-full bg-secondary text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-secondary/20">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm">المعرض</span>
                    </button>
                </div>

                {/* Notes Section */}
                <div className="space-y-3 mb-8">
                    <label className="flex items-center gap-2 text-sm font-bold px-1">
                        <FileEdit className="w-4 h-4 text-primary" />
                        ملاحظات إضافية (اختياري)
                    </label>
                    <Textarea
                        className="w-full min-h-[120px] rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus-visible:ring-primary p-4 text-sm"
                        placeholder="أضف أي تعليمات خاصة للصيدلي هنا، مثل الحساسية من أدوية معينة أو تفضيلات العلامة التجارية..."
                    />
                </div>

                {/* Info Card */}
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-secondary/10 p-4 rounded-xl flex gap-3 items-start mb-8 border border-secondary/20"
                >
                    <Info className="w-5 h-5 text-secondary shrink-0" />
                    <p className="text-[11px] leading-relaxed text-secondary-950 dark:text-secondary-100 font-medium">
                        يرجى التأكد من أن الصورة واضحة وتظهر جميع بيانات الروشتة (اسم المريض، اسم الطبيب، وتاريخ الروشتة).
                    </p>
                </motion.div>

                {/* Submit Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-full shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mb-6 transition-all text-lg group">
                    <span>إرسال للصيدلية</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
            </main>

            <MobileBottomNav />
        </div>
    )
}
