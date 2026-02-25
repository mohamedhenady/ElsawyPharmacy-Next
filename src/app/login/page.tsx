"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Lock, Eye, EyeOff, PlusCircle, Bell, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-[#f8faf9] dark:bg-[#0f1712] min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 overflow-hidden p-10 border border-slate-100 dark:border-slate-800"
            >
                {/* Header / Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ rotate: -20, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="bg-[#1FAF5A] p-4 rounded-3xl shadow-xl shadow-emerald-500/20 mb-6"
                    >
                        <PlusCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white text-center tracking-tight">أهلاً بك</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">سجل دخولك إلى حساب صيدلية الصاوي</p>
                </div>

                {/* Form Section */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {/* Phone Field */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">رقم الهاتف</label>
                        <div className="relative group">
                            <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                            <input
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-4 text-sm font-bold transition-all outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                placeholder="01x xxxx xxxx"
                                type="tel"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[13px] font-black text-slate-400 dark:text-slate-500 mr-2 uppercase tracking-wider">كلمة المرور</label>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1FAF5A] transition-colors w-5 h-5" />
                            <input
                                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-[#1FAF5A]/20 focus:bg-white dark:focus:bg-slate-900 rounded-2xl py-4 pr-14 pl-14 text-sm font-bold transition-all outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="flex justify-start mt-2">
                            <Link className="text-xs font-black text-[#1FAF5A] hover:underline" href="/forgot-password">نسيت كلمة المرور؟</Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-[#1FAF5A] hover:bg-[#0d5c2f] text-white font-black py-4.5 rounded-2xl shadow-xl shadow-emerald-500/20 mt-6 text-lg transition-all active:scale-[0.98]">
                        تسجيل الدخول
                    </button>

                    {/* Register Link */}
                    <div className="pt-8 text-center border-t border-slate-50 dark:border-slate-800 mt-8">
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
                            ليس لديك حساب؟
                            <Link className="text-[#1FAF5A] font-black hover:underline mr-1.5" href="/register">أنشئ حساباً جديداً</Link>
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
