"use client"

import { motion } from "framer-motion"
import {
    Truck,
    ShieldCheck,
    ThermometerSnowflake,
    MapPin,
    Clock,
    CreditCard,
    CheckCircle2
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function ShippingPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4">
                <header className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <Badge className="bg-emerald-100 text-emerald-600 border-none px-6 py-2 text-sm font-bold">التوصيل والشحن</Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">دواؤك يصلك <br /><span className="text-emerald-500 italic">آمناً وبسرعة</span></h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">نحن ندرك أهمية الوقت والعناية الصحية، ولذلك طورنا نظام شحن مخصص يضمن وصول منتجاتك في أفضل حالة صحية ممكنة.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            icon: Clock,
                            title: "توصيل خلال ساعة",
                            desc: "نفتخر بتقديم أسرع خدمة توصيل دواء في القاهرة لأي عنوان داخل مدينة نصر.",
                            color: "bg-blue-50 text-blue-600"
                        },
                        {
                            icon: ThermometerSnowflake,
                            title: "توصيل مسبق التبريد",
                            desc: "نستخدم صناديق حرارية للحفاظ على سلامة الأنسولين والحقن التي تحتاج لدرجات حرارة معينة.",
                            color: "bg-cyan-50 text-cyan-600"
                        },
                        {
                            icon: ShieldCheck,
                            title: "تغليف طبي معقم",
                            desc: "جميع طلباتكم تُغلف بعناية فائقة لضمان وصولها نظيفة ومعقمة تماماً كما خرجت من الصيدلية.",
                            color: "bg-emerald-50 text-emerald-600"
                        },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                        >
                            <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center shadow-inner", feature.color)}>
                                <feature.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed font-medium">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 bg-white rounded-[4rem] shadow-xl border overflow-hidden p-12 md:p-20 relative">
                    <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h2 className="text-4xl font-black text-slate-900 inline-block border-b-4 border-emerald-500 pb-4">تكاليف التوصيل ومناطق التغطية</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-6 border-b pb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">داخل مدينة نصر</p>
                                        <p className="text-muted-foreground leading-relaxed">رسوم التوصيل <span className="text-emerald-600 font-black">15 ر.س</span> فقط، ويصلك خلال ساعة واحدة.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6 border-b pb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">باقي مناطق القاهرة</p>
                                        <p className="text-muted-foreground leading-relaxed">رسوم التوصيل تبدأ من <span className="text-emerald-600 font-black">30 ر.س</span> طبقاً للمسافة، ويصلك خلال 2-4 ساعات.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xl font-bold">طلبات +500 ر.س</p>
                                        <p className="text-muted-foreground leading-relaxed">التوصيل <span className="text-emerald-600 font-black">مجاني تماماً</span> لأي مكان داخل القاهرة الكبرى.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                            <div className="relative bg-emerald-50 p-12 rounded-[3.5rem] border border-emerald-100 space-y-6">
                                <p className="text-emerald-600 font-black text-center text-sm uppercase tracking-widest">تتبع طلبك</p>
                                <div className="space-y-4">
                                    {[
                                        { label: "تم استلام الطلب", done: true },
                                        { label: "جاري التجهيز والمعاينة", done: true },
                                        { label: "خرج مع المندوب للمنزل", done: false },
                                        { label: "تم التسليم بنجاح", done: false },
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center",
                                                step.done ? "bg-emerald-500 text-white" : "bg-white border-2 border-emerald-200 text-emerald-200"
                                            )}>
                                                {step.done ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 bg-emerald-200 rounded-full" />}
                                            </div>
                                            <span className={cn("font-bold text-lg", step.done ? "text-slate-900" : "text-slate-300")}>{step.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
