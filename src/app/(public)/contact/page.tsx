"use client"

import { motion } from "framer-motion"
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageSquare,
    Send,
    Facebook,
    Instagram
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20 pt-10">
            <div className="container mx-auto px-4">
                <header className="max-w-3xl mx-auto text-center mb-20 space-y-6">
                    <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-sm font-bold">اتصل بنا</Badge>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">نحن هنا <span className="text-primary italic">لمساعدتك</span></h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">فريق صيدلية الصاوي متواجد دائماً للرد على استفساراتك وتقديم المشورة الطبية اللازمة.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 md:p-16 rounded-[4rem] shadow-xl border space-y-10"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-slate-900">أرسل لنا رسالة</h2>
                            <p className="text-muted-foreground">اترك لنا استفسارك وسنعاود الاتصال بك في أقرب وقت.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input placeholder="الاسم" className="h-16 rounded-2xl bg-slate-50 border-none px-8 font-bold" />
                                <Input placeholder="رقم الموبايل" className="h-16 rounded-2xl bg-slate-50 border-none px-8 font-bold" />
                            </div>
                            <Input placeholder="البريد الإلكتروني (اختياري)" className="h-16 rounded-2xl bg-slate-50 border-none px-8 font-bold" />
                            <textarea
                                placeholder="رسالتك أو استفسارك..."
                                className="w-full h-48 rounded-[2.5rem] bg-slate-50 border-none p-8 font-bold focus:ring-2 focus:ring-primary outline-none"
                            />
                            <Button className="w-full h-18 rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 text-xl font-black py-8 gap-3">
                                إرسال الرسالة
                                <Send className="w-6 h-6 rotate-180" />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Phone, title: "اتصل بنا", val: "01024697326", sub: "متاح 24/7" },
                                { icon: Mail, title: "راسلنا", val: "info@elsawy.com", sub: "نرد خلال ساعة" },
                                { icon: MapPin, title: "موقعنا", val: "مدينة نصر، القاهرة", sub: "212 عمارات الضباط" },
                                { icon: Clock, title: "ساعات العمل", val: "يومياً", sub: "على مدار 24 ساعة" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4 hover:shadow-xl transition-all"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest">{item.title}</h3>
                                        <p className="text-xl font-black text-slate-800 mt-1">{item.val}</p>
                                        <p className="text-sm text-muted-foreground font-medium">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[100px]" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                                <div className="space-y-4 text-center md:text-right">
                                    <h3 className="text-3xl font-black">تابعنا على <br /><span className="text-primary italic">وسائل التواصل</span></h3>
                                    <p className="text-slate-400">كن أول من يعرف عن عروضنا الحصرية والخصومات.</p>
                                </div>
                                <div className="flex gap-6">
                                    <a href="#" className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                                        <Facebook className="w-8 h-8" />
                                    </a>
                                    <a href="#" className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                                        <Instagram className="w-8 h-8" />
                                    </a>
                                    <a href="#" className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                                        <MessageSquare className="w-8 h-8" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}
