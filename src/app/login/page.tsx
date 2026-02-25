"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[440px] bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden p-8 border border-slate-100 dark:border-slate-800"
            >
                {/* Header / Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-primary/10"
                    >
                        <Image
                            src="/logo.png"
                            alt="Elsawy Pharmacy Logo"
                            width={64}
                            height={64}
                            className="w-12 h-12 object-contain"
                        />
                    </motion.div>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 text-center">أهلاً بك مجدداً</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-center">سجل دخولك إلى حساب صيدلية الصاوي</p>
                </div>

                {/* Form Section */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    {/* Phone Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mr-1">رقم الهاتف</label>
                        <div className="relative group">
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary w-5 h-5" />
                            <Input
                                className="w-full pr-12 pl-4 py-7 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-primary/20 transition-all outline-none"
                                placeholder="01x xxxx xxxx"
                                type="tel"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">كلمة المرور</label>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary w-5 h-5" />
                            <Input
                                className="w-full pr-12 pl-12 py-7 rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-primary/20 transition-all outline-none"
                                placeholder="••••••••"
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="flex justify-start mt-1">
                            <Link className="text-sm font-bold text-primary hover:underline" href="/forgot-password">نسيت كلمة المرور؟</Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-7 rounded-2xl shadow-lg shadow-primary/20 mt-4 text-lg">
                        تسجيل الدخول
                    </Button>

                    {/* Register Link */}
                    <div className="pt-6 text-center">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                            ليس لديك حساب؟
                            <Link className="text-primary font-black hover:underline mr-1" href="/register">أنشئ حساباً جديداً</Link>
                        </p>
                    </div>
                </form>

                {/* Footer Decoration */}
                <div className="mt-10 flex justify-center gap-2">
                    <div className="h-1.5 w-10 rounded-full bg-primary"></div>
                    <div className="h-1.5 w-3 rounded-full bg-primary/20"></div>
                    <div className="h-1.5 w-3 rounded-full bg-primary/20"></div>
                </div>
            </motion.div>
        </div>
    )
}
