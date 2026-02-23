"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    CreditCard,
    Truck,
    MapPin,
    ShieldCheck,
    CheckCircle2,
    ChevronRight,
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function CheckoutPage() {
    const [step, setStep] = useState(1)
    const [isFinished, setIsFinished] = useState(false)

    const handleFinish = () => {
        setIsFinished(true)
    }

    if (isFinished) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border text-center space-y-8 max-w-2xl"
                >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900">تم تأكيد طلبك بنجاح!</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">شكراً لثقتك بصيدلية الصاوي. رقم طلبك هو <span className="text-primary font-bold">#SW2026-8854</span>. سنرسل لك تفاصيل التوصيل عبر الواتساب فوراً.</p>
                    <div className="pt-6">
                        <Button className="rounded-full px-12 h-16 bg-primary text-xl font-black shadow-xl" asChild>
                            <a href="/">العودة للرئيسية</a>
                        </Button>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4">
                <header className="mb-12 space-y-4 text-center md:text-right">
                    <h1 className="text-4xl font-black text-slate-900">إكمال الدفع</h1>
                    <p className="text-muted-foreground">أدخل بياناتك لتوصيل الدواء بأسرع وقت ممكن.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step 1: Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "bg-white p-10 rounded-[3rem] shadow-sm border space-y-8 transition-all duration-500",
                                step !== 1 && "opacity-50 pointer-events-none scale-95"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black">عنوان التوصيل</h2>
                                </div>
                                {step !== 1 && <Button variant="ghost" onClick={() => setStep(1)} className="text-primary font-bold">تعديل</Button>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input placeholder="الاسم بالكامل" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold" />
                                <Input placeholder="رقم الموبايل" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold" />
                                <Input placeholder="المدينة" className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold md:col-span-2" />
                                <textarea
                                    placeholder="العنوان التفصيلي (رقم المبنى، الشقة، علامة مميزة)"
                                    className="md:col-span-2 h-32 rounded-[2rem] bg-slate-50 border-none p-6 font-bold focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>

                            {step === 1 && (
                                <Button
                                    onClick={() => setStep(2)}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-xl font-black"
                                >
                                    الاستمرار للشحن
                                </Button>
                            )}
                        </motion.div>

                        {/* Step 2: Shipping */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "bg-white p-10 rounded-[3rem] shadow-sm border space-y-8 transition-all duration-500",
                                step !== 2 && "opacity-50 pointer-events-none scale-95"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black">طريقة التوصيل</h2>
                                </div>
                                {step > 2 && <Button variant="ghost" onClick={() => setStep(2)} className="text-primary font-bold">تعديل</Button>}
                            </div>

                            <div className="space-y-4">
                                <div className="p-6 rounded-[2rem] border-2 border-primary bg-primary/5 flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </div>
                                        <div>
                                            <p className="font-black">توصيل منزلي سريع</p>
                                            <p className="text-sm text-muted-foreground">يصلك خلال ساعتين بحد أقصى</p>
                                        </div>
                                    </div>
                                    <span className="font-black">15.00 ر.س</span>
                                </div>
                                <div className="p-6 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between opacity-50 cursor-not-allowed">
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-300" />
                                        <div>
                                            <p className="font-black">استلام من الصيدلية</p>
                                            <p className="text-sm text-muted-foreground">جاهز خلال 30 دقيقة</p>
                                        </div>
                                    </div>
                                    <span className="font-black">مجاناً</span>
                                </div>
                            </div>

                            {step === 2 && (
                                <Button
                                    onClick={() => setStep(3)}
                                    className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 text-xl font-black"
                                >
                                    الاستمرار للدفع
                                </Button>
                            )}
                        </motion.div>

                        {/* Step 3: Payment */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "bg-white p-10 rounded-[3rem] shadow-sm border space-y-8 transition-all duration-500",
                                step !== 3 && "opacity-50 pointer-events-none scale-95"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-black">طريقة الدفع</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-8 rounded-[2rem] border-2 border-primary bg-primary/5 space-y-4 cursor-pointer">
                                    <div className="flex justify-between items-center text-primary">
                                        <ShieldCheck className="w-8 h-8" />
                                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                            <div className="w-2 h-2 bg-white rounded-full" />
                                        </div>
                                    </div>
                                    <h3 className="font-black text-xl">دفع عند الاستلام</h3>
                                    <p className="text-sm text-muted-foreground">ادفع كاش أو بالفيزا للمندوب عند استلام طلبك</p>
                                </div>
                                <div className="p-8 rounded-[2rem] border-2 border-slate-100 space-y-4 opacity-50 cursor-not-allowed">
                                    <div className="flex justify-between items-center text-slate-400">
                                        <CreditCard className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-black text-xl">دفع إلكتروني (قريباً)</h3>
                                    <p className="text-sm text-muted-foreground">ادفع الآن بآمان تام باستخدام بطاقتك البنكية</p>
                                </div>
                            </div>

                            {step === 3 && (
                                <Button
                                    onClick={handleFinish}
                                    className="w-full h-20 rounded-3xl bg-secondary hover:bg-secondary/90 shadow-2xl flex flex-col gap-1 py-10"
                                >
                                    <span className="text-2xl font-black">تأكيد الطلب وشراء</span>
                                    <span className="text-sm opacity-80">بإتمام الطلب أنت توافق على الشروط والأحكام</span>
                                </Button>
                            )}
                        </motion.div>
                    </div>

                    {/* Summary */}
                    <aside className="space-y-6">
                        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-primary/10 space-y-8 sticky top-32">
                            <h3 className="text-2xl font-black text-secondary">ملخص طلبك</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center font-bold">
                                    <span className="text-muted-foreground">مجموع المنتجات</span>
                                    <span>230.00 ر.س</span>
                                </div>
                                <div className="flex justify-between items-center font-bold">
                                    <span className="text-muted-foreground">رسوم الشحن</span>
                                    <span>15.00 ر.س</span>
                                </div>
                                <div className="pt-6 border-t font-black text-3xl flex justify-between items-center text-slate-900 font-[Inter]">
                                    <span>الإجمالي</span>
                                    <span>245.00 ر.س</span>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-[2rem] space-y-3">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <ShieldCheck className="w-5 h-5 text-green-600" />
                                    <span>تسوق آمن 100%</span>
                                </div>
                                <p className="text-xs text-muted-foreground">نضمن لك جودة جميع الأدوية وتوصيلها في ظروف صحية ملائمة.</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
