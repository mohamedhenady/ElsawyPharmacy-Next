"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Phone, MapPin, Lock, Eye, EyeOff, MessageSquare, ArrowRight, PlusCircle, Bell, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen px-4 py-10">
            <div className="max-w-[440px] mx-auto flex flex-col min-h-full">
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-10 px-2">
                    <Link href="/login" className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-[#1FAF5A] transition-colors group">
                        <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">إنشاء حساب</h2>
                    <div className="w-11"></div>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1FAF5A] p-4 rounded-3xl shadow-xl shadow-emerald-500/20 mb-6"
                    >
                        <PlusCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2">انضم إلينا</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">أكمل البيانات التالية لإنشاء حسابك</p>
                </div>

                {/* Registration Form */}
                <form className="space-y-6 pb-12" onSubmit={(e) => e.preventDefault()}>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-slate-100 dark:border-slate-800 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">الاسم الكامل</label>
                            <div className="relative group">
                                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                                <input className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-4 text-sm font-bold transition-all outline-none" placeholder="أدخل اسمك كما في البطاقة" type="text" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">رقم الهاتف</label>
                            <div className="relative group">
                                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                                <input className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-4 text-sm font-bold transition-all outline-none text-left" dir="ltr" placeholder="01xxxxxxxxx" type="tel" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">العنوان</label>
                            <div className="relative group">
                                <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                                <input className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-4 text-sm font-bold transition-all outline-none" placeholder="المدينة، الحي، الشارع" type="text" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">كلمة المرور</label>
                            <div className="relative group">
                                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                                <input className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-14 text-sm font-bold transition-all outline-none" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 py-2 px-2 group cursor-pointer">
                        <input className="size-5 rounded-lg border-2 border-slate-200 text-[#1FAF5A] focus:ring-[#1FAF5A]/20 transition-all cursor-pointer" id="terms" type="checkbox" />
                        <label className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed cursor-pointer" htmlFor="terms">
                            أوافق على <span className="text-[#1FAF5A]">الشروط والأحكام</span> و <span className="text-[#1FAF5A]">سياسة الخصوصية</span>
                        </label>
                    </div>

                    <button className="w-full bg-[#1FAF5A] hover:bg-[#0d5c2f] text-white font-black py-5 rounded-[2rem] shadow-xl shadow-emerald-500/20 text-lg transition-all active:scale-[0.98]">
                        إنشاء حساب
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium">لديك حساب بالفعل؟</span>
                        <Link className="font-black text-[#1FAF5A] text-sm hover:underline" href="/login">تسجيل الدخول</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
