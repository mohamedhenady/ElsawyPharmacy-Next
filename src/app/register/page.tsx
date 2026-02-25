"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Phone, MapPin, Lock, Eye, EyeOff, MessageSquare, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen py-8 px-4">
            <div className="max-w-md mx-auto flex flex-col min-h-full">
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <Link href="/login" className="text-primary p-2">
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                    <h2 className="text-lg font-bold">إنشاء حساب جديد</h2>
                    <div className="w-10"></div>
                </div>

                {/* Hero Section */}
                <div className="flex flex-col items-center justify-center mb-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 mb-6"
                    >
                        <Image
                            src="/logo.png"
                            alt="Elsawy Pharmacy Logo"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>
                    <h1 className="text-2xl font-bold mb-2">انضم إلى صيدلية الصاوي</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">أكمل البيانات التالية لإنشاء حسابك</p>
                </div>

                {/* Registration Form */}
                <form className="space-y-5 pb-12" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold pr-1">الاسم الكامل</label>
                            <div className="relative">
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input className="h-14 pr-12 rounded-xl focus-visible:ring-primary" placeholder="أدخل اسمك بالكامل" type="text" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold pr-1">رقم الهاتف</label>
                            <div className="relative">
                                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input className="h-14 pr-12 rounded-xl text-left" dir="ltr" placeholder="01xxxxxxxxx" type="tel" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold pr-1">رقم الواتساب (اختياري)</label>
                            <div className="relative">
                                <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input className="h-14 pr-12 rounded-xl text-left" dir="ltr" placeholder="رقم الواتساب للتواصل" type="tel" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold pr-1">العنوان بالتفصيل</label>
                            <div className="relative">
                                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input className="h-14 pr-12 rounded-xl" placeholder="المحافظة، المدينة، الشارع" type="text" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-slate-700 dark:text-slate-300 text-sm font-bold pr-1">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <Input className="h-14 pr-12 pl-12 rounded-xl" placeholder="••••••••" type={showPassword ? "text" : "password"} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <input className="mt-1 size-5 rounded border-slate-300 text-primary focus:ring-primary" id="terms" type="checkbox" />
                        <label className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed" htmlFor="terms">
                            أوافق على <span className="font-bold cursor-pointer text-secondary">الشروط والأحكام</span> و <span className="font-bold cursor-pointer text-secondary">سياسة الخصوصية</span>
                        </label>
                    </div>

                    <Button className="w-full h-14 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20">
                        إنشاء حساب
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4">
                        <span className="text-slate-500 dark:text-slate-400 text-sm">لديك حساب بالفعل؟</span>
                        <Link className="font-bold text-secondary text-sm" href="/login">تسجيل الدخول</Link>
                    </div>
                </form>

                <div className="mt-auto py-6 flex flex-col items-center gap-1 text-slate-400 text-xs">
                    <p>صيدلية الصاوي - حماية فائقة</p>
                    <p>الإصدار 2.4.0</p>
                </div>
            </div>
        </div>
    )
}
